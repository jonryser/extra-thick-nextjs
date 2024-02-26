import { IconProps } from './IconProps'

export const Icon = ({ className, icon, testId = 'Icon', color = '#fff' }: IconProps) => {
	return (
		<svg
			role={`img`}
			className={className}
			viewBox={`0 0 24 24`}
			fill={color}
			data-testid={testId}
			xmlns={`http://www.w3.org/2000/svg`}
		>
			<title>{icon.title}</title>
			<path d={icon.path} />
		</svg>
	)
}
