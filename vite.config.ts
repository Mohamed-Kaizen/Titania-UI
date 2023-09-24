import { defaultTheme } from "@sveltepress/theme-default"
import { sveltepress } from "@sveltepress/vite"

import { defineConfig } from "vite"

import { sidebar } from "./config/sidebar"

const config = defineConfig({
	plugins: [
		sveltepress({
			theme: defaultTheme({
				themeColor: {
					light: "white",
					dark: "white",
					primary: "#1bb75e",
					hover: "#f3761e",
					gradient: {
						start: "#fabf2f",
						end: "#47edca",
					},
				},
				navbar: [
					{
						title: "components",
						to: "/components/checkbox/",
					},
				],
				sidebar: {
					"/components/": [...sidebar],
				},
				github: "https://github.com/Mohamed-Kaizen/Titania-UI",
				logo: "/logo.png",
			}),
			siteConfig: {
				title: "Titania UI",
				description: "As flexible as your imagination.",
			},
		}),
	],
})

export default config
