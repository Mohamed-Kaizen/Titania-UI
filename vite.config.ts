import { sveltekit } from "@sveltejs/kit/vite"

import {
	extractorSvelte,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerVariantGroup,
} from "unocss"
import Unocss from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Components from "unplugin-svelte-components/vite"
import type { UserConfig } from "vite"

const config: UserConfig = {
	plugins: [
		AutoImport({
			dts: "./src/auto-imports.d.ts",
			imports: ["svelte", "svelte/store", "svelte/transition"],
			dirs: ["./src/lib"],
			eslintrc: {
				enabled: true,
			},
		}),
		Components({
			dirs: ["./src/components"],
			dts: "./src/components.d.ts",
			directoryAsNamespace: true,
		}),
		Unocss({
			presets: [presetIcons(), presetUno(), presetWebFonts({})],
			extractors: [extractorSvelte],
			transformers: [transformerVariantGroup()],
		}),
		sveltekit(),
	],
}

export default config
