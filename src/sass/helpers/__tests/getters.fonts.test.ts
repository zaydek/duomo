/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.clsx {
	@each $each in font-vars() {
		font-family: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.clsx {
	font-family: var(--sans);
	font-family: var(--serif);
	font-family: var(--mono);
}
`.trim())
})
