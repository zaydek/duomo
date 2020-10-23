function toggleDarkMode() {
	const modeEnabled = document.body.hasAttribute("data-theme")
	if (!modeEnabled) {
		document.body.setAttribute("data-theme", "dark")
	} else {
		document.body.removeAttribute("data-theme")
	}
}
