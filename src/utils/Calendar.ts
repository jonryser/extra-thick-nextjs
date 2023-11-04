import { VCalendar, parseIcsCalendar } from 'ts-ics'
import { ICS_URL } from 'utils/constants'

export function getGoogleDriveImage(url: string) {
	const parsed = new URL(url)
	const id = parsed.searchParams.get('id')
	return `https://drive.google.com/uc?export=view&id=${id}`
}

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
