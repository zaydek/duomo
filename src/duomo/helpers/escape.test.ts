/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("escape: does not escape numbers", () => {
	const result = sass(`
@use "sass:math";

@use "src/duomo/helpers/escape" as *;

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

test("escape: escapes `$separator`", () => {
	const result = sass(`
@use "src/duomo/helpers/escape" as *;

$separator: ":";
.sm#{escape($separator)}px-24 {
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

test("escape-media-key: does not escape `xl` but escapes `2xl`", () => {
	const result = sass(`
@use "src/duomo/helpers/escape" as *;

.#{escape-media-key("xl")} {
	/**/
}
.#{escape-media-key("2xl")} {
	/**/
}
`)
	// prettier-ignore
	expect(result).toBe(`
.xl {
	/**/
}

.\\2 xl {
	/**/
}
`.trim())
})
