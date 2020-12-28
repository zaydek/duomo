/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("getters: shadow-var", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.shadows {
	box-shadow: shadow-var(none);
	box-shadow: shadow-var(inner);
	box-shadow: shadow-var(px);
	box-shadow: shadow-var(xs);
	box-shadow: shadow-var(sm);
	box-shadow: shadow-var(md);
	box-shadow: shadow-var(lg);
	box-shadow: shadow-var(xl);
	box-shadow: shadow-var(2xl);
}
`)
	// prettier-ignore
	expect(result).toBe(`
.shadows {
	box-shadow: var(--shadow-none);
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

test("getters: shadow-vars", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.shadows {
	@each $each in shadow-vars() {
		box-shadow: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.shadows {
	box-shadow: var(--shadow-none);
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
