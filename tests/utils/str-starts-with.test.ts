/**
 * @jest-environment node
 */
declare function sass(data: string): string
declare function errSass(testStr: string): Function

test("integration", () => {
	expect(errSass(`str-starts-with("Hello, world!", "?")`)).toThrowError("false")
	expect(errSass(`str-starts-with("Hello, world!", "H")`)).toThrowError("true")
	expect(errSass(`str-starts-with("", "")`)).toThrowError("true")
	expect(errSass(`str-starts-with(123, 1)`)).toThrowError("true")
	expect(errSass(`str-starts-with("Typescript", "Type")`)).toThrowError("true")
})
