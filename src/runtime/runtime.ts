/*
 * TypeScript
 */

type Env = "development" | "production"

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
	darkMode: boolean
	debugMode: boolean
	debugSpaceMode: boolean

	init(env: Env): () => void
}

// Returns whether the user prefers dark mode.
// Implementation uses `localStorage`.
//
// prettier-ignore
function userPrefersDarkMode() {
	const ok = (
		themePreferenceKey in window.localStorage &&
		window.localStorage[themePreferenceKey] === "dark"
	)
	return ok
}

// Returns whether the computer (system) prefers dark mode.
// Implementation uses `matchMedia`.
//
// prettier-ignore
function systemPrefersDarkMode() {
	const ok = (
		"matchMedia" in window &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	)
	return ok
}

class Duomo implements IRuntime {
	#html: null | HTMLElement = null

	#darkMode: boolean = false
	#debugMode: boolean = false
	#debugSpaceMode: boolean = false

	// Tracks whether dark mode was set once; for FOUC.
	// FOUC: Flash Of Unstyled Content.
	#didInitDarkMode: boolean = false

	// #defers: null | (() => void)[] = null

	init(env: Env) {
		this.#html = document.documentElement

		// TODO: Should dark mode precedence be user configurable?
		if (userPrefersDarkMode() || systemPrefersDarkMode()) {
			this.darkMode = true
		}

		// Effect: Listen for `matchMedia` changes.
		if ("matchMedia" in window) {
			// COMPAT: Prefer `media.addListener` not `media.addEventListener`.
			const media = window.matchMedia("(prefers-color-scheme: dark)")
			const handleMedia = () => {
				this.darkMode = !this.darkMode
			}
			media.addListener(handleMedia)
			// deferers.push(() => media.removeListener(handleMedia))
		}

		// Effect: Listen for `matchMedia` changes.
		// TODO

		// TODO: Return defers.
		return () => {}
	}

	/*
	 * darkMode
	 */

	get darkMode() {
		return this.#darkMode
	}
	/**
	 * @mode Sets dark mode; `[data-theme="dark"]`
	 */
	// TODO: `toggleDarkMode` is not currently cancelable. Should it be?
	set darkMode(mode: boolean) {
		this.#darkMode = mode

		const toggle = (mode: boolean) => {
			console.log(`[Duomo] darkMode=${!mode ? "off" : "on"}`)
			const action = !mode
				? () => this.#html!.removeAttribute("data-theme")
				: () => this.#html!.setAttribute("data-theme", "dark")
			action()
			window.localStorage.setItem(themePreferenceKey, !mode ? "light" : "dark")
		}

		if (!this.#didInitDarkMode) {
			toggle(mode)
			this.#didInitDarkMode = true
			return
		} else {
			this.#html!.setAttribute("data-theme-effect", "true")
			setTimeout(() => {
				toggle(mode)
				setTimeout(() => {
					this.#html!.removeAttribute("data-theme-effect")
				}, 300)
			}, 25)
		}
	}

	/*
	 * debugMode
	 */

	get debugMode() {
		return this.#debugMode
	}
	/**
	 * @mode Sets debug mode; `[data-debug-space="..."]`
	 */
	set debugMode(mode: boolean) {
		this.#debugMode = mode
		console.log(`[Duomo] debugMode=${!mode ? "off" : "on"}`)
		this.#html!.setAttribute("data-debug", "" + mode)
	}

	/*
	 * debugSpaceMode
	 */

	get debugSpaceMode() {
		return this.#debugSpaceMode
	}
	/**
	 * @mode Sets debug space mode; `[data-debug-space="..."]`
	 */
	set debugSpaceMode(mode: boolean) {
		this.#debugSpaceMode = mode
		console.log(`[Duomo] debugSpaceMode=${!mode ? "off" : "on"}`)
		this.#html!.setAttribute("data-debug-space", "" + mode)
	}
}

// const Duomo: IRuntime = {
// 	init(mode: __ENV__ = "production") {
// 		const html = document.documentElement
// 		const deferers: (() => void)[] = []
//
// 		console.log("[Duomo] init=true")
//
// 		// NOTE: localStorage takes precedence.
// 		if (LSPrefersDarkMode() || !OSPrefersDarkMode()) {
// 			html.setAttribute("data-theme", "dark")
// 		}
//
// 		if ("matchMedia" in window) {
// 			// COMPAT: Prefer `media.addListener` not `media.addEventListener`.
// 			const media = window.matchMedia("(prefers-color-scheme: dark)")
// 			const handleMedia = () => {
// 				Duomo.toggleDarkMode()
// 			}
// 			media.addListener(handleMedia)
// 			deferers.push(() => media.removeListener(handleMedia))
// 		}
//
// 		if (mode !== "production") {
// 			// Key: `d`.
// 			const handleKeyDownDebugMode = (e: KeyboardEvent) => {
// 				if (!e.ctrlKey && !e.altKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
// 					Duomo.toggleDebugMode()
// 				}
// 			}
// 			document.addEventListener("keydown", handleKeyDownDebugMode)
// 			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDebugMode))
//
// 			// Key: `alt-d`.
// 			const handleKeyDownDebugSpaceMode = (e: KeyboardEvent) => {
// 				if (!e.ctrlKey && e.altKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
// 					Duomo.toggleDebugSpaceMode()
// 				}
// 			}
// 			document.addEventListener("keydown", handleKeyDownDebugSpaceMode)
// 			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDebugSpaceMode))
//
// 			// Key: `ctrl-d`.
// 			const handleKeyDownDarkMode = (e: KeyboardEvent) => {
// 				if (e.ctrlKey && !e.altKey && (e.key.toLowerCase() === "d" || e.keyCode === 68)) {
// 					Duomo.toggleDarkMode()
// 				}
// 			}
// 			document.addEventListener("keydown", handleKeyDownDarkMode)
// 			deferers.push(() => document.removeEventListener("keydown", handleKeyDownDarkMode))
// 		}
//
// 		return () => {
// 			console.log("[Duomo] init=false")
// 			deferers.reverse().forEach(defer => defer())
// 		}
// 	},
// 	toggleDebugMode() {
// 		const html = document.documentElement
// 		const hasAttribute = html.hasAttribute("data-debug")
// 		if (!hasAttribute) {
// 			console.log("[Duomo] debugMode=on")
// 			html.setAttribute("data-debug", "true")
// 		} else {
// 			console.log("[Duomo] debugMode=off")
// 			html.removeAttribute("data-debug")
// 		}
// 	},
// 	toggleDebugSpaceMode() {
// 		const html = document.documentElement
// 		const hasAttribute = html.hasAttribute("data-debug-space")
// 		if (!hasAttribute) {
// 			console.log("[Duomo] debugSpaceMode=on")
// 			html.setAttribute("data-debug-space", "true")
// 		} else {
// 			console.log("[Duomo] debugSpaceMode=off")
// 			html.removeAttribute("data-debug-space")
// 		}
// 	},
// 	toggleDarkMode(disableEffect = false) {
// 		const html = document.documentElement
//
// 		function toggle() {
// 			const hasAttribute = html.hasAttribute("data-theme")
// 			if (!hasAttribute) {
// 				console.log("[Duomo] darkMode=on")
// 				html.setAttribute("data-theme", "dark")
// 				window.localStorage.setItem(themePreferenceKey, "dark")
// 			} else {
// 				console.log("[Duomo] darkMode=off")
// 				html.removeAttribute("data-theme")
// 				window.localStorage.setItem(themePreferenceKey, "light")
// 			}
// 		}
//
// 		if (disableEffect) {
// 			toggle()
// 			return
// 		}
//
// 		// TODO: `toggleDarkMode` is not currently cancelable. Should it be?
// 		html.setAttribute("data-theme-effect", "true")
// 		setTimeout(() => {
// 			toggle()
// 			setTimeout(() => {
// 				html.removeAttribute("data-theme-effect")
// 			}, 300)
// 		}, 25)
// 	},
// }

;(() => {
	if (typeof window !== "undefined") {
		window.Duomo = new Duomo()
	}
})()

export default Duomo
