import { VCalendar, parseIcsCalendar } from 'ts-ics'
import { ICS_URL } from './constants'

export async function getIcs(id: string): Promise<VCalendar | undefined> {
	try {
		const res: VCalendar = await fetch(ICS_URL(id), {
			method: 'GET'
		})
			.then((response) => response.text())
			.then((textString) => {
				return parseIcsCalendar(textString)
			})

		return res
	} catch (error) {
		console.log(error)
	}
}
