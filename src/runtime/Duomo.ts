const THEME_PREFERENCE_KEY = "duomo-theme-preference" as const

export enum Mode {
	development = "development",
	production = "production",
}

interface IDuomo {
	init(mode: Mode): () => void
	toggleDebugMode(): void
	toggleDarkMode(): void
}

function localStorageThemePreference() {
	return "themePreference" in localStorage && localStorage[THEME_PREFERENCE_KEY] === "dark"
}
function operatingSystemThemePreference() {
	return "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)").matches
}

function recoverDarkMode() {
	if (!localStorageThemePreference() && !operatingSystemThemePreference()) {
		// No-op
		return
	}
	document.body.classList.add("dark")
}

const Duomo: IDuomo = {
	init(mode: Mode) {
		const deferers: Array<() => void> = []

		recoverDarkMode()
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

		if (mode === "development") {
			// Handler for dark mode:
			const handleKeyDownDarkMode = (e: KeyboardEvent) => {
				if (e.ctrlKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
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

		return () => deferers.reverse().forEach(defer => defer())
	},
	toggleDebugMode() {
		const hasAttribute = document.body.hasAttribute("data-debug")
		if (!hasAttribute) {
			document.body.setAttribute("data-debug", "true")
		} else {
			document.body.removeAttribute("data-debug")
		}
	},
	// TODO: Return a `clearTimeout` closure.
	// TODO: Implement toggleMode(mode: string = "dark") { ... }
	toggleDarkMode() {
		document.body.setAttribute("data-theme-effect", "true")
		setTimeout(() => {
			const hasAttribute = document.body.hasAttribute("data-theme")
			if (!hasAttribute) {
				document.body.setAttribute("data-theme", "dark")
				localStorage.setAttribute(THEME_PREFERENCE_KEY, "dark")
			} else {
				document.body.removeAttribute("data-theme")
				localStorage.setAttribute(THEME_PREFERENCE_KEY, "light")
			}
			setTimeout(() => {
				document.body.removeAttribute("data-theme-effect")
			}, 300)
		}, 50)
	},
}

export default Duomo
