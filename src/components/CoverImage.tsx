import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { Image as ImageType } from 'types'

interface Props {
	title: string
	coverImage?: ImageType
	slug?: string
}

export default function CoverImage({ title, coverImage, slug }: Props) {
	let image = <></>
	if (coverImage?.node.sourceUrl) {
		image = (
			<Image
				width={2000}
				height={1000}
				alt={`Cover Image for ${title}`}
				src={coverImage?.node.sourceUrl}
				className={cn('shadow-small', {
					'hover:shadow-medium transition-shadow duration-200': slug
				})}
				style={{
					maxWidth: '100%',
					height: 'auto'
				}}
			/>
		)
	}
	return (
		<div className='sm:mx-0'>
			{slug ? (
				<Link href={`/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	)
}
