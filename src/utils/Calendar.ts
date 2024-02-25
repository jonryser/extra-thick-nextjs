import { DateTime } from 'luxon'
import { VCalendar, parseIcsCalendar } from 'ts-ics'
import { GOOGLE_IMAGE_URL, ICS_URL } from 'utils/constants'

export enum DateFormatType {
	DATE = 'MMMM dd, yyyy',
	TIME = 'h:mm'
}
type DateFormat = DateFormatType.DATE | DateFormatType.TIME | string

export function compareDate(date: DateTime): number {
	const today = DateTime.local().startOf('day')
	date = date.startOf('day')

	if (today < date) {
		return 1
	} else if (today.equals(date)) {
		return 0
	}
	// today > eventDate
	return -1
}

export function fixGoogleIcsString(string?: string): string {
	if (!string) return ''
	return string
		.replace(/\\,/g, ',')
		.replace(/\\n/g, '\n')
		.replace(/\\N/g, 'N')
		.replace(/\\\\/g, '\\')
		.replace(/\\;/g, ';')
}

export function formatDate({
	date,
	format = DateFormatType.DATE
}: {
	date?: Date | string
	format?: DateFormat
}): string | null {
	if (!date) return null
	const normalizedDate = normalizeDate(date)
	if (isNaN(normalizedDate.getTime())) {
		console.error(`formatDate was passed an invalid date (${date})`)
		return null
	}
	const formatted = DateTime.fromJSDate(normalizedDate).toFormat(format)
	return formatted
}

export function getGoogleDriveImage(url: string) {
	try {
		const id = new URL(url).searchParams.get('id')
		if (!id) {
			console.log(`getGoogleDriveImage was passed a URL with no image id (${url})`)
			return ''
		}
		return `${GOOGLE_IMAGE_URL(id)}`
	} catch (error) {
		console.error(`getGoogleDriveImage was passed an invalid URL (${url})`, error)
		return ''
	}
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

export function normalizeDate(date: Date | string): Date {
	return date instanceof Date ? date : new Date(date)
}
