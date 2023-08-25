module.exports = {
	root: true,
	extends: ['@react-native', 'prettier'],
	rules: {
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: { multiline: true, minProperties: 3 },
				ObjectPattern: { multiline: true, minProperties: 3 },
				ImportDeclaration: { multiline: true, minProperties: 3 },
				ExportDeclaration: { multiline: true, minProperties: 3 },
			},
		],
	},
};
