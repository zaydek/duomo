// Ex:
//
// <script
// 	id="sorcery-script"
// 	src="/scripts/sorcery.js"
// 	data-node-env={process.env.NODE_ENV}
// 	data-ssr
// />
window.sorcery = {
	__version: "0.3.x",

	init() {
		const script = document.getElementById("sorcery-script")
		if (!script) {
			throw new Error('Sorcery: no such <script id="sorcery-script" ...>')
		}

		// prettier-ignore
		const ssrWrapper = script.getAttribute("data-ssr") !== "" && script.getAttribute("data-ssr") !== "true"
			? fn => fn()
			: fn => setTimeout(fn, 0)

		ssrWrapper(() => {
			const media = "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)")
			if (media) {
				if (media.matches) {
					document.body.setAttribute("data-theme", "dark")
				}
				media.addEventListener("change", e => {
					sorcery.toggleDarkMode()
				})
			}

			if (script.getAttribute("data-node-env") !== "production") {
				document.addEventListener("keydown", e => {
					if (!e.ctrlKey && e.key === "d") {
						sorcery.toggleDarkMode()
					} else if (e.ctrlKey && e.key === "d") {
						sorcery.toggleDebugMode()
					}
				})
			}
		})
	},
	toggleDebugMode() {
		const modeEnabled = document.body.hasAttribute("data-debug")
		if (!modeEnabled) {
			document.body.setAttribute("data-debug", "true")
		} else {
			document.body.removeAttribute("data-debug")
		}
	},
	toggleDarkMode() {
		const modeEnabled = document.body.hasAttribute("data-theme")
		if (!modeEnabled) {
			document.body.setAttribute("data-theme", "dark")
		} else {
			document.body.removeAttribute("data-theme")
		}
	},
}

;(() => {
	window.sorcery.init()
})()
