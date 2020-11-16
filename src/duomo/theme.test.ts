/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("theme: without transition", () => {
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
