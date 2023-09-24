import { changeCase } from "@sveu/extend/changeCase"

import fs from "fs"
import path from "path"

function get_sidebar() {
	const sidebar = []

	const pkg_path = path.join(__dirname, "..", "src/routes/components")

	const folders = fs
		.readdirSync(pkg_path, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)

	for (const folder of folders) {
		sidebar.push({
			title: changeCase(folder, "capitalCase"),
			to: `/components/${folder}/`,
		})
	}

	return sidebar
}

export const sidebar = get_sidebar()
