/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("color-vars($alpha: null, (subset: true))", () => {
	const css = sass(`
@use "src/sass/helpers/getters" as *;

.clsx {
	@each $each in color-vars(null, (subset: true)) {
		background-color: $each;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.clsx {
	background-color: hsl(var(--transparent));
	background-color: hsl(var(--current));
	background-color: hsl(var(--black));
	background-color: hsl(var(--white));
	background-color: hsl(var(--cool-gray-50));
	background-color: hsl(var(--cool-gray-100));
	background-color: hsl(var(--cool-gray-200));
	background-color: hsl(var(--cool-gray-300));
	background-color: hsl(var(--cool-gray-400));
	background-color: hsl(var(--cool-gray-500));
	background-color: hsl(var(--cool-gray-600));
	background-color: hsl(var(--cool-gray-700));
	background-color: hsl(var(--cool-gray-800));
	background-color: hsl(var(--cool-gray-900));
	background-color: hsl(var(--red-50));
	background-color: hsl(var(--red-100));
	background-color: hsl(var(--red-200));
	background-color: hsl(var(--red-300));
	background-color: hsl(var(--red-400));
	background-color: hsl(var(--red-500));
	background-color: hsl(var(--red-600));
	background-color: hsl(var(--red-700));
	background-color: hsl(var(--red-800));
	background-color: hsl(var(--red-900));
	background-color: hsl(var(--amber-50));
	background-color: hsl(var(--amber-100));
	background-color: hsl(var(--amber-200));
	background-color: hsl(var(--amber-300));
	background-color: hsl(var(--amber-400));
	background-color: hsl(var(--amber-500));
	background-color: hsl(var(--amber-600));
	background-color: hsl(var(--amber-700));
	background-color: hsl(var(--amber-800));
	background-color: hsl(var(--amber-900));
	background-color: hsl(var(--emerald-50));
	background-color: hsl(var(--emerald-100));
	background-color: hsl(var(--emerald-200));
	background-color: hsl(var(--emerald-300));
	background-color: hsl(var(--emerald-400));
	background-color: hsl(var(--emerald-500));
	background-color: hsl(var(--emerald-600));
	background-color: hsl(var(--emerald-700));
	background-color: hsl(var(--emerald-800));
	background-color: hsl(var(--emerald-900));
	background-color: hsl(var(--blue-50));
	background-color: hsl(var(--blue-100));
	background-color: hsl(var(--blue-200));
	background-color: hsl(var(--blue-300));
	background-color: hsl(var(--blue-400));
	background-color: hsl(var(--blue-500));
	background-color: hsl(var(--blue-600));
	background-color: hsl(var(--blue-700));
	background-color: hsl(var(--blue-800));
	background-color: hsl(var(--blue-900));
	background-color: hsl(var(--indigo-50));
	background-color: hsl(var(--indigo-100));
	background-color: hsl(var(--indigo-200));
	background-color: hsl(var(--indigo-300));
	background-color: hsl(var(--indigo-400));
	background-color: hsl(var(--indigo-500));
	background-color: hsl(var(--indigo-600));
	background-color: hsl(var(--indigo-700));
	background-color: hsl(var(--indigo-800));
	background-color: hsl(var(--indigo-900));
	background-color: hsl(var(--violet-50));
	background-color: hsl(var(--violet-100));
	background-color: hsl(var(--violet-200));
	background-color: hsl(var(--violet-300));
	background-color: hsl(var(--violet-400));
	background-color: hsl(var(--violet-500));
	background-color: hsl(var(--violet-600));
	background-color: hsl(var(--violet-700));
	background-color: hsl(var(--violet-800));
	background-color: hsl(var(--violet-900));
	background-color: hsl(var(--pink-50));
	background-color: hsl(var(--pink-100));
	background-color: hsl(var(--pink-200));
	background-color: hsl(var(--pink-300));
	background-color: hsl(var(--pink-400));
	background-color: hsl(var(--pink-500));
	background-color: hsl(var(--pink-600));
	background-color: hsl(var(--pink-700));
	background-color: hsl(var(--pink-800));
	background-color: hsl(var(--pink-900));
}
`.trim())
})

test("color-vars($alpha: var(--bg-opacity), (subset: true))", () => {
	const css = sass(`
@use "src/sass/helpers/getters" as *;

.clsx {
	@each $each in color-vars(var(--bg-opacity), (subset: true)) {
		background-color: $each;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.clsx {
	background-color: hsla(var(--transparent), var(--bg-opacity));
	background-color: hsla(var(--current), var(--bg-opacity));
	background-color: hsla(var(--black), var(--bg-opacity));
	background-color: hsla(var(--white), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-50), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-100), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-200), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-300), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-400), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-500), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-600), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-700), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-800), var(--bg-opacity));
	background-color: hsla(var(--cool-gray-900), var(--bg-opacity));
	background-color: hsla(var(--red-50), var(--bg-opacity));
	background-color: hsla(var(--red-100), var(--bg-opacity));
	background-color: hsla(var(--red-200), var(--bg-opacity));
	background-color: hsla(var(--red-300), var(--bg-opacity));
	background-color: hsla(var(--red-400), var(--bg-opacity));
	background-color: hsla(var(--red-500), var(--bg-opacity));
	background-color: hsla(var(--red-600), var(--bg-opacity));
	background-color: hsla(var(--red-700), var(--bg-opacity));
	background-color: hsla(var(--red-800), var(--bg-opacity));
	background-color: hsla(var(--red-900), var(--bg-opacity));
	background-color: hsla(var(--amber-50), var(--bg-opacity));
	background-color: hsla(var(--amber-100), var(--bg-opacity));
	background-color: hsla(var(--amber-200), var(--bg-opacity));
	background-color: hsla(var(--amber-300), var(--bg-opacity));
	background-color: hsla(var(--amber-400), var(--bg-opacity));
	background-color: hsla(var(--amber-500), var(--bg-opacity));
	background-color: hsla(var(--amber-600), var(--bg-opacity));
	background-color: hsla(var(--amber-700), var(--bg-opacity));
	background-color: hsla(var(--amber-800), var(--bg-opacity));
	background-color: hsla(var(--amber-900), var(--bg-opacity));
	background-color: hsla(var(--emerald-50), var(--bg-opacity));
	background-color: hsla(var(--emerald-100), var(--bg-opacity));
	background-color: hsla(var(--emerald-200), var(--bg-opacity));
	background-color: hsla(var(--emerald-300), var(--bg-opacity));
	background-color: hsla(var(--emerald-400), var(--bg-opacity));
	background-color: hsla(var(--emerald-500), var(--bg-opacity));
	background-color: hsla(var(--emerald-600), var(--bg-opacity));
	background-color: hsla(var(--emerald-700), var(--bg-opacity));
	background-color: hsla(var(--emerald-800), var(--bg-opacity));
	background-color: hsla(var(--emerald-900), var(--bg-opacity));
	background-color: hsla(var(--blue-50), var(--bg-opacity));
	background-color: hsla(var(--blue-100), var(--bg-opacity));
	background-color: hsla(var(--blue-200), var(--bg-opacity));
	background-color: hsla(var(--blue-300), var(--bg-opacity));
	background-color: hsla(var(--blue-400), var(--bg-opacity));
	background-color: hsla(var(--blue-500), var(--bg-opacity));
	background-color: hsla(var(--blue-600), var(--bg-opacity));
	background-color: hsla(var(--blue-700), var(--bg-opacity));
	background-color: hsla(var(--blue-800), var(--bg-opacity));
	background-color: hsla(var(--blue-900), var(--bg-opacity));
	background-color: hsla(var(--indigo-50), var(--bg-opacity));
	background-color: hsla(var(--indigo-100), var(--bg-opacity));
	background-color: hsla(var(--indigo-200), var(--bg-opacity));
	background-color: hsla(var(--indigo-300), var(--bg-opacity));
	background-color: hsla(var(--indigo-400), var(--bg-opacity));
	background-color: hsla(var(--indigo-500), var(--bg-opacity));
	background-color: hsla(var(--indigo-600), var(--bg-opacity));
	background-color: hsla(var(--indigo-700), var(--bg-opacity));
	background-color: hsla(var(--indigo-800), var(--bg-opacity));
	background-color: hsla(var(--indigo-900), var(--bg-opacity));
	background-color: hsla(var(--violet-50), var(--bg-opacity));
	background-color: hsla(var(--violet-100), var(--bg-opacity));
	background-color: hsla(var(--violet-200), var(--bg-opacity));
	background-color: hsla(var(--violet-300), var(--bg-opacity));
	background-color: hsla(var(--violet-400), var(--bg-opacity));
	background-color: hsla(var(--violet-500), var(--bg-opacity));
	background-color: hsla(var(--violet-600), var(--bg-opacity));
	background-color: hsla(var(--violet-700), var(--bg-opacity));
	background-color: hsla(var(--violet-800), var(--bg-opacity));
	background-color: hsla(var(--violet-900), var(--bg-opacity));
	background-color: hsla(var(--pink-50), var(--bg-opacity));
	background-color: hsla(var(--pink-100), var(--bg-opacity));
	background-color: hsla(var(--pink-200), var(--bg-opacity));
	background-color: hsla(var(--pink-300), var(--bg-opacity));
	background-color: hsla(var(--pink-400), var(--bg-opacity));
	background-color: hsla(var(--pink-500), var(--bg-opacity));
	background-color: hsla(var(--pink-600), var(--bg-opacity));
	background-color: hsla(var(--pink-700), var(--bg-opacity));
	background-color: hsla(var(--pink-800), var(--bg-opacity));
	background-color: hsla(var(--pink-900), var(--bg-opacity));
}
`.trim())
})
