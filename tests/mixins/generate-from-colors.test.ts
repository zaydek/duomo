/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

$color-map: (
	transparent: transparent,
	current: currentColor,
	black: #000,
	white: #fff,
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
	expect(css).toBe(`
.bg-transparent {
	background-color: transparent;
}

.bg-current {
	background-color: currentColor;
}

.bg-black {
	--bg-opacity: 1;
	background-color: hsla(0deg, 0%, 0%, var(--bg-opacity));
}

.bg-white {
	--bg-opacity: 1;
	background-color: hsla(0deg, 0%, 100%, var(--bg-opacity));
}

.bg-red {
	--bg-opacity: 1;
	background-color: hsla(0deg, 100%, 50%, var(--bg-opacity));
}

.bg-green {
	--bg-opacity: 1;
	background-color: hsla(120deg, 100%, 50%, var(--bg-opacity));
}

.bg-blue {
	--bg-opacity: 1;
	background-color: hsla(240deg, 100%, 50%, var(--bg-opacity));
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
