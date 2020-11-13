import sass from "sass"

const result = sass.renderSync({
	data: `h1 { font-size: 40px; }`,
})

test("basic test", () => {
	expect(result.css.toString()).toBe(
		`
h1 {
  font-size: 40px;
}
	`.trim(),
	)
})
