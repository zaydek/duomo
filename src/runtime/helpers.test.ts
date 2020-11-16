import * as helpers from "./helpers"

test("rem", () => {
	expect(helpers.rem(0)).toBe(0)
	expect(helpers.rem(0.5)).toBe(0)
	expect(helpers.rem(1)).toBe("0.0625rem")
	expect(helpers.rem(16)).toBe("1rem")
})

test("em", () => {
	expect(helpers.em(0)).toBe(0)
	expect(helpers.em(0.5)).toBe(0)
	expect(helpers.em(1)).toBe("0.0625em")
	expect(helpers.em(16)).toBe("1em")
})

test("px", () => {
	expect(helpers.px(0)).toBe(0)
	expect(helpers.px(0.5)).toBe(0)
	expect(helpers.px(1)).toBe("1px")
	expect(helpers.px(16)).toBe("16px")
})
