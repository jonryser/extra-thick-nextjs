export function ICS_URL(calendar_id: string) {
	return `https://calendar.google.com/calendar/ical/${calendar_id}/public/basic.ics`
}

export function GOOGLE_IMAGE_URL(id?: string) {
	if (!id) return ''
	return `https://drive.google.com/uc?export=view&id=${id}sz=w1000`
}

export const MAX_AGE = 60 * 30 // 30 minutes

// Token to be used in url that will be replaced by the app's set root page path
export const ROOT_TOKEN = `%{ROOT}`

export const PLACEHOLDER_IMAGE = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2ODAuNzY0IiBoZWlnaHQ9IjUyOC4zNTQiIHZpZXdCb3g9IjAgMCAxODAuMTE5IDEzOS43OTQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMy41OSAtNjYuNjM5KSIgcGFpbnQtb3JkZXI9ImZpbGwgbWFya2VycyBzdHJva2UiPjxwYXRoIGZpbGw9IiNkMGQwZDAiIGQ9Ik0xMy41OTEgNjYuNjM5SDE5My43MXYxMzkuNzk0SDEzLjU5MXoiLz48cGF0aCBkPSJtMTE4LjUwNyAxMzMuNTE0LTM0LjI0OSAzNC4yNDktMTUuOTY4LTE1Ljk2OC00MS45MzggNDEuOTM3SDE3OC43MjZ6IiBvcGFjaXR5PSIuNjc1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTguMjE3IiBjeT0iMTA4LjU1NSIgcj0iMTEuNzczIiBvcGFjaXR5PSIuNjc1IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTI2LjExMSA3Ny42MzRoMTUyLjYxNHYxMTYuMDk5SDI2LjExMXoiLz48L2c+PC9zdmc+`
