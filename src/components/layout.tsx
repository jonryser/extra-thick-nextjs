import { PropsWithChildren } from 'react'
import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import { PreviewProps } from 'types/index'

export default function Layout({ preview, children }: PropsWithChildren<PreviewProps>) {
	return (
		<>
			<Meta />
			<div className='min-h-screen'>
				<Alert preview={preview} />
				<main>{children}</main>
			</div>
			<Footer />
		</>
	)
}
