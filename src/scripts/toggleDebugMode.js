function toggleDebugMode() {
	const modeEnabled = document.body.hasAttribute("data-debug")
	if (!modeEnabled) {
		document.body.setAttribute("data-debug", "true")
	} else {
		document.body.removeAttribute("data-debug")
	}
}
