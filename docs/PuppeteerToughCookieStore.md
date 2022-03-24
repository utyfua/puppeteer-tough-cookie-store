# Class: PuppeteerToughCookieStore

## Table of contents

### Constructors

- [constructor](../wiki/PuppeteerToughCookieStore#constructor)

### Properties

- [client](../wiki/PuppeteerToughCookieStore#client)
- [options](../wiki/PuppeteerToughCookieStore#options)
- [synchronous](../wiki/PuppeteerToughCookieStore#synchronous)

### Methods

- [findCookie](../wiki/PuppeteerToughCookieStore#findcookie)
- [findCookies](../wiki/PuppeteerToughCookieStore#findcookies)
- [getAllCookies](../wiki/PuppeteerToughCookieStore#getallcookies)
- [putCookie](../wiki/PuppeteerToughCookieStore#putcookie)
- [putCookies](../wiki/PuppeteerToughCookieStore#putcookies)
- [removeAllCookies](../wiki/PuppeteerToughCookieStore#removeallcookies)
- [removeCookie](../wiki/PuppeteerToughCookieStore#removecookie)
- [removeCookies](../wiki/PuppeteerToughCookieStore#removecookies)
- [updateCookie](../wiki/PuppeteerToughCookieStore#updatecookie)

## Constructors

### constructor

• **new PuppeteerToughCookieStore**(`client`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `CDPSession` |
| `options` | `Options` |

#### Defined in

[store.ts:15](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L15)

## Properties

### client

• **client**: `CDPSession`

___

### options

• **options**: `Options` = `{}`

___

### synchronous

• **synchronous**: `boolean` = `false`

#### Defined in

[store.ts:14](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L14)

## Methods

### findCookie

▸ **findCookie**(`domain`, `path`, `key`): `Promise`<``null`` \| `Cookie`\>

Returns cookie for the specific domain and path

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `path` | `string` |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| `Cookie`\>

#### Defined in

[store.ts:35](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L35)

___

### findCookies

▸ **findCookies**(`domain`, `path?`, `allowSpecialUseDomain?`): `Promise`<`Cookie`[]\>

Returns cookies for the specific domain and path

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `path?` | `string` |
| `allowSpecialUseDomain?` | `boolean` |

#### Returns

`Promise`<`Cookie`[]\>

#### Defined in

[store.ts:44](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L44)

___

### getAllCookies

▸ **getAllCookies**(): `Promise`<`Cookie`[]\>

Returns all browser cookies. Depending on the backend support, will return detailed cookie
information in the `cookies` field.

If `options.getAllCookiesUrls` set will return cookies only for those specific urls

#### Returns

`Promise`<`Cookie`[]\>

#### Defined in

[store.ts:101](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L101)

___

### putCookie

▸ **putCookie**(`cookie`): `Promise`<`void`\>

Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookie` | `Cookie` |

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:53](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L53)

___

### putCookies

▸ **putCookies**(`cookies`): `Promise`<`void`\>

Sets a cookies with the given cookies; may overwrite equivalent cookies if they exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookies` | `Cookie`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:60](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L60)

___

### removeAllCookies

▸ **removeAllCookies**(): `Promise`<`void`\>

Clears browser cookies.

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:114](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L114)

___

### removeCookie

▸ **removeCookie**(`domain`, `path`, `key`): `Promise`<`void`\>

Deletes browser cookies with matching name, domain and path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `path` | `string` |
| `key` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:77](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L77)

___

### removeCookies

▸ **removeCookies**(`domain`, `path`): `Promise`<`void`\>

Deletes browser cookies with matching domain and path.

#### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `path` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:88](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L88)

___

### updateCookie

▸ **updateCookie**(`oldCookie`, `newCookie`): `Promise`<`void`\>

Updates a cookie; in reality almost an alias for `.putCookies`

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldCookie` | `Cookie` |
| `newCookie` | `Cookie` |

#### Returns

`Promise`<`void`\>

#### Defined in

[store.ts:69](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/store.ts#L69)
