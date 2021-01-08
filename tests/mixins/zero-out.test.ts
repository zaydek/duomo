/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("zero-out: [data-debug]", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

[data-debug] * {
	outline: 2px solid hsla(var(--debug-raw-hsl), 0.5);
	outline-offset: -1px; // Inset
}

[data-debug] .grow:empty {
	outline: revert;

	position: relative;
	&::before {
		@include zero-out(-1px) {
			content: "";
			background-color: hsla(var(--debug-raw-hsl), 0.1);
		}
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
[data-debug] * {
	outline: 2px solid hsla(var(--debug-raw-hsl), 0.5);
	outline-offset: -1px;
}

[data-debug] .grow:empty {
	outline: revert;
	position: relative;
}
[data-debug] .grow:empty::before {
	position: absolute;
	top: -1px;
	right: -1px;
	bottom: -1px;
	left: -1px;
	content: "";
	background-color: hsla(var(--debug-raw-hsl), 0.1);
}
`.trim())
})

test("zero-out: aspect", () => {
	const css = sass(`
@use "index" as * with ($headless: true);

.aspect > * {
	@include zero-out {
		width: 100%;
		height: 100%;
	}
}
`)
	// prettier-ignore
	expect(css).toBe(`
.aspect > * {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
`.trim())
})
