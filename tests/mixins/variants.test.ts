/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

.bg-red-500 {
	@include variants(core, hover, focus, group-hover, group-focus) {
		background-color: color(red-500);
	}
}

@media (min-width: 640px) {
	.#{delimit(sm)} {
		.bg-red-500 {
			@include variants(responsive) {
				background-color: color(red-500);
			}
		}
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.bg-red-500 {
	background-color: hsl(0deg, 84%, 60%);
}

.hover\\:bg-red-500:hover {
	background-color: hsl(0deg, 84%, 60%);
}

.focus\\:bg-red-500:focus {
	background-color: hsl(0deg, 84%, 60%);
}

.group:hover .group-hover\\:bg-red-500 {
	background-color: hsl(0deg, 84%, 60%);
}

.group:focus .group-focus\\:bg-red-500 {
	background-color: hsl(0deg, 84%, 60%);
}

@media (min-width: 640px) {
	.sm\\:bg-red-500 {
		background-color: hsl(0deg, 84%, 60%);
	}
}
`.trim())
})
