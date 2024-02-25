import isObject from 'lodash/isObject'
import { CatEdge, Categories as CategoriesType } from 'types'

export function Categories({ categories }: { categories?: CategoriesType }) {
	return (
		<span className={'ml-1'}>
			{`under`}
			<Names edges={categories?.edges} />
		</span>
	)
}

function Names({ edges }: { edges?: CatEdge[] | CatEdge }) {
	if (Array.isArray(edges) && edges.length > 0) {
		return (
			<>
				{edges.map((catEdge, index) => (
					<Name key={index} edge={catEdge} />
				))}
			</>
		)
	}
	return <Name edge={edges as CatEdge} />
}

function Name({ edge }: { edge?: CatEdge }) {
	if (isObject(edge) && edge?.node.name) {
		return <span className={'ml-1'}>{edge?.node.name}</span>
	}
	return <></>
}
