import { Head } from 'partials'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { Container, Layout } from 'components'
import { getDataForHome, getIcs } from 'utils'
import { HomePageData, Preview } from 'types'
import { HEAD_LINKS, HEAD_META, PLACEHOLDER_IMAGE } from 'utils/constants'
import { type VCalendar } from 'ts-ics'
import { Calendar, MusicPlayer } from 'widgets'

export default function Index({
	data: {
		bio,
		bioTitle,
		calendar,
		calendarTitle,
		contactInfo: {
			contact: { name, email },
			social: { base_camp, facebook, instagram, reverbnation, twitter_x }
		},
		contactSectionTitle,
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
					<h2 className={h2Class}>{contactSectionTitle}</h2>
					<p className={`pb-6`}>
						<span className={`block`}>{name}</span>
						<span className={`block`}>
							<a
								href={`mailto:${facebook}`}
								className={``}
								title={`Send Moose from Extra Thick an email`}
							>
								{email}
							</a>
						</span>
					</p>
					{base_camp && (
						<p>
							{`Follow us on `}
							<a href={base_camp} className={``} title={`Extra Thick on BaseCamp`}>{`BaseCamp`}</a>
						</p>
					)}
					{facebook && (
						<p>
							{`Follow us on `}
							<a href={facebook} className={``} title={`Extra Thick on Facebook`}>{`Facebook`}</a>
						</p>
					)}
					{instagram && (
						<p>
							{`Follow us on `}
							<a
								href={instagram}
								className={``}
								title={`Extra Thick on Instagram`}
							>{`Instagram`}</a>
						</p>
					)}
					{reverbnation && (
						<p>
							{`Follow us on `}
							<a
								href={reverbnation}
								className={``}
								title={`Extra Thick on Reverbnation`}
							>{`Reverbnation`}</a>
						</p>
					)}
					{twitter_x && (
						<p>
							{`Follow us on `}
							<a
								href={twitter_x}
								className={``}
								title={`Extra Thick on Twitter (X)`}
							>{`Twitter (X)`}</a>
						</p>
					)}
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
	const {
		contactInfo,
		homePage: data
	}: { contactInfo: Record<string, unknown>; homePage: Record<string, unknown> } =
		await getDataForHome()
	data.calendar = JSON.stringify(await getIcs(data?.calendarId as string))
	data.contactInfo = contactInfo

	return {
		props: { data, preview },
		revalidate: 10
	}
}
