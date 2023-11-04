// Possible `rel` attribute values
export const ALTERNATE = `alternate`
export const APPLE_TOUCH_ICON = `apple-touch-icon`
export const AUTHOR = `author`
export const DNS_PREFETCH = `dns-prefetch`
export const FETCH = `fetch`
export const HELP = `help`
export const ICON = `icon`
export const LICENSE = `license`
export const MANIFEST = `manifest`
export const MASK_ICON = `mask-icon`
export const NEXT = `next`
export const PING_BACK = `pingback`
export const PRECONNECT = `preconnect`
export const PREFETCH = `prefetch`
export const PRELOAD = `preload`
export const PRERENDER = `prerender`
export const PREV = `prev`
export const SCRIPT = `script`
export const SEARCH = `search`
export const SHORTCUT_ICON = `shortcut icon`
export const STYLE = `style`
export const STYLE_SHEET = `stylesheet`

export const HEAD_LINKS = [
	{
		rel: PRECONNECT,
		href: 'https://fonts.googleapis.com'
	},
	{
		crossOrigin: 'crossorigin',
		rel: PRECONNECT,
		href: 'https://fonts.gstatic.com'
	},
	{
		rel: STYLE_SHEET,
		href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
	},
	{
		rel: APPLE_TOUCH_ICON,
		sizes: '180x180',
		href: '/favicon/apple-touch-icon.png'
	},
	{
		rel: ICON,
		type: 'image/png',
		href: '/favicon/favicon-32x32.png'
	},
	{
		rel: ICON,
		type: 'image/png',
		href: '/favicon/favicon-16x16.png'
	},
	{
		rel: MANIFEST,
		href: '/favicon/site.webmanifest'
	},
	{
		rel: MASK_ICON,
		href: '/favicon/safari-pinned-tab.svg',
		color: '#000000'
	},
	{
		rel: SHORTCUT_ICON,
		href: '/favicon/favicon.ico'
	},
	{
		rel: ALTERNATE,
		href: '/feed.xml',
		type: 'application/rss+xml'
	}
]

export function HEAD_META(homeOgImageUrl: string) {
	return [
		{
			charSet: 'utf-8'
		},
		{
			content: `IE=edge`,
			httpEquiv: `X-UA-Compatible`
		},
		{
			content: `user-scalable=no, initial-scale=1.0, maximum-scale=1, minimum-scale=1, width=device-width`,
			name: `viewport`
		},
		{
			content: '#000000',
			name: 'msapplication-TileColor'
		},
		{
			content: '/favicon/browserconfig.xml',
			name: 'msapplication-config'
		},
		{
			content: '#fff',
			name: 'theme-color'
		},
		{
			content: 'description',
			name: `The homepage for the Northwest Afrobeat musical group, Extra Thick.`
		},
		{
			content: homeOgImageUrl,
			property: `og:image`
		}
	]
}
