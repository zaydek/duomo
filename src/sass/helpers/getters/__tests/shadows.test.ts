/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.clsx {
	@each $each in shadow-vars() {
		box-shadow: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.clsx {
	box-shadow: var(--shadow-inner);
	box-shadow: var(--shadow-px);
	box-shadow: var(--shadow-xs);
	box-shadow: var(--shadow-sm);
	box-shadow: var(--shadow-md);
	box-shadow: var(--shadow-lg);
	box-shadow: var(--shadow-xl);
	box-shadow: var(--shadow-2xl);
}
`.trim())
})
