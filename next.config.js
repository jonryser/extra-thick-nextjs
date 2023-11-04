if (!process.env.WP_DOMAIN) {
	throw new Error(`
    Please provide a valid WordPress instance Domain.
    Set to the environment variables WP_DOMAIN.
  `)
}

/** @type {import('next').NextConfig} */

// Doc: https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	images: {
		domains: [
			process.env.WP_DOMAIN,
			'0.gravatar.com',
			'1.gravatar.com',
			'2.gravatar.com',
			'drive.google.com',
			'secure.gravatar.com'
		]
	},
	output: 'standalone',
	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false
		}

		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		})

		return config
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	eslint: {
		// Note: linting is already run on PRs into development;
		// Doing it during build-time is duplicative
		ignoreDuringBuilds: true
	}
})
