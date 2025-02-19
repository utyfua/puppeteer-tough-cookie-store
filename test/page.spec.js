const puppeteerModule = require('puppeteer');
const puppeteer = puppeteerModule.default || puppeteerModule.puppeteer || puppeteerModule;
const { CookieJar } = require('tough-cookie');
const { getStoreByPage } = require('../');

describe('CookieJar async operations', () => {
    /**
     * @param {import('puppeteer').Browser} 
     */
    let browser;
    /**
     * @type {CookieJar}
     */
    let jar;

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--incognito',
                '--start-in-incognito',
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        }, 10000);

        const page = await browser.newPage();

        jar = new CookieJar(await getStoreByPage(page));
    });

    test('should set and get a cookie asynchronously', async () => {
        const url = 'https://example.com';
        const cookieStr = 'testcookie=value';

        await jar.setCookie(cookieStr, url);
        const cookies = await jar.getCookies(url);

        expect(cookies).toHaveLength(1);
        expect(cookies[0].key + '=' + cookies[0].value).toBe(cookieStr);
    });

    afterEach(async () => {
        await browser.close();
    })
});
