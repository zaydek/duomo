/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in timing-vars() {
	.#{$mk} {
		transition-timing-function: $mv;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.linear {
	transition-timing-function: var(--linear);
}

.ease-in {
	transition-timing-function: var(--ease-in);
}

.ease-out {
	transition-timing-function: var(--ease-out);
}

.ease-in-out {
	transition-timing-function: var(--ease-in-out);
}
`.trim())
})
