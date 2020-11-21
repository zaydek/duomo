/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("generate-meta-range", () => {
	const result = sass(`
@use "sass:math";

@use "src/duomo/configuration/generate-meta-range" as *;

$range: generate-meta-range(
	(0, 10, 1),
	10,
);

@each $v in $range {
	.w-#{$v} {
		width: $v + px;
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

.w-3 {
	width: 3px;
}

.w-4 {
	width: 4px;
}

.w-5 {
	width: 5px;
}

.w-6 {
	width: 6px;
}

.w-7 {
	width: 7px;
}

.w-8 {
	width: 8px;
}

.w-9 {
	width: 9px;
}

.w-10 {
	width: 10px;
}
`.trim())
})
