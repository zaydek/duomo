import Duomo from "../runtime"

function sleep(forMs: number) {
	return new Promise(resolve => setTimeout(resolve, forMs))
}

test("integration", async () => {
	const defer = window.Duomo.init("development", { quiet: true })

	// NOTE: First dark mode write should be instant.
	window.Duomo.darkMode = true
	expect(window.Duomo.darkMode).toBe(true)
	expect(window.localStorage.getItem(Duomo.localStorageKey)).toBe("dark")

	window.Duomo.darkMode = false
	await sleep(500)
	expect(window.Duomo.darkMode).toBe(false)
	expect(window.localStorage.getItem(Duomo.localStorageKey)).toBe("light")

	window.Duomo.darkMode = !window.Duomo.darkMode
	await sleep(500)
	expect(window.Duomo.darkMode).toBe(true)
	expect(window.localStorage.getItem(Duomo.localStorageKey)).toBe("dark")

	defer()
})
