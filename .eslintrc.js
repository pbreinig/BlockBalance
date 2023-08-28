module.exports = {
	root: true,
	extends: ['@react-native', 'plugin:prettier/recommended'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'no-console': 'error',
		'linebreak-style': 'off',
		'react-native/no-inline-styles': 'off',
	},
};
