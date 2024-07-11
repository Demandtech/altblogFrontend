import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */

// dark:bg-[#171717]
//[#27272a]
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				dark: "#27272a",
				dark90: "#171717",
				dark80: "#27272a",
				dark70: "#252525",
			},
		},
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
