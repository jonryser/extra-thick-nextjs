import { render } from '@testing-library/react'
import { generateEvents } from 'mocks'
import { formatDate } from 'utils'
import { Calendar, NO_EVENTS_MSG, SortOrder } from 'widgets'

describe('Calendar', () => {
	test('renders no events message when no events provided', () => {
		const { getByText } = render(<Calendar />)
		expect(getByText(NO_EVENTS_MSG)).toBeInTheDocument()
	})

	test('renders sorted events in ascending order by default', () => {
		const events = generateEvents({ count: 2 })
		const expectedDate01 = formatDate({ date: events[0].start.date })
		const expectedDate02 = formatDate({ date: events[1].start.date })
		const { container } = render(<Calendar events={events} />)
		const elements = container.querySelectorAll('.event-date')
		const dates: string[] = []
		for (let i in elements) {
			if (elements.hasOwnProperty(i)) {
				dates.push(elements[i].innerHTML)
			}
		}
		expect(dates).toEqual([expectedDate01, expectedDate02])
	})

	test('renders events in descending order when specified', () => {
		const events = generateEvents({ count: 2 })
		const expectedDate01 = formatDate({ date: events[0].start.date })
		const expectedDate02 = formatDate({ date: events[1].start.date })
		const { container } = render(<Calendar events={events} order={SortOrder.DESC} />)
		const elements = container.querySelectorAll('.event-date')
		const dates: string[] = []
		for (let i in elements) {
			if (elements.hasOwnProperty(i)) {
				dates.push(elements[i].innerHTML)
			}
		}
		expect(dates).toEqual([expectedDate02, expectedDate01])
	})

	test('filters past events when past prop set', () => {
		const events = generateEvents({ count: 2, days: 5, past: true })
		// Past dates are built from newest to oldest
		const expectedDate01 = formatDate({ date: events[1].start.date })
		const expectedDate02 = formatDate({ date: events[0].start.date })
		const { container } = render(<Calendar events={events} past={true} />)
		const elements = container.querySelectorAll('.event-date')
		const dates: string[] = []
		for (let i in elements) {
			if (elements.hasOwnProperty(i)) {
				dates.push(elements[i].innerHTML)
			}
		}
		expect(dates).toEqual([expectedDate01, expectedDate02])
	})

	test('shows all events when all prop set', () => {
		const pastEvents = generateEvents({ count: 2, past: true })
		const comingEvents = generateEvents({ count: 2 })
		const events = [...pastEvents, ...comingEvents]
		// Past dates are built from newest to oldest
		const expectedDate01 = formatDate({ date: events[1].start.date })
		const expectedDate02 = formatDate({ date: events[0].start.date })
		// Coming dates are built from oldest to newest
		const expectedDate03 = formatDate({ date: events[2].start.date })
		const expectedDate04 = formatDate({ date: events[3].start.date })
		const { container } = render(<Calendar events={events} all={true} />)
		const elements = container.querySelectorAll('.event-date')
		const dates: string[] = []
		for (let i in elements) {
			if (elements.hasOwnProperty(i)) {
				dates.push(elements[i].innerHTML)
			}
		}
		expect(dates).toEqual([expectedDate01, expectedDate02, expectedDate03, expectedDate04])
	})

	test('shows all events from newest to oldest when all prop set and order set to DESC', () => {
		const pastEvents = generateEvents({ count: 2, past: true })
		const comingEvents = generateEvents({ count: 2 })
		const events = [...pastEvents, ...comingEvents]
		// Past dates are built from newest to oldest
		const expectedDate01 = formatDate({ date: events[1].start.date })
		const expectedDate02 = formatDate({ date: events[0].start.date })
		// Coming dates are built from oldest to newest
		const expectedDate03 = formatDate({ date: events[2].start.date })
		const expectedDate04 = formatDate({ date: events[3].start.date })
		const { container } = render(<Calendar all={true} events={events} order={SortOrder.DESC} />)
		const elements = container.querySelectorAll('.event-date')
		const dates: string[] = []
		for (let i in elements) {
			if (elements.hasOwnProperty(i)) {
				dates.push(elements[i].innerHTML)
			}
		}
		expect(dates).toEqual([expectedDate04, expectedDate03, expectedDate02, expectedDate01])
	})
})
