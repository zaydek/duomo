/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/sass/helpers/getters" as *;
@use "src/sass/helpers/resolvers" as *;
@use "src/sass/helpers/variants" as *;

@mixin background-color($variants...) {
	@include variants($variants...) using ($v) {
		#{variant(bg-indigo-500, $v)} {
			background-color: var(--indigo-500);
		}
	}
}

@at-root {
	@include background-color(core, hover, focus, group-hover, group-focus);
	@each $key, $px in breakpoint-map() {
		@media (min-width: $px) {
			.#{delimit($key)} {
				@at-root {
					@include background-color(responsive);
				}
			}
		}
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.bg-indigo-500 {
	background-color: var(--indigo-500);
}

.hover\\:bg-indigo-500:hover {
	background-color: var(--indigo-500);
}

.focus\\:bg-indigo-500:focus {
	background-color: var(--indigo-500);
}

.group:hover .group-hover\\:bg-indigo-500 {
	background-color: var(--indigo-500);
}

.group:focus .group-focus\\:bg-indigo-500 {
	background-color: var(--indigo-500);
}

@media (min-width: 640px) {
	.sm\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 768px) {
	.md\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 1024px) {
	.lg\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
@media (min-width: 1280px) {
	.xl\\:bg-indigo-500 {
		background-color: var(--indigo-500);
	}
}
`.trim())
})
