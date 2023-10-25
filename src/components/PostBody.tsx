import styles from 'styles/post-body.module.css'

export function PostBody({ content }: { content: string | TrustedHTML }) {
	return (
		<div className='max-w-2xl mx-auto'>
			<div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	)
}
