var path = require('path')

module.exports = {
	entry: {
		index: './controller/index',
		//airtable: './include/js/airtableapi/airtable.js'
	}, // .js after index is optional
	output: {
		//filename: '[name].bundle.js',
		//path: path.resolve(__dirname, 'dist')

		path: path.join(__dirname, 'controller'),
		filename: 'bundle.js'
	},

	resolve: {
		alias: {
			airtable: '../include/js/airtableapi/airtable.js',
			Async: '../include/js/async.min.js'
		}
	},
	node: {
		fs: 'empty'
	}
};