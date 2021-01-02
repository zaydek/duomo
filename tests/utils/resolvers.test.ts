/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

.m-4 {
	margin: resolve(4, none);
}
.m-4-rem {
	margin: resolve(4, rem);
}
.m-4-em {
	margin: resolve(4, em);
}
.m-4-px {
	margin: resolve(4, px);
}
`)
	// prettier-ignore
	expect(css).toBe(`
.m-4 {
	margin: 4;
}

.m-4-rem {
	margin: ${4 / 16}rem;
}

.m-4-em {
	margin: ${4 / 16}em;
}

.m-4-px {
	margin: 4px;
}
`.trim())
})
