/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("theme: `theme-aware-selector` works", () => {
	const result = sass(`
@use "src/duomo/theme" as *;

#{$theme-aware-selector} {
	/**/
}
`)
	// prettier-ignore
	expect(result).toBe(`
body:not([data-theme-effect=true]) {
	/**/
}
`.trim())
})

test("theme: works without a transition", () => {
	const result = sass(`
@use "src/duomo/configuration";
@use "src/duomo/theme" as *;

body {
	@include theme((
		--bg-body: (
			property: background-color,
			light: configuration.$white,
			dark: configuration.$black,
		),
	));
}
`)
	// prettier-ignore
	expect(result).toBe(`
body {
	--bg-body: #fff;
}

body[data-theme=dark] {
	--bg-body: #000;
}

.bg-body {
	background-color: var(--bg-body);
}

.on\\:bg-body:hover,
.on\\:bg-body:focus,
.group:hover .group-on\\:bg-body,
.group:focus .group-on\\:bg-body {
	background-color: var(--bg-body);
}

.down\\:bg-body:active,
.group:active .group-down\\:bg-body {
	background-color: var(--bg-body);
}
`.trim())
})

test("theme: works with a transition", () => {
	const result = sass(`
@use "src/duomo/configuration";
@use "src/duomo/theme" as *;

body {
	@include theme(
		$theme-map: (
			--bg-body: (
				property: background-color,
				light: configuration.$white,
				dark: configuration.$black,
			),
		),
		$duration: 300ms,
		$timing-function: linear,
	);
}
`)
	// prettier-ignore
	expect(result).toBe(`
body {
	--bg-body: #fff;
	--theme-transition:
		background-color 300ms linear,
		border-color 300ms linear,
		box-shadow 300ms linear,
		color 300ms linear,
		fill 300ms linear,
		opacity 300ms linear,
		stroke 300ms linear,
		transform 300ms linear;
}

body[data-theme=dark] {
	--bg-body: #000;
}

.bg-body {
	background-color: var(--bg-body);
	transition: var(--theme-transition);
}

.on\\:bg-body:hover,
.on\\:bg-body:focus,
.group:hover .group-on\\:bg-body,
.group:focus .group-on\\:bg-body {
	background-color: var(--bg-body);
}

.down\\:bg-body:active,
.group:active .group-down\\:bg-body {
	background-color: var(--bg-body);
}
`.trim())
})
