/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("bar: negative case", () => {
	const result = sass(`
@use "sass:math";

@use "src/duomo/helpers/limit" as *;

@each $rv in limit((0, -1, -2, -4), -2, null) {
	.-w-#{math.abs($rv)} {
		width: $rv + px;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.-w-2 {
	width: -2px;
}

.-w-4 {
	width: -4px;
}
`.trim())
})

test("bar: positive case", () => {
	const result = sass(`
@use "sass:math";

@use "src/duomo/helpers/limit" as *;

@each $rv in limit((0, 1, 2, 4), 2, null) {
	.w-#{math.abs($rv)} {
		width: $rv + px;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.w-2 {
	width: 2px;
}

.w-4 {
	width: 4px;
}
`.trim())
})

test("cap: negative case", () => {
	const result = sass(`
@use "sass:math";

@use "src/duomo/helpers/limit" as *;

@each $rv in limit((0, -1, -2, -4), null, -2) {
	.-w-#{math.abs($rv)} {
		width: $rv + px;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.-w-0 {
	width: 0px;
}

.-w-1 {
	width: -1px;
}

.-w-2 {
	width: -2px;
}
`.trim())
})

test("cap: positive case", () => {
	const result = sass(`
@use "src/duomo/helpers/limit" as *;

@each $rv in limit((0, 1, 2, 4), null, 2) {
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
