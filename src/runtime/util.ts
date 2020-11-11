// Ex:
//
// rem(16) -> 1rem
export function rem(n: number): number | string {
	const rounded = Math.round(n)
	if (!rounded) {
		return 0
	}
	return rounded / 16 + "rem"
}

// Ex:
//
// rem(16) -> 1em
export function em(n: number): number | string {
	if (!n) {
		return 0
	}
	return n / 16 + "em"
}

// Ex:
//
// rem(16) -> 16px
export function px(n: number): number | string {
	const rounded = Math.round(n)
	if (!rounded) {
		return 0
	}
	return rounded + "px"
}
