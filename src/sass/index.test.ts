import sass from "sass"

function sassy(data: string) {
	const result = sass.renderSync({
		data,
	})
	return result.css.toString()
}

test("basic test", () => {
	const input = `
h1 {
  font-size: 40px;
}
`
	const output = `
h1 {
  font-size: 40px;
}
`
	expect(sassy(input.trim())).toBe(output.trim())
})
