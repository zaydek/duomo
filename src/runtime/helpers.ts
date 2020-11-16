// Ex:
//
// rem(16) -> 1rem
export function rem(n: number): number | string {
	const floored = Math.floor(n)
	if (!floored) {
		return 0
	}
	return floored / 16 + "rem"
}

// Ex:
//
// em(16) -> 1em
export function em(n: number): number | string {
	const floored = Math.floor(n)
	if (!floored) {
		return 0
	}
	return floored / 16 + "em"
}

// Ex:
//
// px(16) -> 16px
export function px(n: number): number | string {
	const floored = Math.floor(n)
	if (!floored) {
		return 0
	}
	return floored + "px"
}
