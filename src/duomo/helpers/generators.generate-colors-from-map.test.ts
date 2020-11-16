/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/generators" as *;

$color-map: (
	transparent: transparent,
	currentColor: currentColor,
	red: #f00,
	green: #0f0,
	blue: #00f,
);

@at-root {
	@include generate-colors-from-map(
		$shorthand: "text",
		$prop: color,
		$map: $color-map,
		$opacity-range: (0, 0.5, 1),
	)
}
`)
	// prettier-ignore
	expect(result).toBe(`
.text-transparent {
	--text-opacity: 1;
	color: transparent;
}

.text-currentColor {
	--text-opacity: 1;
	color: currentColor;
}

.text-red {
	--text-opacity: 1;
	color: #f00;
	color: rgba(255, 0, 0, var(--text-opacity));
}

.text-green {
	--text-opacity: 1;
	color: #0f0;
	color: rgba(0, 255, 0, var(--text-opacity));
}

.text-blue {
	--text-opacity: 1;
	color: #00f;
	color: rgba(0, 0, 255, var(--text-opacity));
}

.text-opacity-0 {
	--text-opacity: 0;
}

.text-opacity-50 {
	--text-opacity: 0.5;
}

.text-opacity-100 {
	--text-opacity: 1;
}
`.trim())
})
