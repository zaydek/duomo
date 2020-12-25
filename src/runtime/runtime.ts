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
		typeof window !== undefined &&
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
		typeof window !== undefined &&
		"matchMedia" in window &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	)
	return ok
}

// prettier-ignore
function isKeyDownDarkMode(e: KeyboardEvent) {
	const ok = (
		e.ctrlKey &&
		!e.altKey &&
		(e.key.toLowerCase() === "d" || e.keyCode === 68)
	)
	return ok
}

// prettier-ignore
function isKeyDownDebugMode(e: KeyboardEvent) {
	const ok = (
		!e.ctrlKey &&
		!e.altKey &&
		(e.key.toLowerCase() === "d" || e.keyCode === 68)
	)
	return ok
}

// prettier-ignore
function isKeyDownDebugSpaceMode(e: KeyboardEvent) {
	const ok = (
		!e.ctrlKey &&
		e.altKey &&
		(e.key.toLowerCase() === "d" || e.keyCode === 68)
	)
	return ok
}

// TODO: Add options; `{ quiet: true }` or `{ silent: true }`.
class Duomo implements IRuntime {
	#html: null | HTMLElement = null

	#darkMode: boolean = false
	#debugMode: boolean = false
	#debugSpaceMode: boolean = false

	// Tracks whether dark mode was set once; for FOUC.
	// FOUC: Flash Of Unstyled Content.
	#didInitDarkMode: boolean = false

	#deferrers: (() => void)[] = []

	init(env: Env) {
		// TOOD: Guard for SSR?
		this.#html = document.documentElement

		// TODO: Should dark mode precedence be user configurable?
		if (userPrefersDarkMode() || systemPrefersDarkMode()) {
			this.darkMode = true
		}

		// `matchMedia` handler.
		if (typeof window !== undefined && "matchMedia" in window) {
			// COMPAT: Prefer `media.addListener` not `media.addEventListener`.
			const media = window.matchMedia("(prefers-color-scheme: dark)")
			const handleMedia = () => {
				this.darkMode = !this.darkMode
			}
			media.addListener(handleMedia)
			this.#deferrers.push(() => media.removeListener(handleMedia))
		}

		// `keydown` handlers.
		if (env === "development") {
			const handleDarkMode = (e: KeyboardEvent) => {
				if (isKeyDownDarkMode(e)) {
					this.#darkMode = !this.#darkMode
				}
			}
			const handleDebugMode = (e: KeyboardEvent) => {
				if (isKeyDownDebugMode(e)) {
					this.#debugMode = !this.#debugMode
				}
			}
			const handleDebugSpaceMode = (e: KeyboardEvent) => {
				if (isKeyDownDebugSpaceMode(e)) {
					this.#debugSpaceMode = !this.#debugSpaceMode
				}
			}

			document.addEventListener("keydown", handleDarkMode)
			document.addEventListener("keydown", handleDebugMode)
			document.addEventListener("keydown", handleDebugSpaceMode)

			this.#deferrers.push(() => document.removeEventListener("keydown", handleDarkMode))
			this.#deferrers.push(() => document.removeEventListener("keydown", handleDebugMode))
			this.#deferrers.push(() => document.removeEventListener("keydown", handleDebugSpaceMode))
		}

		console.log("[Duomo] init=true")
		return () => {
			this.#deferrers.reverse().forEach(defer => defer())
			console.log("[Duomo] init=false")
		}
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
			const action = !mode
				? () => this.#html!.removeAttribute("data-theme")
				: () => this.#html!.setAttribute("data-theme", "dark")
			action()
			window.localStorage.setItem(themePreferenceKey, !mode ? "light" : "dark")
			console.log(`[Duomo] darkMode=${!mode ? "off" : "on"}`)
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
	 * @mode Sets debug mode; `[data-debug-space]`
	 */
	set debugMode(mode: boolean) {
		this.#debugMode = mode
		this.#html!.setAttribute("data-debug", "" + mode)
		console.log(`[Duomo] debugMode=${!mode ? "off" : "on"}`)
	}

	/*
	 * debugSpaceMode
	 */

	get debugSpaceMode() {
		return this.#debugSpaceMode
	}
	/**
	 * @mode Sets debug space mode; `[data-debug-space]`
	 */
	set debugSpaceMode(mode: boolean) {
		this.#debugSpaceMode = mode
		this.#html!.setAttribute("data-debug-space", "" + mode)
		console.log(`[Duomo] debugSpaceMode=${!mode ? "off" : "on"}`)
	}
}

;(() => {
	if (typeof window !== "undefined") {
		window.Duomo = new Duomo()
	}
})()

export default Duomo
