/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "sass:list";

@use "src/sass/getters" as *;

$start: 1;
$end: -1;

.clsx {
	nspace-start: list.nth(nspaces(), $start);
	nspace-end: list.nth(nspaces(), $end);
	spaces-start: list.nth(spaces(), $start);
	spaces-end: list.nth(spaces(), $end);
	sizes-start: list.nth(sizes(), $start);
	sizes-end: list.nth(sizes(), $end);
	border-widths-start: list.nth(border-widths(), $start);
	border-widths-end: list.nth(border-widths(), $end);
	border-radii-start: list.nth(border-radii(), $start);
	border-radii-end: list.nth(border-radii(), $end);
	percent-range-start: list.nth(percent-range(), $start);
	percent-range-end: list.nth(percent-range(), $end);
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
	border-radii-start: 0;
	border-radii-end: 32;
	percent-range-start: 0;
	percent-range-end: 1;
}
`.trim())
})
