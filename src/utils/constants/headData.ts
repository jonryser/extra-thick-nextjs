export const HEAD_LINKS = [
	{
		rel: 'preconnect',
		href: 'https://fonts.googleapis.com'
	},
	{
		crossOrigin: 'crossorigin',
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com'
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
	},
	{
		rel: 'apple-touch-icon',
		sizes: '180x180',
		href: '/favicon/apple-touch-icon.png'
	},
	{
		rel: 'icon',
		type: 'image/png',
		href: '/favicon/favicon-32x32.png'
	},
	{
		rel: 'icon',
		type: 'image/png',
		href: '/favicon/favicon-16x16.png'
	},
	{
		rel: 'manifest',
		href: '/favicon/site.webmanifest'
	},
	{
		rel: 'mask-icon',
		href: '/favicon/safari-pinned-tab.svg',
		color: '#000000'
	},
	{
		rel: 'shortcut icon',
		href: '/favicon/favicon.ico'
	},
	{
		rel: 'alternate',
		href: '/feed.xml',
		type: 'application/rss+xml'
	}
]

export function HEAD_META(homeOgImageUrl: string) {
	return [
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
