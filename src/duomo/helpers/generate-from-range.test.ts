/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("variants sans responsive", () => {
	const result = sass(`
@use "src/duomo/helpers/generate-from-range" as *;

@at-root {
	@include generate-from-range((
		variant: none,
		shorthand: square,
		property: (width, height),
		range: (0, 2, 4, 8, 16),
		resolver: rem,
	));
	@include generate-from-range((
		variant: hover,
		shorthand: square,
		property: (width, height),
		range: (0, 2, 4, 8, 16),
		resolver: rem,
	));
	@include generate-from-range((
		variant: focus,
		shorthand: square,
		property: (width, height),
		range: (0, 2, 4, 8, 16),
		resolver: rem,
	));
	@include generate-from-range((
		variant: group-hover,
		shorthand: square,
		property: (width, height),
		range: (0, 2, 4, 8, 16),
		resolver: rem,
	));
	@include generate-from-range((
		variant: group-focus,
		shorthand: square,
		property: (width, height),
		range: (0, 2, 4, 8, 16),
		resolver: rem,
	));
}
`)
	// prettier-ignore
	expect(result).toBe(`
.square-0 {
	width: 0;
	height: 0;
}

.square-2 {
	width: ${2 / 16}rem;
	height: ${2 / 16}rem;
}

.square-4 {
	width: ${4 / 16}rem;
	height: ${4 / 16}rem;
}

.square-8 {
	width: ${8 / 16}rem;
	height: ${8 / 16}rem;
}

.square-16 {
	width: ${16 / 16}rem;
	height: ${16 / 16}rem;
}

.hover\\:square-0:hover {
	width: 0;
	height: 0;
}

.hover\\:square-2:hover {
	width: ${2 / 16}rem;
	height: ${2 / 16}rem;
}

.hover\\:square-4:hover {
	width: ${4 / 16}rem;
	height: ${4 / 16}rem;
}

.hover\\:square-8:hover {
	width: ${8 / 16}rem;
	height: ${8 / 16}rem;
}

.hover\\:square-16:hover {
	width: ${16 / 16}rem;
	height: ${16 / 16}rem;
}

.focus\\:square-0:focus {
	width: 0;
	height: 0;
}

.focus\\:square-2:focus {
	width: ${2 / 16}rem;
	height: ${2 / 16}rem;
}

.focus\\:square-4:focus {
	width: ${4 / 16}rem;
	height: ${4 / 16}rem;
}

.focus\\:square-8:focus {
	width: ${8 / 16}rem;
	height: ${8 / 16}rem;
}

.focus\\:square-16:focus {
	width: ${16 / 16}rem;
	height: ${16 / 16}rem;
}

.group-hover:hover .group-hover\\:square-0 {
	width: 0;
	height: 0;
}

.group-hover:hover .group-hover\\:square-2 {
	width: ${2 / 16}rem;
	height: ${2 / 16}rem;
}

.group-hover:hover .group-hover\\:square-4 {
	width: ${4 / 16}rem;
	height: ${4 / 16}rem;
}

.group-hover:hover .group-hover\\:square-8 {
	width: ${8 / 16}rem;
	height: ${8 / 16}rem;
}

.group-hover:hover .group-hover\\:square-16 {
	width: ${16 / 16}rem;
	height: ${16 / 16}rem;
}

.group-focus:focus .group-focus\\:square-0 {
	width: 0;
	height: 0;
}

.group-focus:focus .group-focus\\:square-2 {
	width: ${2 / 16}rem;
	height: ${2 / 16}rem;
}

.group-focus:focus .group-focus\\:square-4 {
	width: ${4 / 16}rem;
	height: ${4 / 16}rem;
}

.group-focus:focus .group-focus\\:square-8 {
	width: ${8 / 16}rem;
	height: ${8 / 16}rem;
}

.group-focus:focus .group-focus\\:square-16 {
	width: ${16 / 16}rem;
	height: ${16 / 16}rem;
}
`.trim())
})
