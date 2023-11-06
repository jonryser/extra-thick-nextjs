module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		extraFileExtensions: ['.json']
	},
	plugins: [
		'jsx-a11y',
		'@typescript-eslint',
		'@trivago/prettier-plugin-sort-imports',
		'unused-imports'
	],
	extends: [
		'next',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		// JSX-A11y Configurations can be found at
		// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
		'plugin:jsx-a11y/recommended'
	],
	rules: {
		// Nextjs rules omited for static rendering
		// https://nextjs.org/docs/basic-features/eslint#eslint-plugin
		// Turn these rules on for Next Fullstack
		'@next/next/no-img-element': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
		'@typescript-eslint/no-empty-interface': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'react/jsx-no-literals': 'error'
	},
	ignorePatterns: [
		'.eslintrc.js',
		'next.config.js',
		'postcss.config.js',
		'.prettierrc.js',
		'tailwind.config.js'
	],
	overrides: [
		{
			files: ['*.spec.*'],
			rules: {
				'react/jsx-no-literals': 'off'
			}
		}
	]
}
