/*!
 * Types for Todo model
 */
// TODO: ensure types are being imported from this file and not types/todos
// TODO: ensure includes are coming form models/Todos/includes
import { Prisma, TodoStatus, User } from '@prisma/client'
import { ReactNode } from 'react'
import { PaginatedResponse } from 'types/PaginatedResponse'
import { z as zod } from 'zod'
import { todoDefaultIncludes } from 'utils/includes/todoIncludes'

export type Todo = Prisma.TodoGetPayload<typeof todoDefaultIncludes>

export type TodoWithParticipantIds = Prisma.TodoGetPayload<{
	include: {
		participants: {
			include: {
				participant: {
					select: {
						id: true
					}
				}
			}
		}
	}
}>

export type TodoWithParticipants = Prisma.TodoGetPayload<{
	include: {
		participants: {
			include: {
				participant: true
			}
		}
	}
}>

// TODO: refactor this payload to not include the todo if there is no data from each todo being used
export type ParticipantQueryBuilderTodoPayload = Prisma.TodoGetPayload<{
	select: {
		id: true
		participants: {
			include: {
				// TODO: this should only select the fields relevant to the
				participant: {
					include: {
						todos: {
							// select: {
							// 	consent: true
							// }
						}
					}
				}
			}
		}
	}
}>

export type ApiTodosResponse = PaginatedResponse & {
	todos: ApiTodo[]
}

export type ApiTodosServerResponse = PaginatedResponse & {
	todos: Todo[]
}

export type ApiTodo = Omit<Todo, 'endDate' | 'submissionDate'> & {
	endDate: string
	submissionDate: string
}

export type OptimisticTodo = Todo & { users: { user: User }[] }

type TodoInputToTodoMap = { [key in keyof TodoInput]: keyof Todo }

export const todoInputMap: TodoInputToTodoMap = {
	coordinator: 'users',
	description: 'description',
	endDate: 'endDate',
	image: 'image',
	status: 'status',
	title: 'title',
	dataTypes: 'dataTypes',
	documentation: 'documentation'
}

export type TodoInputMap = typeof todoInputMap

export type SelectOptionsType<T = unknown> = {
	value: string
	label: ReactNode | string
	meta?: T
}

export const TodoSchema = zod.object({
	title: zod.string(),
	coordinator: zod
		.object({ label: zod.string(), value: zod.string() })
		.transform((val) => val.value),
	endDate: zod.string().refine((date) => {
		return new Date(date) > new Date()
	}, 'The end date must be after today'),
	description: zod.string(),
	status: zod.nativeEnum(TodoStatus).optional().default('new'),
	image: zod.any().optional(),
	dataTypes: zod
		.object({ label: zod.string(), value: zod.string() })
		.array()
		.transform((val) => val.map((v) => v.value))
		.refine((data) => data.length > 0, {
			message: 'At least one data type required',
			path: ['dataTypes'] // path of error
		}),
	documentation: zod.any().array().optional()
})

// The shape of data in outgoing axios requests
export type TodoInput = zod.infer<typeof TodoSchema>

export type TodoInputPreTransform = Omit<TodoInput, 'coordinator' | 'dataTypes'> & {
	coordinator?: SelectOptionsType
	dataTypes?: SelectOptionsType[]
}

export const publicFilesSchema = zod.object({
	documentation: zod.any().array()
})
