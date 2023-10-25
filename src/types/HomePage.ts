export interface HomePageData {
	bio: string
	bioTitle: string
	calendar: string
	calendarTitle: string
	contactInfo: {
		contact: {
			name: string
			email: string
		}
		social: {
			base_camp?: string
			facebook?: string
			instagram?: string
			reverbnation?: string
			twitter_x?: string
		}
	}
	contactSectionTitle: string
	heroImage: { altText: string; mediaItemUrl: string }
	musicDesc: string
	musicTitle: string
	playerSectionTitle: string
	playerTitle: string
	rnArtistId: string
	title: string
}
