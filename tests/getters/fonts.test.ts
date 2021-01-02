/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in font-vars() {
	.#{$mk} {
		font-family: $mv;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.sans {
	font-family: var(--sans);
}

.serif {
	font-family: var(--serif);
}

.mono {
	font-family: var(--mono);
}
`.trim())
})
