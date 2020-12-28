/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.clsx {
	@each $each in decoration-vars() {
		text-decoration: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.clsx {
	text-decoration: var(--strikethrough);
	text-decoration: var(--underline);
}
`.trim())
})
