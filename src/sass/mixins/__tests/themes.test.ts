/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "src/sass/helpers" as *;
@use "src/sass/mixins/themes" as *;

$light: (
	ui-app-color: color(black),
	ui-app-bg: color(white),
);

$dark: (
	ui-app-color: color(white),
	ui-app-bg: color(black),
);

@include themes($light, $dark);
`)
	// prettier-ignore
	expect(css).toBe(`
:root {
	--ui-app-color: hsl(0deg, 0%, 0%);
	--ui-app-bg: hsl(0deg, 0%, 100%);
}

[data-theme=dark] {
	--ui-app-color: hsl(0deg, 0%, 100%);
	--ui-app-bg: hsl(0deg, 0%, 0%);
}

.ui-app {
	color: var(--ui-app-color);
	background-color: var(--ui-app-bg);
	transition: var(--theme-transition);
}
`.trim())
})
