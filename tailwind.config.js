import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: "#0c0c0c",
					},
				},
				dark: {
					colors: {
						primary: "white",
					},
				},
			},
		}),
	],
};
