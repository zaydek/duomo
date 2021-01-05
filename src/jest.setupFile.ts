import sass from "sass"

declare namespace global {
	function sass(data: string): string
	function errSass(testStr: string): Function
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
	// global.sass = (data: string) => {	
	// 	const res = sass.renderSync({	
	// 		data,	
	// 		outputStyle: "compressed" as const,	
	// 	})	
	// 	const fmt = prettier.format(res.css.toString(), {	
	// 		parser: "css",	
	// 		tabWidth: 2,	
	// 		useTabs: true,	
	// 	})	
	// 	return fmt	
	// }	
	
	const res = sass.renderSync({
		data,
		indentType: "tab",
		indentWidth: 1,
	})
	return res.css.toString()
}

// Returns a function that intentionally throws an error (from Sass).
//
// Ex:
//
// expect(errSass(`"Hello, world!"))
//   .toThrowError("Hello, world!")
//
global.errSass = (testStr: string) => {
	const sassFn = () => {
		global.sass(`
			@use "index" as * with ($headless: true);
			@error ${testStr};
		`)
	}
	return sassFn
}