/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			sans: ["CustomSerifFont", "sans-serif"],
			serif: ["CustomSerifFont", "serif"],
			mono: ["CustomSerifFont", "monospace"],
			bold: ["CustomSerifFont", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
