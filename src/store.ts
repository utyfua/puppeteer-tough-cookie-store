import { Cookie } from 'tough-cookie'
import type { CDPSession, Protocol } from 'puppeteer'

import { deserialize, serialize } from './utils'

export interface Options {
    getAllCookiesUrls?: string[],
}

/**
 * @class PuppeteerToughCookieStore
 */
export class PuppeteerToughCookieStore {
    synchronous = false;
    constructor(public client: CDPSession, public options: Options = {}) {

    }

    /**
     * Returns browser cookies for the specific domain and path in puppeteer's format
     * 
     * @internal
     */
    async findCdpCookies(domain: string, path?: string, allowSpecialUseDomain?: boolean):
        Promise<Protocol.Network.Cookie[]> {
        const { cookies } = await this.client.send("Network.getCookies", {
            urls: ['//' + domain + (path || '')]
        })
        return cookies;
    }

    /**
     * Returns cookie for the specific domain and path
     */
    async findCookie(domain: string, path: string, key: string): Promise<Cookie | null> {
        const cookies = await this.findCdpCookies(domain, path);
        const cookie = cookies.find(({ name }) => name === key);
        return cookie ? deserialize(cookie) : null;
    };

    /**
     * Returns cookies for the specific domain and path
     */
    async findCookies(domain: string, path?: string, allowSpecialUseDomain?: boolean):
        Promise<Cookie[]> {
        const cookies = await this.findCdpCookies(domain, path, allowSpecialUseDomain);
        return cookies.map(deserialize)
    };

    /**
     * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
     */
    async putCookie(cookie: Cookie): Promise<void> {
        await this.client.send("Network.setCookie", serialize(cookie))
    };

    /**
     * Sets a cookies with the given cookies; may overwrite equivalent cookies if they exist.
     */
    async putCookies(cookies: Cookie[]): Promise<void> {
        await this.client.send("Network.setCookies", {
            cookies: cookies.map(serialize)
        })
    };

    /**
     * Updates a cookie; in reality almost an alias for `.putCookies`
     */
    async updateCookie(oldCookie: Cookie, newCookie: Cookie): Promise<void> {
        // puppeteer will manage its own
        await this.putCookie(newCookie);
    };

    /**
     * Deletes browser cookies with matching name, domain and path.
     */
    async removeCookie(domain: string, path: string, key: string): Promise<void> {
        await this.client.send("Network.deleteCookies", {
            name: key,
            domain,
            path,
        })
    };

    /**
     * Deletes browser cookies with matching domain and path.
     */
    async removeCookies(domain: string, path: string): Promise<void> {
        const cookies = await this.findCdpCookies(domain, path)
        for (const cookie of cookies) {
            await this.removeCookie(domain, path, cookie.name)
        }
    };

    /**
     * Returns all browser cookies. Depending on the backend support, will return detailed cookie
     * information in the `cookies` field.
     * 
     * If `options.getAllCookiesUrls` set will return cookies only for those specific urls
     */
    async getAllCookies(): Promise<Cookie[]> {
        const { cookies } =
            this.options.getAllCookiesUrls ?
                await this.client.send("Network.getCookies", {
                    urls: this.options.getAllCookiesUrls
                }) :
                await this.client.send("Network.getAllCookies")
        return cookies.map(deserialize);
    };

    /**
     * Clears browser cookies.
     */
    async removeAllCookies(): Promise<void> {
        await this.client.send("Network.clearBrowserCookies")
    };
}

