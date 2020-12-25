/**
 * @jest-environment node
 */
declare function sass(data: string): string

test("integration", () => {
	const result = sass(`
@use "index" as * with ($headless: true);

@at-root {
	:root {
		--theme-transition: #{theme-transition(700ms, timing(ease-out, $raw: true))};
	}
}
`)
	// prettier-ignore
	expect(result).toBe(`
:root {
	--theme-transition: background-color 700ms cubic-bezier(0, 0, 0.2, 1), border-color 700ms cubic-bezier(0, 0, 0.2, 1), box-shadow 700ms cubic-bezier(0, 0, 0.2, 1), color 700ms cubic-bezier(0, 0, 0.2, 1), fill 700ms cubic-bezier(0, 0, 0.2, 1), opacity 700ms cubic-bezier(0, 0, 0.2, 1), stroke 700ms cubic-bezier(0, 0, 0.2, 1), transform 700ms cubic-bezier(0, 0, 0.2, 1);
}
`.trim())
})
