declare global {
	interface Window {
		Duomo: Runtime
	}
}

type Env = "development" | "production"

interface RuntimeOptions {
	quiet: boolean
}

interface Runtime {
	getDarkMode(): boolean
	setDarkMode(mode: boolean): void
	toggleDarkMode(): void

	getDebugMode(): boolean
	setDebugMode(mode: boolean): void
	toggleDebugMode(): void

	getDebugSpaceMode(): boolean
	setDebugSpaceMode(mode: boolean): void
	toggleDebugSpaceMode(): void

	init(env?: Env, options?: RuntimeOptions): () => void
}

// prettier-ignore
function localStoragePreference() {
	if (!(Duomo.localStorageKey in window.localStorage)) {
		return null
	}
	const value = window.localStorage[Duomo.localStorageKey]
	if (value !== "light" && value !== "dark") {
		return null
	}
	return value
}

// prettier-ignore
function matchMediaPreference() {
	if (!("matchMedia" in window)) {
		return null
	}
	const matches = window.matchMedia("(prefers-color-scheme: dark)").matches
	const value = ({
		false: "light",
		true: "dark",
	} as { [key: string]: string })["" + matches]
	return value
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

class Duomo implements Runtime {
	static localStorageKey = "duomo-theme-preference"

	#options: RuntimeOptions = { quiet: false }

	#html: null | HTMLElement = null
	#darkMode: boolean = false
	#debugMode: boolean = false
	#debugSpaceMode: boolean = false

	// Tracks whether dark mode was set once; for FOUC.
	// FOUC: Flash Of Unstyled Content.
	#didInitDarkMode: boolean = false

	#deferrers: (() => void)[] = []

	private __console_log(msg?: any, ...params: any[]) {
		if (this.#options.quiet) {
			// No-op
			return
		}
		console.log(msg, ...params)
	}

	// TODO: Should dark mode precedence (`localStorage` or `matchMedia`) be user configurable?
	init(env: Env = "development", options: RuntimeOptions = { quiet: false }) {
		this.#options = options
		this.__console_log("[Duomo] init=true")

		this.#html = document.documentElement

		const lsPref = localStoragePreference()
		const mmPref = matchMediaPreference()
		if (lsPref || mmPref) {
			this.setDarkMode((lsPref || mmPref) === "dark")
		}

		// `matchMedia` handler.
		if (typeof window !== undefined && "matchMedia" in window) {
			// COMPAT: Prefer `media.addListener` not `media.addEventListener`.
			const media = window.matchMedia("(prefers-color-scheme: dark)")
			const handleMedia = () => {
				this.toggleDarkMode()
			}
			media.addListener(handleMedia)
			this.#deferrers.push(() => media.removeListener(handleMedia))
		}

		// `keydown` handlers.
		if (env === "development") {
			const handleDarkMode = (e: KeyboardEvent) => {
				if (isKeyDownDarkMode(e)) {
					this.toggleDarkMode()
				}
			}
			const handleDebugMode = (e: KeyboardEvent) => {
				if (isKeyDownDebugMode(e)) {
					this.toggleDebugMode()
				}
			}
			const handleDebugSpaceMode = (e: KeyboardEvent) => {
				if (isKeyDownDebugSpaceMode(e)) {
					this.toggleDebugSpaceMode()
				}
			}

			document.addEventListener("keydown", handleDarkMode)
			document.addEventListener("keydown", handleDebugMode)
			document.addEventListener("keydown", handleDebugSpaceMode)

			this.#deferrers.push(() => document.removeEventListener("keydown", handleDarkMode))
			this.#deferrers.push(() => document.removeEventListener("keydown", handleDebugMode))
			this.#deferrers.push(() => document.removeEventListener("keydown", handleDebugSpaceMode))
		}

		return () => {
			this.#deferrers.reverse().forEach(defer => defer())
			this.__console_log("[Duomo] init=false")
		}
	}

	/*
	 * darkMode
	 */

	getDarkMode() {
		return this.#darkMode
	}
	setDarkMode(mode: boolean) {
		this.#darkMode = mode

		const toggle = (mode: boolean) => {
			const action = !mode
				? () => this.#html!.removeAttribute("data-theme")
				: () => this.#html!.setAttribute("data-theme", "dark")
			action()
			window.localStorage.setItem(Duomo.localStorageKey, !mode ? "light" : "dark")
			this.__console_log(`[Duomo] darkMode=${!mode ? "off" : "on"}`)
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
	toggleDarkMode() {
		this.setDarkMode(!this.getDarkMode())
	}

	/*
	 * debugMode
	 */

	getDebugMode() {
		return this.#debugMode
	}
	setDebugMode(mode: boolean) {
		this.#debugMode = mode
		const action = !mode
			? () => this.#html!.removeAttribute("data-debug")
			: () => this.#html!.setAttribute("data-debug", "true")
		action()
		this.__console_log(`[Duomo] debugMode=${!mode ? "off" : "on"}`)
	}
	toggleDebugMode() {
		this.setDebugMode(!this.getDebugMode())
	}

	/*
	 * debugSpaceMode
	 */

	getDebugSpaceMode() {
		return this.#debugSpaceMode
	}
	setDebugSpaceMode(mode: boolean) {
		this.#debugSpaceMode = mode
		const action = !mode
			? () => this.#html!.removeAttribute("data-debug-space")
			: () => this.#html!.setAttribute("data-debug-space", "true")
		action()
		this.__console_log(`[Duomo] debugSpaceMode=${!mode ? "off" : "on"}`)
	}
	toggleDebugSpaceMode() {
		this.setDebugSpaceMode(!this.getDebugSpaceMode())
	}
}

;(() => {
	if (typeof window !== "undefined") {
		window.Duomo = new Duomo()
	}
})()

export default Duomo
