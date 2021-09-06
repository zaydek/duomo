const fs = require("fs")

const brotliSize = require("brotli-size")
const gzipSize = require("gzip-size")

function kB(bytes) {
	return (bytes / 1_000).toFixed() + "kB"
}

function format(str, cellWidth) {
	const [s1, s2] = str.split(" ")
	return s1 + " ".repeat(cellWidth - s1.length) + " | " + (" ".repeat(cellWidth - s2.length) + s2)
}

function table(filename) {
	const bytes = fs.readFileSync(filename)

	const text = format("text " + kB(bytes.length), 6)
	const gzip = format("gzip " + kB(gzipSize.sync(bytes)), 6)
	const brotli = format("brotli " + kB(brotliSize.sync(bytes)), 6)

	return `${filename}
+-----------------+
| ${text} |
| ${gzip} |
| ${brotli} |
+-----------------+
`
}

function run() {
	const tables = []
	const filenames = fs.readdirSync("dist").filter(filename => filename.endsWith(".css"))
	for (const filename of filenames) {
		tables.push(table("dist/" + filename))
	}
	fs.writeFileSync("dist/stats.txt", tables.join("\n") + "\n" /* EOF */)
}

run()
