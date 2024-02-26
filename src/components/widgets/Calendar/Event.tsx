import { VEvent } from 'ts-ics'
import { DateFormatType, fixGoogleIcsString, formatDate, getGoogleDriveImage } from 'utils'

export const END_TIME_PREFIX = 'till '
export const LOCATION_PREFIX = '@ '
export const POSTER_ALT_PREFIX = 'Poster for '

export function Event({
	data: { attach, summary, start, end, location, description },
	index = 0
}: {
	data: VEvent
	index?: number
}): JSX.Element {
	description = fixGoogleIcsString(description)
	location = location?.replaceAll('\\', '')
	summary = fixGoogleIcsString(summary)
	const endTime = formatDate({ date: end?.date, format: DateFormatType.TIME })
	const date = formatDate({ date: start.date })
	const locationList: string[] = location?.split(',') || []
	const startTime = formatDate({ date: start.date, format: DateFormatType.TIME })
	const poster = attach ? getGoogleDriveImage(attach) : undefined
	return (
		<div key={`event-${startTime}-${index}`} className={`event pb-6 flex`}>
			<div className={`content-event`}>
				<h3 className={`text-2xl font-bold pb-2`}>{summary}</h3>
				{locationList[0] && (
					<p className={`text-1xl font-semibold pb-1`}>{`${LOCATION_PREFIX}${locationList[0]}`}</p>
				)}
				{date && <p className={`event-date`}>{date}</p>}
				{(endTime || startTime) && (
					<p>
						{startTime && <span>{startTime}</span>}
						{startTime && endTime && ` `}
						{endTime && <span>{`${END_TIME_PREFIX}${endTime}`}</span>}
					</p>
				)}
				{locationList[1] && (
					<p>
						<span className={`block`}>{locationList[1]}</span>
						{locationList[2] && (
							<span className={`block`}>
								{`${locationList[2]}${locationList[3] && `, ${locationList[3]}`}`}
							</span>
						)}
						{locationList[4] && <span className={`block`}>{locationList[4]}</span>}
					</p>
				)}
				{description && <section dangerouslySetInnerHTML={{ __html: description }} />}
			</div>
			{poster && false && (
				<div className={`poster-event`}>
					<a href={poster} target='_blank' rel='noopener noreferrer'>
						<img
							alt={`${POSTER_ALT_PREFIX}${summary}`}
							className={'poster-calendar'}
							height={200}
							loading={'lazy'}
							placeholder={'blur'}
							src={poster}
							width={100}
						/>
					</a>
				</div>
			)}
		</div>
	)
}
