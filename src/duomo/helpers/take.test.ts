/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("take: erroneous case", () => {
	const result = sass(`
@use "src/duomo/helpers/take" as *;

@each $rv in take((0, 1, 2, 4), "Hello, world!") {
	.w-#{$rv} {
		width: $rv + px;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
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
`.trim())
})

test("take: non-erroneous case", () => {
	const result = sass(`
@use "src/duomo/helpers/take" as *;

@each $rv in take((0, 1, 2, 4), 4) {
	.w-#{$rv} {
		width: $rv + px;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.w-0 {
	width: 0px;
}

.w-1 {
	width: 1px;
}

.w-2 {
	width: 2px;
}
`.trim())
})
