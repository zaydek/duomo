/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/variant" as *;

@mixin background-color($variants...) {
	@include variants($variants...) using ($v) {
		#{variant(indigo-500, $v)} {
			background-color: var(--indigo-500);
		}
	}
}

@at-root {
	@include background-color(responsive, hover, focus, group-hover, group-focus);
}
`)
	// prettier-ignore
	expect(result).toBe(`
.indigo-500 {
	background-color: var(--indigo-500);
}

.hover\\:indigo-500:hover {
	background-color: var(--indigo-500);
}

.focus\\:indigo-500:focus {
	background-color: var(--indigo-500);
}

.group-hover:hover .group-hover\\:indigo-500 {
	background-color: var(--indigo-500);
}

.group-focus:focus .group-focus\\:indigo-500 {
	background-color: var(--indigo-500);
}

@media (min-width: 640px) {
	.sm\\:indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 768px) {
	.md\\:indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 1024px) {
	.lg\\:indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 1280px) {
	.xl\\:indigo-500 {
		background-color: var(--indigo-500);
	}
}
`.trim())
})
