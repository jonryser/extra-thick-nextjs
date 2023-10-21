import { Categories, CatEdge } from 'types/index'

export default function Categories({ categories }: { categories?: Categories }) {
	const { edges } = categories || {}
	return (
		<span className='ml-1'>
			{`under`}
			<Name edges={edges} />
		</span>
	)
}

function Name({ edges }: { edges?: CatEdge[] | CatEdge }) {
	if (Array.isArray(edges) && edges.length > 0) {
		const names = edges.map((category, index) => (
			<span key={index} className='ml-1'>
				{category.node.name}
			</span>
		))
		return <>{names}</>
	} else if (!Array.isArray(edges) && edges?.node.name) {
		return <span className='ml-1'>{edges.node.name}</span>
	}
	return <></>
}
