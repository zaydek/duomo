/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/generators" as *;

$font-family-map: (
	sans: sans,
	mono: monosapce,
);

@at-root {
	@include generate-from-map(
		$shorthand: "font",
		$props: (font-family),
		$map: $font-family-map,
		$resolver: none,
	)
}
`)
	// prettier-ignore
	expect(result).toBe(`
.font-sans {
	font-family: sans;
}

.font-mono {
	font-family: monosapce;
}
`.trim())
})
