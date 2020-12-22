/*
 * TypeScript
 */

type NODE_ENV = "development" | "production"
// type Theme = undefined | "light" | "dark"

declare global {
	interface Window {
		Duomo: IRuntime
	}
}

/*
 * Runtime
 */

const themePreferenceKey = "duomo-theme-preference" as const

interface IRuntime {
	init(mode: NODE_ENV): () => void
	toggleDebugMode(): void
	toggleDebugSpaceMode(): void
	toggleDarkMode(): void
}

// prettier-ignore
function LSPrefersDarkMode() {
	const ok = (
		themePreferenceKey in window.localStorage &&
		window.localStorage[themePreferenceKey] === "dark"
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
	init(mode: NODE_ENV = "production") {
		const html = document.documentElement
		const deferers: (() => void)[] = []

		console.log("[Duomo] init=true")

		// NOTE: localStorage takes precedence.
		if (LSPrefersDarkMode() || !OSPrefersDarkMode()) {
			html.setAttribute("data-theme", "dark")
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
			// Key: `d`.
			const handleKeyDownDebugMode = (e: KeyboardEvent) => {
				if (!e.ctrlKey && !e.altKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
					Duomo.toggleDebugMode()
				}
			}
			document.addEventListener("keydown", handleKeyDownDebugMode)
			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDebugMode))

			// Key: `alt-d`.
			const handleKeyDownDebugSpaceMode = (e: KeyboardEvent) => {
				if (!e.ctrlKey && e.altKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
					Duomo.toggleDebugSpaceMode()
				}
			}
			document.addEventListener("keydown", handleKeyDownDebugSpaceMode)
			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDebugSpaceMode))

			// Key: `ctrl-d`.
			const handleKeyDownDarkMode = (e: KeyboardEvent) => {
				if (e.ctrlKey && !e.altKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
					Duomo.toggleDarkMode()
				}
			}
			document.addEventListener("keydown", handleKeyDownDarkMode)
			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDarkMode))
		}

		return () => {
			console.log("[Duomo] init=false")
			deferers.reverse().forEach(defer => defer())
		}
	},
	toggleDebugMode() {
		const html = document.documentElement
		const hasAttribute = html.hasAttribute("data-debug")
		if (!hasAttribute) {
			console.log("[Duomo] debugMode=on")
			html.setAttribute("data-debug", "true")
		} else {
			console.log("[Duomo] debugMode=off")
			html.removeAttribute("data-debug")
		}
	},
	toggleDebugSpaceMode() {
		const html = document.documentElement
		const hasAttribute = html.hasAttribute("data-debug-space")
		if (!hasAttribute) {
			console.log("[Duomo] debugSpaceMode=on")
			html.setAttribute("data-debug-space", "true")
		} else {
			console.log("[Duomo] debugSpaceMode=off")
			html.removeAttribute("data-debug-space")
		}
	},
	toggleDarkMode(disableEffect = false) {
		const html = document.documentElement

		function toggle() {
			const hasAttribute = html.hasAttribute("data-theme")
			if (!hasAttribute) {
				console.log("[Duomo] darkMode=on")
				html.setAttribute("data-theme", "dark")
				window.localStorage.setItem(themePreferenceKey, "dark")
			} else {
				console.log("[Duomo] darkMode=off")
				html.removeAttribute("data-theme")
				window.localStorage.setItem(themePreferenceKey, "light")
			}
		}

		if (disableEffect) {
			toggle()
			return
		}

		// TODO: `toggleDarkMode` is not currently cancelable. Should it be?
		html.setAttribute("data-theme-effect", "true")
		setTimeout(() => {
			toggle()
			setTimeout(() => {
				html.removeAttribute("data-theme-effect")
			}, 300)
		}, 25)
	},
}

;(() => {
	if (typeof window !== "undefined") {
		window.Duomo = Duomo
	}
})()

export default Duomo
