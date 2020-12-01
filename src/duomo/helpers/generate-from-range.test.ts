/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/generate-from-range" as *;

@at-root {
	@include generate-from-range((
		variant: root,
		shorthand: square,
		property: (width, height),
		range: (0, 2, 4, 8, 16),
		resolver: rem,
	));
}
`)
	// prettier-ignore
	expect(result).toBe(`
.square-0 {
	width: 0;
	height: 0;
}

.square-2 {
	width: ${2 / 16}rem;
	height: ${2 / 16}rem;
}

.square-4 {
	width: ${4 / 16}rem;
	height: ${4 / 16}rem;
}

.square-8 {
	width: ${8 / 16}rem;
	height: ${8 / 16}rem;
}

.square-16 {
	width: ${16 / 16}rem;
	height: ${16 / 16}rem;
}
`.trim())
})
