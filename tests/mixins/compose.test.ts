/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const css = sass(`
@use "index" as * with (
	$headless: true,
);

$variants: (core, hover);

@at-root {
	@include compose($variants) using ($v) {
		.bg-red-400 {
			@include variants($v) {
				background-color: color(red-400);
			}
		}
		.bg-red-500 {
			@include variants($v) {
				background-color: color(red-500);
			}
		}
		.bg-red-600 {
			@include variants($v) {
				background-color: color(red-600);
			}
		}
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.bg-red-400 {
	background-color: hsl(0deg, 91%, 71%);
}

.bg-red-500 {
	background-color: hsl(0deg, 84%, 60%);
}

.bg-red-600 {
	background-color: hsl(0deg, 72%, 51%);
}

.hover\\:bg-red-400:hover {
	background-color: hsl(0deg, 91%, 71%);
}

.hover\\:bg-red-500:hover {
	background-color: hsl(0deg, 84%, 60%);
}

.hover\\:bg-red-600:hover {
	background-color: hsl(0deg, 72%, 51%);
}
`.trim(),
	)
})
