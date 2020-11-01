import { em, px, rem } from "./utils"

test("rem", () => {
	expect(rem(16)).toBe("1rem")
})

test("em", () => {
	expect(em(16)).toBe("1em")
})

test("px", () => {
	expect(px(16)).toBe("16px")
})
