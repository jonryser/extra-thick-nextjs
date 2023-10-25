import { TagEdge } from 'types'

export function Tags({ tags: { edges } }: { tags: { edges: TagEdge[] } }) {
	return (
		<div className='max-w-2xl mx-auto'>
			<p className='mt-8 text-lg font-bold'>
				{`Tagged`}
				{edges.map((tag: TagEdge, index: number) => (
					<span key={index} className='ml-4 font-normal'>
						{tag.node.name}
					</span>
				))}
			</p>
		</div>
	)
}
