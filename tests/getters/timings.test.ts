/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "src/sass/getters" as *;

.clsx {
	@each $each in timing-vars() {
		transition-timing-function: $each;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.clsx {
	transition-timing-function: var(--linear);
	transition-timing-function: var(--ease-in);
	transition-timing-function: var(--ease-out);
	transition-timing-function: var(--ease-in-out);
}
`.trim())
})
