import { IconProps } from './IconProps'

export const Icon = ({ className, icon, testId = 'Icon', color = '#fff' }: IconProps) => {
	console.log('icon', icon.svg)
	return (
		<svg
			role={`img`}
			className={className}
			viewBox={`0 0 24 24`}
			fill={color}
			xmlns={`http://www.w3.org/2000/svg`}
		>
			<title>{icon.title}</title>
			<path d={icon.path} />
		</svg>
	)
	return (
		<span
			className={className}
			data-testid={testId}
			dangerouslySetInnerHTML={{ __html: icon.svg }}
		/>
	)
}
