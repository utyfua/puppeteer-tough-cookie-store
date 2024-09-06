const puppeteer = require('puppeteer');
// const { getStoreByPage } = require('puppeteer-tough-cookie-store')
const { getStoreByPage } = require('../')
const { CookieJar, MemoryCookieStore } = require('tough-cookie');

// optional libraries, you need only what you are really using
const got = require('got'); // make sure its got@11, cuz got@12 forcing to using imports instead requires

async function getPage() {
    // launch some browser
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--incognito',
            '--start-in-incognito',
        ],
    });

    const page = await browser.newPage();

    return [browser, page];
}

async function runtime() {
    // test url
    const url = 'https://www.npmjs.com/package/puppeteer-tough-cookie-store';

    // launch browser
    let [browser, page] = await getPage();

    // init cookieJar
    let cookieJarBrowser = new CookieJar(await getStoreByPage(page));

    // do base puppeteer request
    await page.goto(url)
    console.log('browser 1: cookieJarBrowser.getCookies', await cookieJarBrowser.getCookies(url));

    // do requests with cookies by another libs
    await testLibraries(url, cookieJarBrowser);

    // detach cookies to memory storage
    const cookieJarMemory = await cookieJarBrowser.clone(new MemoryCookieStore);
    // now we can close the browser but we will have cookies to work
    await browser.close();

    // do requests with cookies by another libs but without browser
    await testLibraries(url, cookieJarMemory);

    // launch another browser
    [browser, page] = await getPage();
    // init cookieJar
    cookieJarBrowser = new CookieJar(await getStoreByPage(page));

    // check for no cookies cuz we are in incognito
    console.log('browser 2: cookieJarBrowser.getCookies empty', await cookieJarBrowser.getCookies(url));
    // restore cookies
    cookieJarBrowser = await cookieJarMemory.clone(await getStoreByPage(page));
    console.log('browser 2: cookieJarBrowser.getCookies restored', await cookieJarBrowser.getCookies(url));

    // cookies were restored, so we can go requests again!

    // do base puppeteer request
    await page.goto(url)
    console.log('browser 1: cookieJarBrowser.getCookies', await cookieJarBrowser.getCookies(url));

    // do requests with cookies by another libs
    await testLibraries(url, cookieJarBrowser);

    // close browser at the end of our work
    await browser.close();
}

async function testLibraries(url, cookieJar) {
    // got request library
    await doGotRequest(url, cookieJar);
}

// got request library
async function doGotRequest(url, cookieJar) {
    // do request with got
    const gotResponse = await got({
        cookieJar,
        url
    });
    // check cookies we have sent
    console.log('got request header', gotResponse.request.options.headers.cookie);
    // check cookies we have got
    console.log('got response set-cookie header', gotResponse.headers['set-cookie']);
    // already sync with jar object
    console.log('cookieJar.getCookies after got request', await cookieJar.getCookies(url));
}

runtime();
