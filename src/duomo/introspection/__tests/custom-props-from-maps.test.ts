/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/meta/custom-props-from-maps" as *;

@at-root {
	@include custom-props-from-maps(
		(
			shorthand: a,
			map: (
				a: x,
				b: y,
				c: z,
			),
		),
		(
			shorthand: b,
			map: (
				a: x,
				b: y,
				c: z,
			),
		),
		(
			shorthand: c,
			map: (
				a: x,
				b: y,
				c: z,
			),
		),
	);
}
`)
	// prettier-ignore
	expect(result).toBe(`
:root {
	--a-a: x;
	--a-b: y;
	--a-c: z;
	--b-a: x;
	--b-b: y;
	--b-c: z;
	--c-a: x;
	--c-b: y;
	--c-c: z;
}
`.trim())
})
