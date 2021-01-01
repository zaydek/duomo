/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("take: list, erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $rv in take((0, 1, 2, 4), "Hello, world!") {
	.w-#{$rv} {
		width: $rv + px;
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
`.trim())
})

test("take: list, non-erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $rv in take((0, 1, 2, 4), 4) {
	.w-#{$rv} {
		width: $rv + px;
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
`.trim())
})

test("take: map, erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in take((a: 0, b: 1, c: 2, d: 4), "Hello, world!") {
	.#{$mk}-#{$mv} {
		#{$mk}: $mv + px;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.a-0 {
	a: 0px;
}

.b-1 {
	b: 1px;
}

.c-2 {
	c: 2px;
}

.d-4 {
	d: 4px;
}
`.trim())
})

test("take: map, non-erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in take((a: 0, b: 1, c: 2, d: 4), d) {
	.#{$mk}-#{$mv} {
		#{$mk}: $mv + px;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.a-0 {
	a: 0px;
}

.b-1 {
	b: 1px;
}

.c-2 {
	c: 2px;
}
`.trim())
})
