import { render, screen } from '@testing-library/react'
import { generateEvent } from 'tests/__mocks__'
import { VEvent } from 'ts-ics'
import { DateFormatType, formatDate } from 'utils'
import { END_TIME_PREFIX, Event, LOCATION_PREFIX } from 'widgets/Calendar/Event'

const eventData: VEvent = generateEvent({})

describe('Event', () => {
	test('renders event summary', () => {
		render(<Event data={eventData} />)
		expect(screen.getByText(eventData.summary)).toBeInTheDocument()
	})

	test('renders event date', () => {
		const date = formatDate({ date: eventData.start.date }) as string
		render(<Event data={eventData} />)
		expect(screen.getByText(date)).toBeInTheDocument()
	})

	test('renders event end time', () => {
		const endTime = formatDate({ date: eventData.end?.date, format: DateFormatType.TIME }) as string
		render(<Event data={eventData} />)
		expect(screen.getByText(`${END_TIME_PREFIX}${endTime}`)).toBeInTheDocument()
	})

	test('renders event location', () => {
		const location: string = eventData.location as string
		render(<Event data={eventData} />)
		expect(screen.getByText(`${LOCATION_PREFIX}${location}`)).toBeInTheDocument()
	})

	test('renders empty div if no location', () => {
		const location: string = eventData.location as string
		render(<Event data={{ ...eventData, location: '' }} />)
		expect(screen.queryByText(`${LOCATION_PREFIX}${location}`)).not.toBeInTheDocument()
	})
})
