/**
 * @jest-environment node
 */
import sass from "sass"

function sassify(data: string) {
	const result = sass.renderSync({
		indentType: "tab",
		indentWidth: 1,
		data,
	})
	return result.css.toString()
}

test("does not escape numbers", () => {
	const result = sassify(`
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

test("does escape $separator", () => {
	const result = sassify(`
@use "src/duomo/helpers/escape" as *;

$separator: ":";
.sm#{escape($separator)}px-24 {
	/* ... */
}
`)
	// prettier-ignore
	expect(result).toBe(`
.sm\\:px-24 {
	/* ... */
}
`.trim())
})
