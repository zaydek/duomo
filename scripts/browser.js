const { build } = require("esbuild")

;(() => {
	build({
		bundle: true,
		define: { "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development") },
		entryPoints: ["src/runtime/index.ts"],
		minify: process.env.NODE_ENV === "production",
		outfile: "dist/browser/index.js",
		sourcemap: true,
	})
})()
