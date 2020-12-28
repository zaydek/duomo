/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.clsx {
	@each $each in timing-vars() {
		transition-timing-function: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.clsx {
	transition-timing-function: var(--linear);
	transition-timing-function: var(--ease-in);
	transition-timing-function: var(--ease-out);
	transition-timing-function: var(--ease-in-out);
}
`.trim())
})
