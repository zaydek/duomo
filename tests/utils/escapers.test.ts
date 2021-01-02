/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("escape: does not escape numbers", () => {
	const css = sass(`
@use "sass:math";

@use "index" as * with ($headless: true);

.-z-#{escape(math.abs(-10))} {
	z-index: -10;
}
.z-#{escape(0)} {
	z-index: 0;
}
.z-#{escape(10)} {
	z-index: 10;
}
`)
	// prettier-ignore
	expect(css).toBe(`
.-z-10 {
	z-index: -10;
}

.z-0 {
	z-index: 0;
}

.z-10 {
	z-index: 10;
}
`.trim())
})

test("escape: escapes `$delimiter`", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

$delimiter: ":";
.sm#{escape($delimiter)}px-24 {
	/**/
}
`)
	// prettier-ignore
	expect(css).toBe(`
.sm\\:px-24 {
	/**/
}
`.trim())
})

test("escape-breakpoint-key: does not escape `xl` but escapes `2xl`", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

.#{escape-breakpoint-key("xl")} {
	/**/
}
.#{escape-breakpoint-key("2xl")} {
	/**/
}
`)
	// prettier-ignore
	expect(css).toBe(`
.xl {
	/**/
}

.\\32 xl {
	/**/
}
`.trim())
})
