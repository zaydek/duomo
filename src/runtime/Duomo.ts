const THEME_PREFERENCE_KEY = "duomo-theme-preference"

interface IDuomo {
	__deferers: (() => void)[]
	init(): void
	defer(): void
	toggleDebugMode(): void
	toggleDarkMode(): void
}

// TODO: Can we refactor Duomo to be a React component?
//
// <Duomo dev? prod?>
//   {/* ... */}
// </Duomo>
//
// The problem with this is SSR. This will be run on the server in NextJS.
// We want to trigger mode as-fast-as-possible when the client loads the app.
//
// Currently we use <script src="/scripts/layoutDarkMode.js" />
//
// function themePreferenceDark() {
//   const ok = (
//     "themePreference" in localStorage &&
//     localStorage.themePreference === "dark"
//   )
//   return ok
// }
// function prefersColorShemeDark() {
//   const ok = (
//     window.matchMedia &&
//     window.matchMedia("(prefers-color-scheme: dark)").matches
//   )
//   return ok
// }
// ;(() => {
//   if (themePreferenceDark() || prefersColorShemeDark()) {
//     const html = document.documentElement
//     html.classList.add("dark")
//   }
// })()
//
const Duomo: IDuomo = {
	__deferers: [],

	// TODO: Can `init` return a defer closure? Then deprecate the `defer` method.
	// TODO: It would be nice if we can init from "development" or "production" for example.
	init() {
		// TODO: Read `THEME_PREFERENCE_KEY` from localStorage.
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
				Duomo.toggleDarkMode()
			}
			media.addListener(handleMedia)
			Duomo.__deferers.push(() => media.removeListener(handleMedia))
		}
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!e.ctrlKey && e.key.toLowerCase() === "d") {
				Duomo.toggleDarkMode()
			} else if (e.ctrlKey && e.key.toLowerCase() === "d") {
				Duomo.toggleDebugMode()
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		Duomo.__deferers.push(() => document.removeEventListener("keydown", handleKeyDown))
	},
	defer() {
		for (let x = 0; x < Duomo.__deferers.length; x++) {
			Duomo.__deferers[x]()
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
