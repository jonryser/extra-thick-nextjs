import { PageTags } from './../../components/partials/Head/HeadProps'

export const pageTags: PageTags = {
	meta: [
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
		}
	]
}
