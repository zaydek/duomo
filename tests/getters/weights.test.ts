/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in weight-vars() {
	// NOTE: Use \`"" + $mk\` because of \`black\`.
	.#{"" + $mk} {
		font-weight: $mv;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.thin {
	font-weight: var(--thin);
}

.extralight {
	font-weight: var(--extralight);
}

.light {
	font-weight: var(--light);
}

.normal {
	font-weight: var(--normal);
}

.medium {
	font-weight: var(--medium);
}

.semibold {
	font-weight: var(--semibold);
}

.bold {
	font-weight: var(--bold);
}

.extrabold {
	font-weight: var(--extrabold);
}

.black {
	font-weight: var(--black);
}
`.trim())
})
