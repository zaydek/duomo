/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

:root {
	@include interpolate-vars((
		a: x,
		b: y,
		c: z,
	));
}
`)
	// prettier-ignore
	expect(css).toBe(`
:root {
	--a: x;
	--b: y;
	--c: z;
}
`.trim())
})
