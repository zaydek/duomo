/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.one {
	text-decoration: decoration-var(strikethrough);
	text-decoration: decoration-var(underline);
}

.many {
	@each $each in decoration-vars() {
		text-decoration: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.one {
	text-decoration: var(--strikethrough);
	text-decoration: var(--underline);
}

.many {
	text-decoration: var(--strikethrough);
	text-decoration: var(--underline);
}
`.trim())
})
