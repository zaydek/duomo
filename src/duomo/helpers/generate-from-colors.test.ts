/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/generate-from-colors" as *;

$color-map: (
	transparent: transparent,
	current: currentColor,
	red: #f00,
	green: #0f0,
	blue: #00f,
);

@at-root {
	@include generate-from-colors((
		variant: none,
		shorthand: bg,
		property: (background-color),
		map: $color-map,
		opacity-range: (0, 0.5, 1),
	));
}
`)
	// prettier-ignore
	expect(result).toBe(`
.bg-transparent {
	--bg-opacity: 1;
	background-color: transparent;
}

.bg-current {
	--bg-opacity: 1;
	background-color: currentColor;
}

.bg-red {
	--bg-opacity: 1;
	background-color: rgba(255, 0, 0, var(--bg-opacity));
}

.bg-green {
	--bg-opacity: 1;
	background-color: rgba(0, 255, 0, var(--bg-opacity));
}

.bg-blue {
	--bg-opacity: 1;
	background-color: rgba(0, 0, 255, var(--bg-opacity));
}

.bg-opacity-0 {
	--bg-opacity: 0;
}

.bg-opacity-50 {
	--bg-opacity: 0.5;
}

.bg-opacity-100 {
	--bg-opacity: 1;
}
`.trim())
})
