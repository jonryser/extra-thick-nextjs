import { DateTime } from 'luxon'
import { VEvent } from 'ts-ics'

export function Calendar({ events }: { events?: VEvent[] }) {
	const elements = events?.map(({ summary, start, end, location, description }, index) => {
		location = location?.replaceAll('\\', '')
		const locationList: string[] = location?.split(',') || []
		const date = DateTime.fromISO(start.date.toString()).toFormat('MMMM dd, yyyy')
		const endTime = end ? DateTime.fromISO(end.date.toString()).toFormat('h:mm') : end
		const startTime = DateTime.fromISO(start.date.toString()).toFormat('h:mm')
		return (
			<div key={index} className={`pb-6`}>
				<h3 className={`text-2xl font-bold pb-2`}>{summary}</h3>
				{locationList[0] && (
					<p className={`text-1xl font-semibold pb-1`}>{`@ ${locationList[0]}`}</p>
				)}
				{date && <p>{date}</p>}
				{(endTime || startTime) && (
					<p>
						{startTime && <span>{startTime}</span>}
						{startTime && endTime && ` `}
						{endTime && <span>{`till ${endTime}`}</span>}
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
				{description && <p>{description}</p>}
			</div>
		)
	})
	return <>{elements}</>
}
