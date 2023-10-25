import Container from './container'
import cn from 'classnames'
import Link from 'next/link'
import { PreviewProps } from 'types/index'

export default function Alert({ preview }: PreviewProps) {
	const divClass = cn('border-b', {
		'bg-accent-7 border-accent-7 text-white': preview,
		'bg-accent-1 border-accent-2': !preview
	})
	return preview ? (
		<div className={divClass}>
			<Container>
				<div className='py-2 text-center text-sm'>
					<>
						{`This is a page preview. `}
						<Link
							href='/api/exit-preview'
							className='underline hover:text-cyan duration-200 transition-colors'
						>
							{`Click here`}
						</Link>
						{` to exit preview mode.`}
					</>
				</div>
			</Container>
		</div>
	) : (
		<></>
	)
}
