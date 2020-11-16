import React from "react"

interface AspectRatioProps extends React.ComponentProps<"div"> {
	aspectRatio: number
	children?: React.ReactNode
}

// Ex:
//
// <AspectRatio aspectRatio={16 / 9}>
//   {children}
// </AspectRatio>
//
export default function AspectRatio({ aspectRatio, children, ...props }: AspectRatioProps) {
	return (
		// prettier-ignore
		<div className="relative" style={{ paddingBottom: 1 / aspectRatio * 100 + "%" }} {...props}>
			<div className="absolute x-0 y-0">
				{children}
			</div>
		</div>
	)
}
