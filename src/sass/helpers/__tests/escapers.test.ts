/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("escape: does not escape numbers", () => {
	const result = sass(`
@use "sass:math";

@use "src/sass/helpers/escapers" as *;

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
	expect(result).toBe(`
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
	const result = sass(`
@use "src/sass/helpers/escapers" as *;

$delimiter: ":";
.sm#{escape($delimiter)}px-24 {
	/**/
}
`)
	// prettier-ignore
	expect(result).toBe(`
.sm\\:px-24 {
	/**/
}
`.trim())
})

test("escape-breakpoint-key: does not escape `xl` but escapes `2xl`", () => {
	const result = sass(`
@use "src/sass/helpers/escapers" as *;

.#{escape-breakpoint-key("xl")} {
	/**/
}
.#{escape-breakpoint-key("2xl")} {
	/**/
}
`)
	// prettier-ignore
	expect(result).toBe(`
.xl {
	/**/
}

.\\32 xl {
	/**/
}
`.trim())
})
