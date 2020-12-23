/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/generate-from-colors" as *;

$color-map: (
	transparent: transparent,
	current: currentColor,
	red: #f00,
	green: #0f0,
	blue: #00f,
);

@at-root {
	@include generate-from-colors((
		variant: core,
		shorthand: bg,
		property: (background-color),
		map: $color-map,
		percent-range: (0, 0.5, 1),
	));
}
`)
	// prettier-ignore
	expect(result).toBe(`
.bg-transparent {
	background-color: transparent;
}

.bg-current {
	background-color: currentColor;
}

.bg-red {
	--bg-opacity: 1;
	background-color: hsla(var(--red), var(--bg-opacity));
}

.bg-green {
	--bg-opacity: 1;
	background-color: hsla(var(--green), var(--bg-opacity));
}

.bg-blue {
	--bg-opacity: 1;
	background-color: hsla(var(--blue), var(--bg-opacity));
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
