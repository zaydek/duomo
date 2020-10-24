import React from "react"

const defaultBreakpoints = {
	xs: 40 * 16, //  640px
	sm: 48 * 16, //  768px
	md: 56 * 16, //  896px
	lg: 64 * 16, // 1024px
	xl: 80 * 16, // 1280px
}

export default function useBreakpoints(breakpoints = defaultBreakpoints) {
	const [xs, setXS] = React.useState(true)
	const [sm, setSM] = React.useState(true)
	const [md, setMD] = React.useState(true)
	const [lg, setLG] = React.useState(true)
	const [xl, setXL] = React.useState(true)

	React.useLayoutEffect(() => {
		const handleResize = e => {
			setXS(window.innerWidth >= breakpoints.xs)
			setSM(window.innerWidth >= breakpoints.sm)
			setMD(window.innerWidth >= breakpoints.md)
			setLG(window.innerWidth >= breakpoints.lg)
			setXL(window.innerWidth >= breakpoints.xl)
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [breakpoints])

	return { xs, sm, md, lg, xl }
}
