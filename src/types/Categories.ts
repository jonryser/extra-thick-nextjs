export interface Author {
	node: {
		avatar: { url: string }
		firstName: string
		id: number
		lastName: string
		name: string
	}
}

export interface Categories {
	edges: CatEdge[] | CatEdge
}

export interface CatEdge {
	node: Category
}

export interface Category {
	name: string
}

export interface Image {
	node: {
		sourceUrl: string
	}
}

export interface Post {
	author: Author
	categories: Categories
	content: string | TrustedHTML
	coverImage?: Image
	date: string
	excerpt: string
	featuredImage?: Image
	id: number
	slug: string
	status: string
	tags: { edges: CatEdge[] }
	title: string
}

export interface Posts {
	edges: CatEdge[] | CatEdge
}

export interface PostEdge {
	node: Post
}

export interface Tags {
	edges: TagEdge[] | TagEdge
}

export interface TagEdge {
	node: Tag
}

export interface Tag {
	name: string
}
