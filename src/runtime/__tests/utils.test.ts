import { em, px, rem } from "../utils"

test("rem", () => {
	expect(rem(0)).toBe(0)
	expect(rem(0.5)).toBe(0)
	expect(rem(1)).toBe("0.0625rem")
	expect(rem(16)).toBe("1rem")
})

test("em", () => {
	expect(em(0)).toBe(0)
	expect(em(0.5)).toBe(0)
	expect(em(1)).toBe("0.0625em")
	expect(em(16)).toBe("1em")
})

test("px", () => {
	expect(px(0)).toBe(0)
	expect(px(0.5)).toBe(0)
	expect(px(1)).toBe("1px")
	expect(px(16)).toBe("16px")
})
