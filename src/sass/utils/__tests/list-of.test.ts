/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "src/sass/utils/list-of" as *;

@at-root {
	@each $rv in list-of((0, 1, 2, 4), (8, 16, 32, 64)) {
		.w-#{$rv} {
			width: $rv + px;
		}
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.w-0 {
	width: 0px;
}

.w-1 {
	width: 1px;
}

.w-2 {
	width: 2px;
}

.w-4 {
	width: 4px;
}

.w-8 {
	width: 8px;
}

.w-16 {
	width: 16px;
}

.w-32 {
	width: 32px;
}

.w-64 {
	width: 64px;
}
`.trim())
})
