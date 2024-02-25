import { DateTime } from 'luxon'
import { VEvent } from 'ts-ics'
import { DateFormatType, compareDate, formatDate, normalizeDate } from 'utils'
import { Event } from './Event'

export const NO_EVENTS_MSG = 'Stay tuned!'

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc'
}

type SortOrderType = SortOrder.ASC | SortOrder.DESC

export function Calendar({
	all = false,
	events = [],
	order = SortOrder.ASC,
	past = false
}: {
	all?: boolean
	events?: VEvent[]
	order?: SortOrderType
	past?: boolean
}): JSX.Element {
	const elements: JSX.Element[] = buildAndSortEvents({ all, events, order, past })
	if (elements.length === 0) {
		return <p className={'pb-6 flex'}>{NO_EVENTS_MSG}</p>
	}
	return <>{elements}</>
}

function buildAndSortEvents({
	all = false,
	events = [],
	order = SortOrder.ASC,
	past = false
}: {
	all?: boolean
	events?: VEvent[]
	order?: SortOrderType
	past?: boolean
}): JSX.Element[] {
	const eventObj: { [date: string]: JSX.Element } = {}
	events.forEach((event: VEvent, index: number): void => {
		const date = normalizeDate(event.start.date)
		const formattedDate = formatDate({ date })
		if (!formattedDate) return
		const timestamp = date.getTime()
		const comparedDates = compareDate(DateTime.fromFormat(formattedDate, DateFormatType.DATE))
		if (!all && ((past && comparedDates >= 0) || (!past && comparedDates < 0))) {
			return
		}
		eventObj[timestamp] = <Event data={event} index={index} key={`event-${index}`} />
	})
	const sortedEvents = Object.keys(eventObj).sort()
	if (order === SortOrder.DESC) {
		sortedEvents.reverse()
	}
	return sortedEvents.map((timestamp) => eventObj[timestamp])
}
