/**
 * @jest-environment node
 */
declare function sass(data: string): string
declare function errSass(testStr: string): Function

test("integration", () => {
	expect(errSass(`str-ends-with("Hello, world!", "?")`)).toThrowError("false")
	expect(errSass(`str-ends-with("Hello, world!", "!")`)).toThrowError("true")
	expect(errSass(`str-ends-with("", "")`)).toThrowError("true")
	expect(errSass(`str-ends-with(123, 3)`)).toThrowError("true")
	expect(errSass(`str-ends-with("Typescript", "script")`)).toThrowError("true")
})