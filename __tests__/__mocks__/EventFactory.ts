import { faker } from '@faker-js/faker'
import { VEvent } from 'ts-ics'

export function generateEvent({
	days = 1,
	past = false,
	startDate
}: {
	days?: number
	past?: boolean
	startDate?: Date
}): VEvent {
	const defaultStartDate = past
		? faker.date.recent({ days, refDate: new Date(Date.now() - 864e5) })
		: faker.date.soon({ days })
	startDate = startDate ? startDate : defaultStartDate
	return {
		attach: `${faker.internet.url()}?id=${faker.string.uuid()}`,
		description: faker.lorem.paragraph(),
		end: { date: new Date(startDate.getTime() + 8.64e7) },
		location: faker.location.city(),
		stamp: { date: startDate },
		start: { date: startDate },
		summary: faker.lorem.paragraph(),
		uid: faker.string.uuid()
	}
}

export function generateEvents({
	count = 1,
	past = false,
	days = 2
}: {
	count?: number
	days?: number
	past?: boolean
}): VEvent[] {
	const events: VEvent[] = [generateEvent({ days, past })]
	for (let index = 1; index < count; ++index) {
		const prevStartTime = events[index - 1].start.date.getTime()
		const nextStartTime = past ? prevStartTime - 8.7e7 : prevStartTime + 8.7e7
		const startDate = new Date(nextStartTime)
		events.push(generateEvent({ days, past, startDate }))
	}
	return events
}
