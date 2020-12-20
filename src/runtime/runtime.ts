const THEME_PREFERENCE_KEY = "duomo-theme-preference" as const

type DevMode = "development" | "production"

interface IRuntime {
	init(mode: DevMode): () => void
	toggleDebugMode(): void
	toggleDarkMode(): void
}

// prettier-ignore
function localStoragePrefersDarkMode() {
	const ok = (
		THEME_PREFERENCE_KEY in window.localStorage &&
		window.localStorage[THEME_PREFERENCE_KEY] === "dark"
	)
	return ok
}

// prettier-ignore
function OSPrefersDarkMode() {
	const ok = (
		"matchMedia" in window &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	)
	return ok
}

const Duomo: IRuntime = {
	init(mode: DevMode = "production") {
		const deferers: Array<() => void> = []

		console.log("[Duomo] init=true")

		// NOTE: localStorage takes precedence.
		// TODO: Change to `[data-theme="dark"]`?
		if (localStoragePrefersDarkMode() || !OSPrefersDarkMode()) {
			document.body.classList.add("dark")
		}

		if ("matchMedia" in window) {
			// COMPAT: Prefer `media.addListener` not `media.addEventListener`.
			const media = window.matchMedia("(prefers-color-scheme: dark)")
			const handleMedia = () => {
				Duomo.toggleDarkMode()
			}
			media.addListener(handleMedia)
			deferers.push(() => media.removeListener(handleMedia))
		}

		if (mode !== "production") {
			const handleKeyDownDarkMode = (e: KeyboardEvent) => {
				if (e.ctrlKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
					Duomo.toggleDarkMode()
				}
			}
			document.addEventListener("keydown", handleKeyDownDarkMode)
			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDarkMode))

			const handleKeyDownDebugMode = (e: KeyboardEvent) => {
				if (!e.ctrlKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
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

declare global {
	interface Window {
		Duomo: IRuntime
	}
}

;(() => {
	if (typeof window !== "undefined") {
		window.Duomo = Duomo
	}
})()

export default Duomo
