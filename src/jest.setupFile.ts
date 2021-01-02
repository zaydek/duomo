import prettier from "prettier"
import sass from "sass"

declare namespace global {
	function sass(data: string): string
}

// Ex:
//
// sassy(`.mx-0 { margin-left: 0; margin-right: 0; }`)
//
// -> .mx-0 {
// ->   margin-left: 0;
// ->   margin-right: 0;
// -> }
//
global.sass = (data: string) => {
	const res = sass.renderSync({
		data,
		outputStyle: "compressed" as const,
	})
	const fmt = prettier.format(res.css.toString(), {
		parser: "css",
		tabWidth: 2,
		useTabs: true,
	})
	return fmt
}
