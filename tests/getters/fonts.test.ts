/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "src/sass/getters" as *;

.clsx {
	@each $each in font-vars() {
		font-family: $each;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.clsx {
	font-family: var(--sans);
	font-family: var(--serif);
	font-family: var(--mono);
}
`.trim())
})
