/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "src/duomo/helpers/get-ampersand" as *;

@at-root {
	$amp: get-ampersand();
	#{$amp}m-4 {
		/**/
	}
	@media (min-width: 640px) {
		.sm {
			@at-root {
				$amp: get-ampersand();
				#{$amp}m-4 {
					/**/
				}
			}
		}
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
.m-4 {
	/**/
}

@media (min-width: 640px) {
	.sm\\:m-4 {
		/**/
	}
}
`.trim())
})
