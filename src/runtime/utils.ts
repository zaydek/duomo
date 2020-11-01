// Ex:
//
// rem(16) -> 1rem
export function rem(n: number) {
	return n / 16 + "rem"
}

// Ex:
//
// rem(16) -> 1em
export function em(n: number) {
	return n / 16 + "em"
}

// Ex:
//
// rem(16) -> 16px
export function px(n: number) {
	return n + "px"
}
