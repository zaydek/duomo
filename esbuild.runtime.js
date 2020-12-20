const { build } = require("esbuild")

;(() => {
	build({
		bundle: true,
		entryPoints: ["src/runtime/Duomo.ts"],
		outfile: "test.js",
	})
})()
