/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/generate-vars" as *;

@at-root {
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
}
`)
	// prettier-ignore
	expect(result).toBe(`
:root {
	--a: x;
	--b: y;
	--c: z;
	--d: x;
	--f: y;
	--f: z;
}
`.trim())
})
