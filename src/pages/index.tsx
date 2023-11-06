import { Head } from 'partials'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { siBandcamp, siFacebook, siInstagram, siReverbnation, siTwitter } from 'simple-icons'
import { Container, Layout } from 'components'
import { Icon } from 'partials'
import { getContactData, getHomePageData, getIcs } from 'utils'
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
			social: { band_camp, facebook, instagram, reverbnation, twitter_x }
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
	console.log('reverbnation', reverbnation)
	const headData = {
		title,
		link: HEAD_LINKS,
		meta: HEAD_META({
			description: `The homepage for the Northwest Afrobeat musical group, Extra Thick.`,
			homeOgImageUrl: mediaItemUrl
		})
	}
	const { events } = JSON.parse(calendar) as VCalendar
	const h2Class = `text-3xl uppercase font-bold pb-6`
	const panelClass = `flex-1 p-16 pt-14`
	const hasSocial = band_camp || facebook || instagram || reverbnation || twitter_x

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
					{hasSocial && (
						<div className={`social text-center`}>
							<p>{`Follow us on`}</p>
							<ul className={`flex flex-row items-center space-x-2 justify-center`}>
								{band_camp && (
									<li>
										<a href={band_camp} className={'flex'} title={`Extra Thick on BandCamp`}>
											<Icon className={'block mr-2 icon-social'} icon={siBandcamp} />
											<span className={`block`}>{`BandCamp`}</span>
										</a>
									</li>
								)}
								{facebook && (
									<li>
										<a href={facebook} className={'flex'} title={`Extra Thick on Facebook`}>
											<Icon className={'block mr-2 icon-social'} icon={siFacebook} />
											<span className={`block`}>{`Facebook`}</span>
										</a>
									</li>
								)}
								{instagram && (
									<li>
										<a href={instagram} className={'flex'} title={`Extra Thick on Instagram`}>
											<Icon className={'block mr-2 icon-social'} icon={siInstagram} />
											<span className={`block`}>{`Instagram`}</span>
										</a>
									</li>
								)}
								{reverbnation && (
									<li>
										<a href={reverbnation} className={'flex'} title={`Extra Thick on Reverbnation`}>
											<Icon className={'block mr-2 icon-social'} icon={siReverbnation} />
											<span className={`block`}>{`Reverbnation`}</span>
										</a>
									</li>
								)}
								{twitter_x && (
									<li>
										<a href={twitter_x} className={'flex'} title={`Extra Thick on Twitter (X)`}>
											<Icon className={'block mr-2 icon-social'} icon={siTwitter} />
											<span className={`block`}>{`Twitter (X)`}</span>
										</a>
									</li>
								)}
							</ul>
						</div>
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
	const [contactInfo, data] = await Promise.all([getContactData(), getHomePageData()])
	data.calendar = JSON.stringify(await getIcs(data?.calendarId as string))
	data.contactInfo = contactInfo
	console.log('contactInfo', contactInfo)

	return {
		props: { data, preview },
		revalidate: 10
	}
}
