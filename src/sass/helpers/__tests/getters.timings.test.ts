/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.one {
	transition-timing-function: timing-var(linear);
	transition-timing-function: timing-var(ease-in);
	transition-timing-function: timing-var(ease-out);
	transition-timing-function: timing-var(ease-in-out);
}

.many {
	@each $each in timing-vars() {
		transition-timing-function: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.one {
	transition-timing-function: var(--linear);
	transition-timing-function: var(--ease-in);
	transition-timing-function: var(--ease-out);
	transition-timing-function: var(--ease-in-out);
}

.many {
	transition-timing-function: var(--linear);
	transition-timing-function: var(--ease-in);
	transition-timing-function: var(--ease-out);
	transition-timing-function: var(--ease-in-out);
}
`.trim())
})
