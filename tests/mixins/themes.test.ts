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
	hoverable-bg: color(black, 0.05),
);

$dark: (
	app-color: color(white),
	app-bg: color(black),
	hoverable-bg: color(white, 0.05),
);

@at-root {
	@include themes((light: $light, dark: $dark), 700ms, timing(ease-out));
}

.x-app {
	@include theme-transition {
		color: var(--app-color);
		background-color: var(--app-bg);
	}
}

.x-hoverable {
	@include theme-variants((hover), 250ms, timing(ease-out)) {
		background-color: var(--hoverable-bg);
	}
}
.x-hoverable:focus {
	outline: none;
}
`)
	// prettier-ignore
	expect(css).toBe(`
:root {
	--app-color: hsl(0deg, 0%, 0%);
	--app-bg: hsl(0deg, 0%, 100%);
	--hoverable-bg: hsla(0deg, 0%, 0%, 0.05);
	--default-theme-transition-duration: 700ms;
	--default-theme-transition-timing: cubic-bezier(0, 0, 0.2, 1);
}

:root[data-theme=dark] {
	--app-color: hsl(0deg, 0%, 100%);
	--app-bg: hsl(0deg, 0%, 0%);
	--hoverable-bg: hsla(0deg, 0%, 100%, 0.05);
}

:root {
	transition: var(--theme-transition);
}

[class*=border-] {
	transition: var(--theme-transition);
}

.x-app {
	color: var(--app-color);
	background-color: var(--app-bg);
	transition: var(--theme-transition);
}

.x-hoverable {
	transition: var(--theme-transition);
}

:root:not([data-theme-effect]) .x-hoverable {
	transition: 250ms background-color cubic-bezier(0, 0, 0.2, 1);
}

.x-hoverable:hover {
	background-color: var(--hoverable-bg);
}

.x-hoverable:focus {
	outline: none;
}
`.trim())
})
