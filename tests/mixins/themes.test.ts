/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

$light: (
	app-color: color(black),
	app-bg: color(white),
);

$dark: (
	app-color: color(white),
	app-bg: color(black),
);

@at-root {
	@include themes((
		light: $light,
		dark: $dark,
		duration: 700ms,
		timing: timing-var(ease-out),
	));
}
`)
	// prettier-ignore
	expect(css).toBe(`
:root {
	--app-color: hsl(0deg, 0%, 0%);
	--app-bg: hsl(0deg, 0%, 100%);
	--default-theme-transition-duration: 700ms;
	--default-theme-transition-timing: var(--ease-out);
}

[data-theme=dark] {
	--app-color: hsl(0deg, 0%, 100%);
	--app-bg: hsl(0deg, 0%, 0%);
}

[data-theme-id=app] {
	color: var(--app-color);
	background-color: var(--app-bg);
	transition: var(--theme-transition);
}
`.trim())
})
