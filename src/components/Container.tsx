import { PropsWithChildren } from 'react'
import cn from 'classnames'

export function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
	const divClass = cn('font-body mx-auto', className)
	return <div className={divClass}>{children}</div>
}
