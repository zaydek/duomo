/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("color-vars($alpha: null, (subset: true))", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in color-vars(null, (subset: true)) {
	.bg-#{"" + $mk} {
		background-color: $mv;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.bg-transparent {
	background-color: var(--transparent);
}

.bg-current {
	background-color: var(--current);
}

.bg-black {
	background-color: hsl(var(--black));
}

.bg-white {
	background-color: hsl(var(--white));
}

.bg-cool-gray-50 {
	background-color: hsl(var(--cool-gray-50));
}

.bg-cool-gray-100 {
	background-color: hsl(var(--cool-gray-100));
}

.bg-cool-gray-200 {
	background-color: hsl(var(--cool-gray-200));
}

.bg-cool-gray-300 {
	background-color: hsl(var(--cool-gray-300));
}

.bg-cool-gray-400 {
	background-color: hsl(var(--cool-gray-400));
}

.bg-cool-gray-500 {
	background-color: hsl(var(--cool-gray-500));
}

.bg-cool-gray-600 {
	background-color: hsl(var(--cool-gray-600));
}

.bg-cool-gray-700 {
	background-color: hsl(var(--cool-gray-700));
}

.bg-cool-gray-800 {
	background-color: hsl(var(--cool-gray-800));
}

.bg-cool-gray-900 {
	background-color: hsl(var(--cool-gray-900));
}

.bg-red-50 {
	background-color: hsl(var(--red-50));
}

.bg-red-100 {
	background-color: hsl(var(--red-100));
}

.bg-red-200 {
	background-color: hsl(var(--red-200));
}

.bg-red-300 {
	background-color: hsl(var(--red-300));
}

.bg-red-400 {
	background-color: hsl(var(--red-400));
}

.bg-red-500 {
	background-color: hsl(var(--red-500));
}

.bg-red-600 {
	background-color: hsl(var(--red-600));
}

.bg-red-700 {
	background-color: hsl(var(--red-700));
}

.bg-red-800 {
	background-color: hsl(var(--red-800));
}

.bg-red-900 {
	background-color: hsl(var(--red-900));
}

.bg-amber-50 {
	background-color: hsl(var(--amber-50));
}

.bg-amber-100 {
	background-color: hsl(var(--amber-100));
}

.bg-amber-200 {
	background-color: hsl(var(--amber-200));
}

.bg-amber-300 {
	background-color: hsl(var(--amber-300));
}

.bg-amber-400 {
	background-color: hsl(var(--amber-400));
}

.bg-amber-500 {
	background-color: hsl(var(--amber-500));
}

.bg-amber-600 {
	background-color: hsl(var(--amber-600));
}

.bg-amber-700 {
	background-color: hsl(var(--amber-700));
}

.bg-amber-800 {
	background-color: hsl(var(--amber-800));
}

.bg-amber-900 {
	background-color: hsl(var(--amber-900));
}

.bg-emerald-50 {
	background-color: hsl(var(--emerald-50));
}

.bg-emerald-100 {
	background-color: hsl(var(--emerald-100));
}

.bg-emerald-200 {
	background-color: hsl(var(--emerald-200));
}

.bg-emerald-300 {
	background-color: hsl(var(--emerald-300));
}

.bg-emerald-400 {
	background-color: hsl(var(--emerald-400));
}

.bg-emerald-500 {
	background-color: hsl(var(--emerald-500));
}

.bg-emerald-600 {
	background-color: hsl(var(--emerald-600));
}

.bg-emerald-700 {
	background-color: hsl(var(--emerald-700));
}

.bg-emerald-800 {
	background-color: hsl(var(--emerald-800));
}

.bg-emerald-900 {
	background-color: hsl(var(--emerald-900));
}

.bg-blue-50 {
	background-color: hsl(var(--blue-50));
}

.bg-blue-100 {
	background-color: hsl(var(--blue-100));
}

.bg-blue-200 {
	background-color: hsl(var(--blue-200));
}

.bg-blue-300 {
	background-color: hsl(var(--blue-300));
}

.bg-blue-400 {
	background-color: hsl(var(--blue-400));
}

.bg-blue-500 {
	background-color: hsl(var(--blue-500));
}

.bg-blue-600 {
	background-color: hsl(var(--blue-600));
}

.bg-blue-700 {
	background-color: hsl(var(--blue-700));
}

.bg-blue-800 {
	background-color: hsl(var(--blue-800));
}

.bg-blue-900 {
	background-color: hsl(var(--blue-900));
}

.bg-indigo-50 {
	background-color: hsl(var(--indigo-50));
}

.bg-indigo-100 {
	background-color: hsl(var(--indigo-100));
}

.bg-indigo-200 {
	background-color: hsl(var(--indigo-200));
}

.bg-indigo-300 {
	background-color: hsl(var(--indigo-300));
}

.bg-indigo-400 {
	background-color: hsl(var(--indigo-400));
}

.bg-indigo-500 {
	background-color: hsl(var(--indigo-500));
}

.bg-indigo-600 {
	background-color: hsl(var(--indigo-600));
}

.bg-indigo-700 {
	background-color: hsl(var(--indigo-700));
}

.bg-indigo-800 {
	background-color: hsl(var(--indigo-800));
}

.bg-indigo-900 {
	background-color: hsl(var(--indigo-900));
}

.bg-violet-50 {
	background-color: hsl(var(--violet-50));
}

.bg-violet-100 {
	background-color: hsl(var(--violet-100));
}

.bg-violet-200 {
	background-color: hsl(var(--violet-200));
}

.bg-violet-300 {
	background-color: hsl(var(--violet-300));
}

.bg-violet-400 {
	background-color: hsl(var(--violet-400));
}

.bg-violet-500 {
	background-color: hsl(var(--violet-500));
}

.bg-violet-600 {
	background-color: hsl(var(--violet-600));
}

.bg-violet-700 {
	background-color: hsl(var(--violet-700));
}

.bg-violet-800 {
	background-color: hsl(var(--violet-800));
}

.bg-violet-900 {
	background-color: hsl(var(--violet-900));
}

.bg-pink-50 {
	background-color: hsl(var(--pink-50));
}

.bg-pink-100 {
	background-color: hsl(var(--pink-100));
}

.bg-pink-200 {
	background-color: hsl(var(--pink-200));
}

.bg-pink-300 {
	background-color: hsl(var(--pink-300));
}

.bg-pink-400 {
	background-color: hsl(var(--pink-400));
}

.bg-pink-500 {
	background-color: hsl(var(--pink-500));
}

.bg-pink-600 {
	background-color: hsl(var(--pink-600));
}

.bg-pink-700 {
	background-color: hsl(var(--pink-700));
}

.bg-pink-800 {
	background-color: hsl(var(--pink-800));
}

.bg-pink-900 {
	background-color: hsl(var(--pink-900));
}
`.trim())
})

test("color-vars($alpha: var(--bg-opacity), (subset: true))", () => {
	const css = sass(`
@use "src/sass/getters" as *;

@each $mk, $mv in color-vars(var(--bg-opacity), (subset: true)) {
	.bg-#{"" + $mk} {
		background-color: $mv;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.bg-transparent {
	background-color: var(--transparent);
}

.bg-current {
	background-color: var(--current);
}

.bg-black {
	background-color: hsla(var(--black), var(--bg-opacity));
}

.bg-white {
	background-color: hsla(var(--white), var(--bg-opacity));
}

.bg-cool-gray-50 {
	background-color: hsla(var(--cool-gray-50), var(--bg-opacity));
}

.bg-cool-gray-100 {
	background-color: hsla(var(--cool-gray-100), var(--bg-opacity));
}

.bg-cool-gray-200 {
	background-color: hsla(var(--cool-gray-200), var(--bg-opacity));
}

.bg-cool-gray-300 {
	background-color: hsla(var(--cool-gray-300), var(--bg-opacity));
}

.bg-cool-gray-400 {
	background-color: hsla(var(--cool-gray-400), var(--bg-opacity));
}

.bg-cool-gray-500 {
	background-color: hsla(var(--cool-gray-500), var(--bg-opacity));
}

.bg-cool-gray-600 {
	background-color: hsla(var(--cool-gray-600), var(--bg-opacity));
}

.bg-cool-gray-700 {
	background-color: hsla(var(--cool-gray-700), var(--bg-opacity));
}

.bg-cool-gray-800 {
	background-color: hsla(var(--cool-gray-800), var(--bg-opacity));
}

.bg-cool-gray-900 {
	background-color: hsla(var(--cool-gray-900), var(--bg-opacity));
}

.bg-red-50 {
	background-color: hsla(var(--red-50), var(--bg-opacity));
}

.bg-red-100 {
	background-color: hsla(var(--red-100), var(--bg-opacity));
}

.bg-red-200 {
	background-color: hsla(var(--red-200), var(--bg-opacity));
}

.bg-red-300 {
	background-color: hsla(var(--red-300), var(--bg-opacity));
}

.bg-red-400 {
	background-color: hsla(var(--red-400), var(--bg-opacity));
}

.bg-red-500 {
	background-color: hsla(var(--red-500), var(--bg-opacity));
}

.bg-red-600 {
	background-color: hsla(var(--red-600), var(--bg-opacity));
}

.bg-red-700 {
	background-color: hsla(var(--red-700), var(--bg-opacity));
}

.bg-red-800 {
	background-color: hsla(var(--red-800), var(--bg-opacity));
}

.bg-red-900 {
	background-color: hsla(var(--red-900), var(--bg-opacity));
}

.bg-amber-50 {
	background-color: hsla(var(--amber-50), var(--bg-opacity));
}

.bg-amber-100 {
	background-color: hsla(var(--amber-100), var(--bg-opacity));
}

.bg-amber-200 {
	background-color: hsla(var(--amber-200), var(--bg-opacity));
}

.bg-amber-300 {
	background-color: hsla(var(--amber-300), var(--bg-opacity));
}

.bg-amber-400 {
	background-color: hsla(var(--amber-400), var(--bg-opacity));
}

.bg-amber-500 {
	background-color: hsla(var(--amber-500), var(--bg-opacity));
}

.bg-amber-600 {
	background-color: hsla(var(--amber-600), var(--bg-opacity));
}

.bg-amber-700 {
	background-color: hsla(var(--amber-700), var(--bg-opacity));
}

.bg-amber-800 {
	background-color: hsla(var(--amber-800), var(--bg-opacity));
}

.bg-amber-900 {
	background-color: hsla(var(--amber-900), var(--bg-opacity));
}

.bg-emerald-50 {
	background-color: hsla(var(--emerald-50), var(--bg-opacity));
}

.bg-emerald-100 {
	background-color: hsla(var(--emerald-100), var(--bg-opacity));
}

.bg-emerald-200 {
	background-color: hsla(var(--emerald-200), var(--bg-opacity));
}

.bg-emerald-300 {
	background-color: hsla(var(--emerald-300), var(--bg-opacity));
}

.bg-emerald-400 {
	background-color: hsla(var(--emerald-400), var(--bg-opacity));
}

.bg-emerald-500 {
	background-color: hsla(var(--emerald-500), var(--bg-opacity));
}

.bg-emerald-600 {
	background-color: hsla(var(--emerald-600), var(--bg-opacity));
}

.bg-emerald-700 {
	background-color: hsla(var(--emerald-700), var(--bg-opacity));
}

.bg-emerald-800 {
	background-color: hsla(var(--emerald-800), var(--bg-opacity));
}

.bg-emerald-900 {
	background-color: hsla(var(--emerald-900), var(--bg-opacity));
}

.bg-blue-50 {
	background-color: hsla(var(--blue-50), var(--bg-opacity));
}

.bg-blue-100 {
	background-color: hsla(var(--blue-100), var(--bg-opacity));
}

.bg-blue-200 {
	background-color: hsla(var(--blue-200), var(--bg-opacity));
}

.bg-blue-300 {
	background-color: hsla(var(--blue-300), var(--bg-opacity));
}

.bg-blue-400 {
	background-color: hsla(var(--blue-400), var(--bg-opacity));
}

.bg-blue-500 {
	background-color: hsla(var(--blue-500), var(--bg-opacity));
}

.bg-blue-600 {
	background-color: hsla(var(--blue-600), var(--bg-opacity));
}

.bg-blue-700 {
	background-color: hsla(var(--blue-700), var(--bg-opacity));
}

.bg-blue-800 {
	background-color: hsla(var(--blue-800), var(--bg-opacity));
}

.bg-blue-900 {
	background-color: hsla(var(--blue-900), var(--bg-opacity));
}

.bg-indigo-50 {
	background-color: hsla(var(--indigo-50), var(--bg-opacity));
}

.bg-indigo-100 {
	background-color: hsla(var(--indigo-100), var(--bg-opacity));
}

.bg-indigo-200 {
	background-color: hsla(var(--indigo-200), var(--bg-opacity));
}

.bg-indigo-300 {
	background-color: hsla(var(--indigo-300), var(--bg-opacity));
}

.bg-indigo-400 {
	background-color: hsla(var(--indigo-400), var(--bg-opacity));
}

.bg-indigo-500 {
	background-color: hsla(var(--indigo-500), var(--bg-opacity));
}

.bg-indigo-600 {
	background-color: hsla(var(--indigo-600), var(--bg-opacity));
}

.bg-indigo-700 {
	background-color: hsla(var(--indigo-700), var(--bg-opacity));
}

.bg-indigo-800 {
	background-color: hsla(var(--indigo-800), var(--bg-opacity));
}

.bg-indigo-900 {
	background-color: hsla(var(--indigo-900), var(--bg-opacity));
}

.bg-violet-50 {
	background-color: hsla(var(--violet-50), var(--bg-opacity));
}

.bg-violet-100 {
	background-color: hsla(var(--violet-100), var(--bg-opacity));
}

.bg-violet-200 {
	background-color: hsla(var(--violet-200), var(--bg-opacity));
}

.bg-violet-300 {
	background-color: hsla(var(--violet-300), var(--bg-opacity));
}

.bg-violet-400 {
	background-color: hsla(var(--violet-400), var(--bg-opacity));
}

.bg-violet-500 {
	background-color: hsla(var(--violet-500), var(--bg-opacity));
}

.bg-violet-600 {
	background-color: hsla(var(--violet-600), var(--bg-opacity));
}

.bg-violet-700 {
	background-color: hsla(var(--violet-700), var(--bg-opacity));
}

.bg-violet-800 {
	background-color: hsla(var(--violet-800), var(--bg-opacity));
}

.bg-violet-900 {
	background-color: hsla(var(--violet-900), var(--bg-opacity));
}

.bg-pink-50 {
	background-color: hsla(var(--pink-50), var(--bg-opacity));
}

.bg-pink-100 {
	background-color: hsla(var(--pink-100), var(--bg-opacity));
}

.bg-pink-200 {
	background-color: hsla(var(--pink-200), var(--bg-opacity));
}

.bg-pink-300 {
	background-color: hsla(var(--pink-300), var(--bg-opacity));
}

.bg-pink-400 {
	background-color: hsla(var(--pink-400), var(--bg-opacity));
}

.bg-pink-500 {
	background-color: hsla(var(--pink-500), var(--bg-opacity));
}

.bg-pink-600 {
	background-color: hsla(var(--pink-600), var(--bg-opacity));
}

.bg-pink-700 {
	background-color: hsla(var(--pink-700), var(--bg-opacity));
}

.bg-pink-800 {
	background-color: hsla(var(--pink-800), var(--bg-opacity));
}

.bg-pink-900 {
	background-color: hsla(var(--pink-900), var(--bg-opacity));
}
`.trim())
})
