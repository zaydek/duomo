/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("cap: negative case", () => {
	const result = sass(`
@use "sass:math";

@use "src/duomo/helpers/cap" as *;

@each $rv in cap((-1, -2, -4, -8, -16, -32), -8) {
	.-w-#{math.abs($rv)} {
		width: $rv + px;
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.-w-1 {
	width: -1px;
}

.-w-2 {
	width: -2px;
}

.-w-4 {
	width: -4px;
}

.-w-8 {
	width: -8px;
}
`.trim())
})

test("cap: positive case", () => {
	const result = sass(`
@use "src/duomo/helpers/cap" as *;

@each $rv in cap((0, 1, 2, 4, 8, 16, 32), 8) {
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

.w-8 {
	width: 8px;
}
`.trim())
})
