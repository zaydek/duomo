/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/safe" as *;

@mixin fn($v) {
	.#{safe-negative-sign($v)}m-#{safe-abs($v)} {
		/**/
	}
}

@at-root {
	@include fn(-4);
	@include fn(0);
	@include fn(4);
}
`)
	// prettier-ignore
	expect(result).toBe(`
.-m-4 {
	/**/
}

.m-0 {
	/**/
}

.m-4 {
	/**/
}
`.trim())
})
