import type { /*Browser,*/ Page } from 'puppeteer'

import { PuppeteerToughCookieStore, StoreOptions } from './store'

import * as utils from './utils'

/*/ this didnt work(tested getAllCookies only)
export async function getStoreByBrowser(browser: Browser, options?: StoreOptions):
    Promise<PuppeteerToughCookieStore> {
    const client = await browser.target().createCDPSession()
    return new PuppeteerToughCookieStore(client, options)
}
*/

export async function getStoreByPage(page: Page, options?: StoreOptions):
    Promise<PuppeteerToughCookieStore> {
    const client = await page.target().createCDPSession()
    return new PuppeteerToughCookieStore(client, options)
}

export {
    utils,
    StoreOptions,
    PuppeteerToughCookieStore,
}
