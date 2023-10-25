export function MusicPlayer({ rnArtistId, title }: { rnArtistId: string; title?: string }) {
	return (
		<div className={`container-musicPlayer`}>
			<iframe
				title={title || `Music Player`}
				width={`100%`}
				height={`100%`}
				scrolling={`no`}
				frameBorder={`no`}
				allow={`autoplay`}
				className={`musicPlayer`}
				src={`https://www.reverbnation.com/widget_code/html_widget/${rnArtistId}?widget_id=55&pwc[included_songs]=1&context_type=page_object`}
			></iframe>
		</div>
	)
}
