/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in shadow-vars() {
	.#{$mk} {
		box-shadow: $mv;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.shadow-inner {
	box-shadow: var(--shadow-inner);
}

.shadow-px {
	box-shadow: var(--shadow-px);
}

.shadow-xs {
	box-shadow: var(--shadow-xs);
}

.shadow-sm {
	box-shadow: var(--shadow-sm);
}

.shadow-md {
	box-shadow: var(--shadow-md);
}

.shadow-lg {
	box-shadow: var(--shadow-lg);
}

.shadow-xl {
	box-shadow: var(--shadow-xl);
}

.shadow-2xl {
	box-shadow: var(--shadow-2xl);
}
`.trim())
})
