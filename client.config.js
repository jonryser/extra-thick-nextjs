module.exports = {
	name: 'Extra Thick',
	defaultMetaTitle: 'GenUI',
	headerLogo: '/images/genui_logo.svg',
	signInImage: '/images/genui_logo.svg',
	favicon: '/images/genui_logo.svg',
	about: {
		title: 'Extra Thick Northwest Afrobeat',
		image: '/images/fist_bump.jpg',
		imageAlt: 'Fist bump',
		description:
			`Built upon a rich legacy of deep grooves and sweaty dance floors, EXTRA THICK is the evolution of Afrobeat from the Pacific Northwest.\n6 (and a half) of the original 8 members of Cascadia'10 and decided to regroup and become double in size… to become extra… to become thick… they decided to become…\n\nEXTRA THICK!`,
	},
	backgroundColor: 'rgba(0, 0, 0, 0.039)',
	tailwindTheme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			},
			typography: {
				DEFAULT: {
					css: {
						color: '#474747'
					}
				}
			},
			colors: {
				primary: '#37f49e',
				'primary-hover': '#27e48e',
				'primary-light': '',
				'primary-light-hover': '#27e48e',
				'primary-dark': '#222222',
				'primary-dark-hover': '#27e48e',
				'button-text-primary': '#222222',
				'button-text-secondary': '#FFFFFF',
				secondary: '#222',
				'secondary-hover': '#222',
				'secondary-dark': '#111',
				'secondary-text-dark': '#222222',
				'accent-1': 'cyan',
				'accent-2': 'magenta',
				'accent-3': 'orange',
				success: '#37f49e',
				warning: 'rgb(253, 186, 140)',
				danger: '#e74c3c',
				info: 'rgb(49, 196, 141)',
				muted: 'rgb(209, 213, 219)'
				// You can also edit tail wind colors here e.g. `'blue-600': 'green'
				// This is not recommended.
				// Use primary, secondary, or add a relevant named color that can easily changed.
			}
		}
	}
}
