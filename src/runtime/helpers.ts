// Ex:
//
// rem(16) -> 1rem
export function rem(px: number): number | string {
	const floored = Math.floor(px)
	if (!floored) {
		return 0
	}
	return floored / 16 + "rem"
}

// Ex:
//
// em(16) -> 1em
export function em(px: number): number | string {
	const floored = Math.floor(px)
	if (!floored) {
		return 0
	}
	return floored / 16 + "em"
}

// Ex:
//
// px(16) -> 16px
export function px(px: number): number | string {
	const floored = Math.floor(px)
	if (!floored) {
		return 0
	}
	return floored + "px"
}
