interface ISorcery {
	__deferers: (() => void)[]
	init(): void
	defer(): void
	toggleDebugMode(): void
	toggleDarkMode(): void
}

const Sorcery: ISorcery = {
	__deferers: [],

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
			const handleMedia = () => {
				Sorcery.toggleDarkMode()
			}
			media.addListener(handleMedia)
			Sorcery.__deferers.push(() => media.removeListener(handleMedia))
		}
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!e.ctrlKey && e.key.toLowerCase() === "d") {
				Sorcery.toggleDarkMode()
			} else if (e.ctrlKey && e.key.toLowerCase() === "d") {
				Sorcery.toggleDebugMode()
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		Sorcery.__deferers.push(() => document.removeEventListener("keydown", handleKeyDown))
	},
	defer() {
		for (let x = 0; x < Sorcery.__deferers.length; x++) {
			Sorcery.__deferers[x]()
		}
	},
	toggleDebugMode() {
		const hasAttribute = document.body.hasAttribute("data-debug")
		if (!hasAttribute) {
			document.body.setAttribute("data-debug", "true")
		} else {
			document.body.removeAttribute("data-debug")
		}
	},
	toggleDarkMode() {
		const hasAttribute = document.body.hasAttribute("data-theme")
		if (!hasAttribute) {
			document.body.setAttribute("data-theme", "dark")
		} else {
			document.body.removeAttribute("data-theme")
		}
	},
}

export default Sorcery
