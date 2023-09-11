import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import startCase from 'lodash/startCase'

// Seed data images from https://www.pexels.com/search/computer/

const test_admin_email = 'test@email.com'
const { lorem, string: fakeString } = faker
const image01 = '/images/test-seed-images/pexels-ruca-souza-1049764.jpg'
const image02 = '/images/test-seed-images/pexels-athena-2582937.jpg'
const image03 = '/images/test-seed-images/pexels-pixabay-207580.jpg'

export const todos: (Prisma.TodoCreateInput & { id: string; imageUrl?: string })[] =
	process.env.NODE_ENV === 'development'
		? [
				{
					id: fakeString.uuid(),
					title: startCase(lorem.words({ min: 2, max: 5 }).toLowerCase()),
					description: lorem.paragraph({ min: 1, max: 5 }),
					users: { create: { user: { connect: { email: test_admin_email } } } },
					submissionDate: new Date('2022-01-01'),
					endDate: new Date('2022-10-01'),
					imageUrl: image01
				},
				{
					id: fakeString.uuid(),
					title: startCase(lorem.words({ min: 2, max: 5 }).toLowerCase()),
					description: lorem.paragraph({ min: 1, max: 5 }),
					users: { create: { user: { connect: { email: test_admin_email } } } },
					status: 'approved',
					submissionDate: new Date('2021-01-01'),
					endDate: new Date('2021-12-01'),
					imageUrl: image02
				},
				{
					id: fakeString.uuid(),
					title: startCase(lorem.words({ min: 2, max: 5 }).toLowerCase()),
					description: lorem.paragraph({ min: 1, max: 5 }),
					users: { create: { user: { connect: { email: test_admin_email } } } },
					status: 'archived',
					submissionDate: new Date('2020-01-01'),
					endDate: new Date('2020-05-01'),
					imageUrl: image03
				}
		  ]
		: []
