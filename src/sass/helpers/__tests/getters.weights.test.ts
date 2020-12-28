/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;

.one {
	font-weight: weight-var(thin);
	font-weight: weight-var(extralight);
	font-weight: weight-var(light);
	font-weight: weight-var(bold-none);
	font-weight: weight-var(medium);
	font-weight: weight-var(semibold);
	font-weight: weight-var(bold);
	font-weight: weight-var(extrabold);
	font-weight: weight-var(black);
}

.many {
	@each $each in weight-vars() {
		font-weight: $each;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.one {
	font-weight: var(--thin);
	font-weight: var(--extralight);
	font-weight: var(--light);
	font-weight: var(--bold-none);
	font-weight: var(--medium);
	font-weight: var(--semibold);
	font-weight: var(--bold);
	font-weight: var(--extrabold);
	font-weight: var(--black);
}

.many {
	font-weight: var(--thin);
	font-weight: var(--extralight);
	font-weight: var(--light);
	font-weight: var(--bold-none);
	font-weight: var(--medium);
	font-weight: var(--semibold);
	font-weight: var(--bold);
	font-weight: var(--extrabold);
	font-weight: var(--black);
}
`.trim())
})
