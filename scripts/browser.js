const { build } = require("esbuild")

;(() => {
	build({
		bundle: true,
		define: {
			__DEV__: JSON.stringify(process.env.NODE_ENV || "development"),
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		},
		entryPoints: ["src/runtime/runtime.ts"],
		minify: process.env.NODE_ENV === "production",
		outfile: "dist/browser/index.js",
		sourcemap: true,
	})
})()
