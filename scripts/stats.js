const brotliSize = require("brotli-size")
const fs = require("fs")
const gzipSize = require("gzip-size")

function humanReadable(n) {
	return (n / 1e3).toFixed() + "kB"
}

function format(str, cellWidth) {
	const [s1, s2] = str.split(" ")
	return s1 + " ".repeat(cellWidth - s1.length) + " | " + (" ".repeat(cellWidth - s2.length) + s2)
}

function table(file) {
	const data = fs.readFileSync(file)

	const text = format("text " + humanReadable(data.length), 6)
	const gzip = format("gzip " + humanReadable(gzipSize.sync(data)), 6)
	const brotli = format("brotli " + humanReadable(brotliSize.sync(data)), 6)

	const ret = `
${file}
+-----------------+
| ${text} |
| ${gzip} |
| ${brotli} |
+-----------------+
`.trim()
	return ret
}

const EOF = "\n"

;(() => {
	const tables = []
	const files = fs.readdirSync("dist").filter(each => each.endsWith(".css"))
	for (const file of files) {
		tables.push(table("dist/" + file))
	}
	fs.writeFileSync("dist/stats.txt", tables.join("\n\n") + EOF)
})()
