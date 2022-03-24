import { Cookie, canonicalDomain } from 'tough-cookie'
import type { Protocol } from 'puppeteer'

export const PuppeteerInfinityExpires = -1;
export const ToughInfinityExpires = "Infinity";

/**
 * convert puppeteer's sameSite to tough-cookie's sameSite
 */
export const p2tSameSite = (sameSite?: Protocol.Network.CookieSameSite): Cookie.Properties["sameSite"] => {
    switch (sameSite) {
        case 'Lax':
            return 'lax';
        case 'Strict':
            return 'strict';
        case 'None':
        default:
            return 'none';
    }
}

/**
 * convert tough-cookie's sameSite to puppeteer's sameSite
 */
export const t2pSameSite = (sameSite?: Cookie.Properties["sameSite"]): Protocol.Network.CookieSameSite => {
    sameSite = sameSite ? sameSite.toLocaleLowerCase() : 'none'
    switch (sameSite) {
        case 'lax':
            return 'Lax';
        case 'strict':
            return 'Strict';
        case 'none':
        default:
            return 'None';
    }
}

/**
 * convert puppeteer's cookie to tough-cookie's cookie
 */
export const serializeForTough = (cookie: Protocol.Network.Cookie): Cookie => {
    return new Cookie({
        key: cookie.name,
        value: cookie.value,
        // @ts-ignore: Infinity expires: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59406
        expires: (!cookie.expires || cookie.expires === PuppeteerInfinityExpires) ?
            ToughInfinityExpires :
            new Date(cookie.expires * 1000),
        domain: canonicalDomain(cookie.domain),
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        sameSite: p2tSameSite(cookie.sameSite),
        hostOnly: !cookie.domain.startsWith("."),

        // can we really skip them?
        // creation: currentDate,
        // lastAccessed: currentDate,
    });
}

/**
 * convert tough-cookie's cookie to puppeteer's cookie
 */
export const serializeForPuppeteer = (cookie: Cookie): Protocol.Network.SetCookieRequest => {
    if (!cookie.domain) throw new Error("Unknown domain");

    return {
        name: cookie.key,
        value: cookie.value,
        domain: !cookie.hostOnly ? '.' + cookie.domain : cookie.domain,
        path: cookie.path || '/',
        expires: !cookie.expires || cookie.expires === ToughInfinityExpires ?
            PuppeteerInfinityExpires :
            cookie.expires.getTime(),
        secure: cookie.secure,
        httpOnly: cookie.hostOnly === null ? undefined : cookie.hostOnly,
        sameSite: t2pSameSite(cookie.sameSite),
    }
}