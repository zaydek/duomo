interface ISorcery {
	init(): void
	toggleDebugMode(): boolean
	toggleDarkMode(): boolean
}

const Sorcery: ISorcery = {
	init() {
		const media = "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)")
		if (media) {
			if (media.matches) {
				document.body.setAttribute("data-theme", "dark")
			}
			// NOTE: Prefer `media.addListener`.
			//
			// The addListener() method of the MediaQueryList interface adds a listener to the MediaQueryListener that will
			// run a custom callback function in response to the media query status changing.
			//
			// This is basically an alias of EventTarget.addEventListener(), for backwards compatibility purposes.
			// Older browsers should use addListener instead of addEventListener since MediaQueryList only inherits from
			// EventTarget in newer browsers.
			//
			// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
			media.addListener(() => {
				Sorcery.toggleDarkMode()
			})
		}

		document.addEventListener("keydown", e => {
			if (!e.ctrlKey && e.key.toLowerCase() === "d") {
				Sorcery.toggleDarkMode()
			} else if (e.ctrlKey && e.key.toLowerCase() === "d") {
				Sorcery.toggleDebugMode()
			}
		})
	},
	toggleDebugMode() {
		const mode = document.body.hasAttribute("data-debug")
		if (!mode) {
			document.body.setAttribute("data-debug", "true")
		} else {
			document.body.removeAttribute("data-debug")
		}
		return !mode
	},
	toggleDarkMode() {
		const mode = document.body.hasAttribute("data-theme")
		if (!mode) {
			document.body.setAttribute("data-theme", "dark")
		} else {
			document.body.removeAttribute("data-theme")
		}
		return !mode
	},
}

export default Sorcery
