import { about } from 'client.config'
import { AboutConfig } from 'types/Config'

const { description, linkLabel, title } = about as AboutConfig

const client = {
	about: {
		title: {
			message: title
		},
		description: {
			message: description
		},
		linkLabel: {
			message: linkLabel
		}
	}
}

export default client
