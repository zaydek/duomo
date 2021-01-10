/**
 * @jest-environment node
 */
declare function sass(data: string): string
declare function errSass(testStr: string): Function

test("integration", () => {
	expect(errSass(`str-replace("Hello, world!", "Hello", "Bye")`)).toThrowError("Bye, world!")
	expect(errSass(`str-replace("Javascript", "Java", "Type")`)).toThrowError("Typescript")
})
