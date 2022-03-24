# Namespace: utils

## Table of contents

### Variables

- [PuppeteerInfinityExpires](../wiki/utils#puppeteerinfinityexpires)
- [ToughInfinityExpires](../wiki/utils#toughinfinityexpires)

### Functions

- [deserialize](../wiki/utils#deserialize)
- [p2tSameSite](../wiki/utils#p2tsamesite)
- [serialize](../wiki/utils#serialize)
- [t2pSameSite](../wiki/utils#t2psamesite)

## Variables

### PuppeteerInfinityExpires

• `Const` **PuppeteerInfinityExpires**: ``-1``

#### Defined in

[utils.ts:4](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/utils.ts#L4)

___

### ToughInfinityExpires

• `Const` **ToughInfinityExpires**: ``"Infinity"``

#### Defined in

[utils.ts:5](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/utils.ts#L5)

## Functions

### deserialize

▸ **deserialize**(`cookie`): `Cookie`

convert puppeteer's cookie to tough-cookie's cookie

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookie` | `Cookie` |

#### Returns

`Cookie`

#### Defined in

[utils.ts:41](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/utils.ts#L41)

___

### p2tSameSite

▸ **p2tSameSite**(`sameSite?`): `undefined` \| `string`

convert puppeteer's sameSite to tough-cookie's sameSite

#### Parameters

| Name | Type |
| :------ | :------ |
| `sameSite?` | `CookieSameSite` |

#### Returns

`undefined` \| `string`

#### Defined in

[utils.ts:10](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/utils.ts#L10)

___

### serialize

▸ **serialize**(`cookie`): `SetCookieRequest`

convert tough-cookie's cookie to puppeteer's cookie

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookie` | `Cookie` |

#### Returns

`SetCookieRequest`

#### Defined in

[utils.ts:64](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/utils.ts#L64)

___

### t2pSameSite

▸ **t2pSameSite**(`sameSite?`): `CookieSameSite`

convert tough-cookie's sameSite to puppeteer's sameSite

#### Parameters

| Name | Type |
| :------ | :------ |
| `sameSite?` | `string` |

#### Returns

`CookieSameSite`

#### Defined in

[utils.ts:25](https://github.com/utyfua/puppeteer-tough-cookie-store/blob/9154034/src/utils.ts#L25)
