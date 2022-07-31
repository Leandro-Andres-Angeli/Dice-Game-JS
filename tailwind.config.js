/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
	content: ['./*.{html,js}'],
	theme: {
		extend: {
			colors: {
				blue: colors.blue,
				indigo: colors.indigo,
				cyan: colors.cyan,
				sky: colors.sky,
				white: colors.white,
				bg_white: '#ffffff61',
			},
		},
	},
	plugins: [],
};
