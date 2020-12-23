import React, { createElement } from "react"

interface DirectionalStackProps {
	/**
	 * DOM tag or React component.
	 */
	tag?: string | React.FunctionComponent<any>
	/**
	 * Aligns the current element along the cross-axis.
	 */
	alignSelf?: "stretch" | "start" | "center" | "end" | "baseline"
	/**
	 * Aligns the current element’s children along the cross-axis.
	 */
	align?: "stretch" | "start" | "center" | "end" | "baseline"
	/**
	 * Space between children.
	 */
	space?: string
	className?: string
	children?: React.ReactNode
}

/**
 * **HStack** stacks children horizontally (x-axis).
 *
 * ![](https://i.ibb.co/L5Jyjjb/hstack.png)
 *
 * ```html
 * <div class="hstack">
 *   <div class="w-32 h-32 ..."></div>
 *   <div class="w-32 h-32 ..."></div>
 *   <div class="w-32 h-32 ..."></div>
 * </div>
 * ```
 */
export function HStack({
	// prettier-ignore
	tag,
	alignSelf,
	align,
	space,
	className,
	children,
	...props
}: DirectionalStackProps) {
	return (
		<>
			{createElement(
				tag || "div",
				{
					// prettier-ignore
					className: [
						"hstack",
						align !== undefined && `align-${align}`,
						space !== undefined && `space-${space}`,
						className,
					].filter(Boolean).join(" "),
					...props,
				},
				children,
			)}
		</>
	)
}

/**
 * **VStack** stacks children vertically (y-axis).
 *
 * ![](https://i.ibb.co/hM7mcfY/vstack.png)
 *
 * ```html
 * <div class="vstack">
 *   <div class="w-32 h-32 ..."></div>
 *   <div class="w-32 h-32 ..."></div>
 *   <div class="w-32 h-32 ..."></div>
 * </div>
 * ```
 */
export function VStack({
	// prettier-ignore
	tag,
	alignSelf,
	align,
	space,
	className,
	children,
	...props
}: DirectionalStackProps) {
	return (
		<>
			{createElement(
				tag || "div",
				{
					// prettier-ignore
					className: [
						"vstack",
						alignSelf !== undefined && `align-self-${align}`,
						align !== undefined && `align-${align}`,
						space !== undefined && `space-${space}`,
						className,
					].filter(Boolean).join(" "),
					...props,
				},
				children,
			)}
		</>
	)
}

interface ZStackProps {
	/**
	 * DOM tag or React component.
	 */
	tag?: string | React.FunctionComponent<any>
	className?: string
	children?: React.ReactNode
}

/**
 * **ZStack** stacks children (z-axis).
 *
 * ![](https://i.ibb.co/cXpVWJN/zstack.png)
 *
 * ```html
 * <div class="zstack">
 *   <div class="w-32 h-32 ..."></div>
 *   <div class="w-32 h-32 ..."></div>
 *   <div class="w-32 h-32 ..."></div>
 * </div>
 * ```
 */
export function ZStack({
	// prettier-ignore
	tag,
	className,
	children,
	...props
}: ZStackProps) {
	return (
		<>
			{createElement(
				tag || "div",
				{
					// prettier-ignore
					className: [
						"zstack",
						className,
					].filter(Boolean).join(" "),
					...props,
				},
				children,
			)}
		</>
	)
}

interface SpacerProps {
	/**
	 * DOM tag or React component.
	 */
	tag?: string | React.FunctionComponent<any>
	className?: string
	children?: React.ReactNode
}

export function Spacer({
	// prettier-ignore
	tag,
	className,
	children,
	...props
}: SpacerProps) {
	return (
		<>
			{createElement(
				tag || "div",
				{
					// prettier-ignore
					className: [
						"spacer",
						className,
					].filter(Boolean).join(" "),
					...props,
				},
				children,
			)}
		</>
	)
}
