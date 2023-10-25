import { Head } from 'components/partials'
import { GetStaticProps } from 'next'
import Container from 'components/container'
import Layout from 'components/layout'
import { getDataForHome } from 'utils/api'
import Image from 'next/image'
import { HomePageData, Preview } from 'types/index'
import { PLACEHOLDER_IMAGE } from 'utils/constants'
import { HEAD_LINKS, HEAD_META } from 'utils/constants/headData'
import { type VCalendar } from 'ts-ics'
import { Calendar, MusicPlayer } from 'components/widgets'
import { getIcs } from 'utils/index'

export default function Index({
	data: {
		bio,
		bioTitle,
		calendar,
		calendarTitle,
		heroImage: { altText, mediaItemUrl },
		musicDesc,
		musicTitle,
		playerSectionTitle,
		playerTitle,
		rnArtistId,
		title
	},
	preview
}: {
	data: HomePageData
	preview: Preview
}) {
	const headData = {
		title,
		link: HEAD_LINKS,
		meta: HEAD_META(mediaItemUrl)
	}
	const { events } = JSON.parse(calendar) as VCalendar
	const h2Class = `text-3xl uppercase font-bold pb-6`
	const panelClass = `flex-1 p-16 pt-14`

	return (
		<Layout preview={preview}>
			<Head data={headData} />
			<Container>
				<h1
					className='md:text-6xl text-3xl bold tracking-tighter leading-tight md:leading-none mb-4 pt-2 text-center'
					dangerouslySetInnerHTML={{ __html: title }}
				/>
				{mediaItemUrl && (
					<Image
						alt={altText}
						blurDataURL={PLACEHOLDER_IMAGE}
						className={'border-t-4 border-t-red-700 hero'}
						height={380}
						loading={'lazy'}
						placeholder={'blur'}
						src={mediaItemUrl}
						width={1100}
					/>
				)}
			</Container>
			<Container className={`xl:flex whitespace-pre-wrap`}>
				<div className={panelClass}>
					<h2 className={h2Class}>{calendarTitle}</h2>
					<Calendar events={events} />
				</div>
				<div className={`${panelClass} bg-gray-2`}>
					<h2 className={h2Class}>{bioTitle}</h2>
					<p className={`pb-6`}>{bio}</p>
					<h2 className={h2Class}>{musicTitle}</h2>
					<p>{musicDesc}</p>
				</div>
				<div className={`${panelClass} bg-gray-3`}>
					<h2 className={h2Class}>{playerTitle}</h2>
					<MusicPlayer rnArtistId={rnArtistId} title={playerSectionTitle} />
				</div>
			</Container>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const data: Record<string, unknown> = await getDataForHome()
	const calendar = JSON.stringify(await getIcs(data?.calendarId as string))
	data.calendar = calendar

	return {
		props: { data, preview },
		revalidate: 10
	}
}
