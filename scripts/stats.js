const brotliSize = require("brotli-size")
const fs = require("fs")
const gzipSize = require("gzip-size")

function human(n) {
	return (n / 1e3).toFixed() + "kB"
}

function format(str, cellWidth) {
	const [s1, s2] = str.split(" ")
	return s1 + " ".repeat(cellWidth - s1.length) + " | " + (" ".repeat(cellWidth - s2.length) + s2)
}

function table(file) {
	const data = fs.readFileSync(file)

	const raw = format("raw " + human(data.length), 6)
	const gzip = format("gzip " + human(gzipSize.sync(data)), 6)
	const brotli = format("brotli " + human(brotliSize.sync(data)), 6)

	const ret = `
${file}
+-----------------+
| ${raw} |
| ${gzip} |
| ${brotli} |
+-----------------+
`.trim()
	return ret
}

// TODO: Aggregate CSS files automatically.
;(() => {
	const tables = []
	const files = ["development-full.css", "development.css", "production-full.css", "production.css", "skeleton.css"]
	for (const file of files) {
		tables.push(table("dist/" + file))
	}
	fs.writeFileSync("dist/stats.txt", tables.join("\n\n") + "\n")
})()
