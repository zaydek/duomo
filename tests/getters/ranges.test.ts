/**
 * @jest-environment node
 */
declare function sass(data: string): string
declare function errSass(testStr: string): Function

test("integration", () => {
	const css = sass(`
@use "sass:list";

@use "index" as * with ($headless: true);

$start: 1;
$end: -1;

.class {
	nspace-start: list.nth(nspaces(), $start);
	nspace-end: list.nth(nspaces(), $end);
	spaces-start: list.nth(spaces(), $start);
	spaces-end: list.nth(spaces(), $end);
	sizes-start: list.nth(sizes(), $start);
	sizes-end: list.nth(sizes(), $end);
	font-sizes-start: list.nth(font-sizes(), $start);
	font-sizes-end: list.nth(font-sizes(), $end);
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
.class {
	nspace-start: -1;
	nspace-end: -64;
	spaces-start: 0;
	spaces-end: 64;
	sizes-start: 0;
	sizes-end: 640;
	font-sizes-start: 8;
	font-sizes-end: 64;
	border-widths-start: 0;
	border-widths-end: 8;
	border-radii-start: 0;
	border-radii-end: 32;
	percent-range-start: 0;
	percent-range-end: 1;
}
`.trim())
})

//test decimal-range
test("integration", () => {
	expect(errSass(`decimal-range(0, 0.1)`)).toThrowError("0 0.01 0.02 0.025 0.03 0.04 0.05 0.06 0.07 0.075 0.08 0.09 0.1")
	expect(errSass(`decimal-range(0, 1)`)).toThrowError("0 0.1 0.2 0.25 0.3 0.4 0.5 0.6 0.7 0.75 0.8 0.9 1")
	expect(errSass(`decimal-range(0, 10)`)).toThrowError("0 1 2 2.5 3 4 5 6 7 7.5 8 9 10")
	expect(errSass(`decimal-range(0, 100)`)).toThrowError("0 10 20 25 30 40 50 60 70 75 80 90 100")
	expect(errSass(`decimal-range(1, 1)`)).toThrowError("1 1.1 1.2 1.25 1.3 1.4 1.5 1.6 1.7 1.75 1.8 1.9 2")
})
