// prettier-ignore
import Duomo from "./runtime"

export function localStoragePreference() {
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
export function matchMediaPreference() {
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
export function isKeyDownDarkMode(e: KeyboardEvent) {
	const ok = (
		!e.ctrlKey &&
		!e.altKey &&
		(e.key.toLowerCase() === "`" || e.keyCode === 192)
	)
	return ok
}

// prettier-ignore
export function isKeyDownDebugMode(e: KeyboardEvent) {
	const ok = (
		e.ctrlKey &&
		!e.altKey &&
		(e.key.toLowerCase() === "`" || e.keyCode === 192)
	)
	return ok
}
  
// prettier-ignore
export function parseDurationMs(durStr : string){
	let [numStr, unit] = durStr.trim().split(/(ms|s|m)$/);
	if(!numStr){
		throw new Error(`parseDurationMs: expected \`ms\`, \`s\`, or \`m\`; durStr=${durStr}`)
	}

	let n = +numStr;
  switch (unit) {
    case 'ms':
      // No-op
      break;
    case 's':
      n *= 1000;
      break;
    case 'm':
      n *= 1000 * 60;
      break;
    default:
      // No-op
      break;
  }
  return n;
}
