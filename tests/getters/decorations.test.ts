/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in decoration-vars() {
	.#{$mk} {
		text-decoration: $mv;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.strikethrough {
	text-decoration: var(--strikethrough);
}

.underline {
	text-decoration: var(--underline);
}
`.trim())
})
