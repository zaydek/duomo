/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

.clsx {
	@each $each in decoration-vars() {
		text-decoration: $each;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.clsx {
	text-decoration: var(--strikethrough);
	text-decoration: var(--underline);
}
`.trim())
})
