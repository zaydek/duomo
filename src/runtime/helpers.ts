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
