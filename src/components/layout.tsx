import { PropsWithChildren } from 'react'
import Alert from './alert'
import Footer from './footer'
import { PreviewProps } from 'types/index'

export default function Layout({ preview, children }: PropsWithChildren<PreviewProps>) {
	return (
		<>
			<div className='min-h-screen bg-gray-1 text-white'>
				<Alert preview={preview} />
				<main>{children}</main>
			</div>
			<Footer />
		</>
	)
}
