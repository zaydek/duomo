import sass from "sass"

declare namespace global {
	function sass(data: string): string
}

// Ex:
//
// sassy(`.t-0 { top: 0; }`)
//
// .t-0 {
//   top: 0;
// }
//
global.sass = (data: string) => {
	const result = sass.renderSync({
		indentType: "tab",
		indentWidth: 1,
		data,
	})
	return result.css.toString()
}
