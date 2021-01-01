/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "sass:list";

@use "src/sass/helpers/getters" as *;

.clsx {
	nspace-start: list.nth(nspaces(), 1);
	nspace-end: list.nth(nspaces(), -1);
	spaces-start: list.nth(spaces(), 1);
	spaces-end: list.nth(spaces(), -1);
	sizes-start: list.nth(sizes(), 1);
	sizes-end: list.nth(sizes(), -1);
	border-widths-start: list.nth(border-widths(), 1);
	border-widths-end: list.nth(border-widths(), -1);
}
`)
	// prettier-ignore
	expect(css).toBe(`
.clsx {
	nspace-start: -1;
	nspace-end: -128;
	spaces-start: 0;
	spaces-end: 128;
	sizes-start: 0;
	sizes-end: 640;
	border-widths-start: 0;
	border-widths-end: 8;
}
`.trim())
})
