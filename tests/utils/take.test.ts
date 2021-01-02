/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("take: list, erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $rv in take((0, 1, 2, 4), "Hello, world!") {
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
.w-4 {
	width: 4px;
}
`.trimStart())
})

test("take: list, non-erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $rv in take((0, 1, 2, 4), 4) {
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
`.trimStart())
})

test("take: map, erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in take((a: 0, b: 1, c: 2, d: 4), "Hello, world!") {
	.#{$mk}-#{$mv} {
		#{$mk}: px($mv);
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.a-0 {
	a: 0;
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
`.trimStart())
})

test("take: map, non-erroneous case", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

@each $mk, $mv in take((a: 0, b: 1, c: 2, d: 4), d) {
	.#{$mk}-#{$mv} {
		#{$mk}: px($mv);
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.a-0 {
	a: 0;
}
.b-1 {
	b: 1px;
}
.c-2 {
	c: 2px;
}
`.trimStart())
})
