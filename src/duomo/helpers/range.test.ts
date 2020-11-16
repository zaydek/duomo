/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/range" as *;

@each $v in range(0, 4, 2) {
	.m-#{$v} {
		margin: #{$v + px};
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.m-0 {
	margin: 0px;
}

.m-2 {
	margin: 2px;
}

.m-4 {
	margin: 4px;
}
`.trim())
})
