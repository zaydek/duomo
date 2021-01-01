/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

:root {
	@include generate-vars(
		(
			a: x,
			b: y,
			c: z,
		),
		(
			d: x,
			e: y,
			f: z,
		),
	);
}
`)
	// prettier-ignore
	expect(css).toBe(`
:root {
	--a: x;
	--b: y;
	--c: z;
	--d: x;
	--e: y;
	--f: z;
}
`.trim())
})
