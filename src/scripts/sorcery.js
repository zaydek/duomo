// TODO: Use <script data-dark-mode-shortcut="d" data-debug-shortcut="ctrl+d">?
window.sorcery = {
	__version: "0.3.x",

	init() {
		document.body.classList.add("macos-retina")

		const media = "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)")
		if (media) {
			if (media.matches) {
				document.body.setAttribute("data-theme", "dark")
			}
			media.addEventListener("change", e => {
				sorcery.toggleDarkMode()
			})
			// TODO
		}

		document.addEventListener("keydown", e => {
			if (!e.ctrlKey && e.key === "d") {
				sorcery.toggleDarkMode()
			}
			if (e.ctrlKey && e.key === "d") {
				sorcery.toggleDebugMode()
			}
		})
		// TODO
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
