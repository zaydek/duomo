/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.one {
	font-family: font-var(sans);
	font-family: font-var(serif);
	font-family: font-var(mono);
}

.many {
	@each $each in font-vars() {
		font-family: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.one {
	font-family: var(--sans);
	font-family: var(--serif);
	font-family: var(--mono);
}

.many {
	font-family: var(--sans);
	font-family: var(--serif);
	font-family: var(--mono);
}
`.trim())
})
