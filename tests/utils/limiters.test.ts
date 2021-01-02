/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("bar: negative case", () => {
	const css = sass(`
@use "sass:math";

@use "index" as * with ($headless: true);

@each $rv in bar((0, -1, -2, -4), -2) {
	.-w-#{math.abs($rv)} {
		width: px($rv);
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.-w-2 {
	width: -2px;
}

.-w-4 {
	width: -4px;
}
`.trim())
})

test("bar: positive case", () => {
	const css = sass(`
@use "sass:math";

@use "index" as * with ($headless: true);

@each $rv in bar((0, 1, 2, 4), 2) {
	.w-#{math.abs($rv)} {
		width: px($rv);
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.w-2 {
	width: 2px;
}

.w-4 {
	width: 4px;
}
`.trim())
})

test("cap: negative case", () => {
	const css = sass(`
@use "sass:math";

@use "index" as * with ($headless: true);

@each $rv in cap((0, -1, -2, -4), -2) {
	.-w-#{math.abs($rv)} {
		width: px($rv);
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.-w-0 {
	width: 0;
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
	const css = sass(`
@use "index" as * with ($headless: true);

@each $rv in cap((0, 1, 2, 4), 2) {
	.w-#{$rv} {
		width: px($rv);
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.w-0 {
	width: 0;
}

.w-1 {
	width: 1px;
}

.w-2 {
	width: 2px;
}
`.trim())
})
