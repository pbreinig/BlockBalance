module.exports = {
	root: true,
	plugins: ['@tanstack/query'],
	extends: [
		'@react-native',
		'plugin:prettier/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'no-console': 'error',
		'linebreak-style': 'off',
		'react-native/no-inline-styles': 'off',
	},
};
