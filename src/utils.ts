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
            return 'Lax';
    }
}

/**
 * convert puppeteer's cookie to tough-cookie's cookie
 */
export const serializeForTough = (puppetCookie: Protocol.Network.Cookie): Cookie => {

    const toughCookie: Cookie = new Cookie({
        key: puppetCookie.name,
        value: puppetCookie.value,
        // @ts-ignore: Infinity expires: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59406
        expires: (!puppetCookie.expires || puppetCookie.expires === PuppeteerInfinityExpires) ?
            ToughInfinityExpires :
            new Date(puppetCookie.expires * 1000),
        domain: canonicalDomain(puppetCookie.domain),
        path: puppetCookie.path,
        secure: puppetCookie.secure,
        httpOnly: puppetCookie.httpOnly,
        sameSite: p2tSameSite(puppetCookie.sameSite),
        hostOnly: !puppetCookie.domain.startsWith("."),

        // can we really skip them?
        // creation: currentDate,
        // lastAccessed: currentDate,
    });

    return toughCookie;
}

/**
 * convert tough-cookie's cookie to puppeteer's cookie
 */
export const serializeForPuppeteer = (toughCookie: Cookie): Protocol.Network.SetCookieRequest => {
    if (!toughCookie.domain) throw new Error("Unknown domain");

    const puppetCookie: Protocol.Network.SetCookieRequest = {
        name: toughCookie.key,
        value: toughCookie.value,
        // domain: !cookie.hostOnly ? '.' + cookie.domain : cookie.domain,
        domain: toughCookie.domain,
        path: toughCookie.path || '/',
        expires: !toughCookie.expires || toughCookie.expires === ToughInfinityExpires ?
            PuppeteerInfinityExpires :
            toughCookie.expires.getTime(),
        secure: toughCookie.secure,
        httpOnly: toughCookie.hostOnly === null ? undefined : toughCookie.hostOnly,
        sameSite: t2pSameSite(toughCookie.sameSite),
    }

    return puppetCookie;
}