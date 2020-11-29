/**
 * @jest-environment node
 */
declare function sass(data: string): string

// TODO: Upgrade to support `variants`?
test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/generators" as *;

@at-root {
	@include generate-from-range(
		$shorthand: "s",
		$props: (width, height),
		$range: (0, 2, 4, 8, 16),
		$resolver: rem,
	)
}
`)
	// prettier-ignore
	expect(result).toBe(`
.s-0 {
	width: 0;
	height: 0;
}

.s-2 {
	width: ${2 / 16}rem;
	height: ${2 / 16}rem;
}

.s-4 {
	width: ${4 / 16}rem;
	height: ${4 / 16}rem;
}

.s-8 {
	width: ${8 / 16}rem;
	height: ${8 / 16}rem;
}

.s-16 {
	width: ${16 / 16}rem;
	height: ${16 / 16}rem;
}
`.trim())
})
