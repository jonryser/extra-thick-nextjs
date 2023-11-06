module.exports = {
	useTabs: true,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	printWidth: 100,
	trailingComma: 'none',
	// import order https://github.com/trivago/prettier-plugin-sort-imports
	// third party modules are automatically moved to the top
	importOrder: [
		'^react',
		'<THIRD_PARTY_MODULES>',
		'^store/(.*)$',
		'^reducers/(.*)$',
		'^components/(.*)$',
		'^pages/(.*)$',
		'^layouts/(.*)$',
		'^common/(.*)$',
		'^partials/(.*)$',
		'^widgets/(.*)$',
		'^utils/(.*)$',
		'^dictionary/(.*)$',
		'^config/(.*)$',
		'^types/(.*)$',
		'^hooks/(.*)$',
		'^styles/(.*)$',
		'^icons/(.*)$',
		'^__tests__/(.*)$',
		'^__mocks__/(.*)$',
		'^[./]'
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	overrides: [
		// Overrides for local json
		{
			files: ['**/package.json', '**/locales/**/*.json', '.github/**/*.yml'],
			options: {
				useTabs: false,
				tabWidth: 2
			}
		}
	]
}
