const THEME_PREFERENCE_KEY = "duomo-theme-preference" as const

// type Mode = "development" | "production" | "test"
type Mode = typeof process.env.NODE_ENV

interface IDuomo {
	init(mode: Mode): () => void
	toggleDebugMode(): void
	toggleDarkMode(): void
}

function localStoragePrefersDarkMode() {
	// prettier-ignore
	const ok = (
		THEME_PREFERENCE_KEY in window.localStorage &&
		window.localStorage[THEME_PREFERENCE_KEY] === "dark"
	)
	return ok
}

function OSPrefersDarkMode() {
	// prettier-ignore
	const ok = (
		"matchMedia" in window &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	)
	return ok
}

// TODO: Can use esbuild as a bundler.
// TODO: Add `useDuomoRuntime`.
const Duomo: IDuomo = {
	init(mode: Mode) {
		const deferers: Array<() => void> = []

		console.log("[Duomo] init=true")

		// NOTE: localStorage takes precedence.
		if (localStoragePrefersDarkMode() || !OSPrefersDarkMode()) {
			document.body.classList.add("dark")
		}

		if ("matchMedia" in window) {
			// NOTE: Prefer `media.addListener` (vs. `media.addEventListener`).
			//
			// > The addListener() method of the MediaQueryList interface adds a listener to the MediaQueryListener that will
			// > run a custom callback function in response to the media query status changing.
			// >
			// > This is basically an alias of EventTarget.addEventListener(), for backwards compatibility purposes.
			// > Older browsers should use addListener instead of addEventListener since MediaQueryList only inherits from
			// > EventTarget in newer browsers.
			//
			// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
			//
			const media = window.matchMedia("(prefers-color-scheme: dark)")
			const handleMedia = () => {
				Duomo.toggleDarkMode()
			}
			media.addListener(handleMedia)
			deferers.push(() => media.removeListener(handleMedia))
		}

		if (mode !== "production") {
			// Handler for dark mode:
			const handleKeyDownDarkMode = (e: KeyboardEvent) => {
				if (!e.ctrlKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
					Duomo.toggleDarkMode()
				}
			}
			document.addEventListener("keydown", handleKeyDownDarkMode)
			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDarkMode))

			// Handler for debug mode:
			const handleKeyDownDebugMode = (e: KeyboardEvent) => {
				if (e.ctrlKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
					Duomo.toggleDebugMode()
				}
			}
			document.addEventListener("keydown", handleKeyDownDebugMode)
			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDebugMode))
		}

		return () => {
			console.log("[Duomo] init=false")
			deferers.reverse().forEach(defer => defer())
		}
	},
	toggleDebugMode() {
		const hasAttribute = document.body.hasAttribute("data-debug")
		if (!hasAttribute) {
			console.log("[Duomo] debugMode=on")
			document.body.setAttribute("data-debug", "true")
		} else {
			console.log("[Duomo] debugMode=off")
			document.body.removeAttribute("data-debug")
		}
	},
	// TODO: `toggleDarkMode` is not currently cancelable. Should it be?
	// TODO: Implement `toggleMode(mode: string = "dark")`.
	toggleDarkMode() {
		document.body.setAttribute("data-theme-effect", "true")
		setTimeout(() => {
			const hasAttribute = document.body.hasAttribute("data-theme")
			if (!hasAttribute) {
				console.log("[Duomo] darkMode=on")
				document.body.setAttribute("data-theme", "dark")
				window.localStorage.setItem(THEME_PREFERENCE_KEY, "dark")
			} else {
				console.log("[Duomo] darkMode=off")
				document.body.removeAttribute("data-theme")
				window.localStorage.setItem(THEME_PREFERENCE_KEY, "light")
			}
			setTimeout(() => {
				document.body.removeAttribute("data-theme-effect")
			}, 300)
		}, 25)
	},
}

export default Duomo
