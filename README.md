# @zaydek/duomo

Duomo is a stack-based CSS framework. Contributions are welcome as issues and or pull requests.

To get started, simply run this command:

```bash
yarn add @zaydek/duomo
# or npm i @zaydek/duomo
```

**Usage: (CDN)**

CodePen to get you started: https://codepen.io/zaydek/pen/ExgxjYy.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Hello, world!</title>
		<link rel="stylesheet" href="https://unpkg.com/@zaydek/duomo" />
	</head>
	<body>
		<div class="hstack">
			<div class="hstack space-16">
				<div class="w-32 h-32 bg-gray-300 rounded-full"></div>
				<div class="w-32 h-32 bg-gray-300 rounded-full"></div>
			</div>
			<div class="spacer"></div>
			<div class="hstack space-16">
				<div class="w-32 h-32 bg-gray-300 rounded-full"></div>
				<div class="w-32 h-32 bg-gray-300 rounded-full"></div>
			</div>
		</div>
	</body>
</html>
```

**Usage (React):**

```tsx
import "@zaydek/duomo"

function Component() {
	return (
		<div className="hstack">
			<div className="hstack space-16">
				<div className="w-32 h-32 bg-gray-300 rounded-full" />
				<div className="w-32 h-32 bg-gray-300 rounded-full" />
			</div>
			<div className="spacer" />
			<div className="hstack space-16">
				<div className="w-32 h-32 bg-gray-300 rounded-full" />
				<div className="w-32 h-32 bg-gray-300 rounded-full" />
			</div>
		</div>
	)
}
```

## Table of Contents:

- [Why](#why)
- [HStack](#hstack)
- [VStack](#vstack)
- [Spacer](#spacer)
- [Spacing](#spacing)
- [ZStack](#zstack)
- [Range](#range)

## Why

Duomo is a spiritual successor of Tailwind CSS.

Duomo benefits you in the following ways:

- Small and intuitive API
- Small JavaScript runtime for toggling dark mode, etc.
- Built in debugging layout utilities
- Soft landing for iOS / SwiftUI developers
- Uses HStack and VStack instead of Flexbox for rows and columns
- Uses ZStack to layer along the z-axis
- Lightweight CDN footprint (<TODO>kb uncompressed, <TODO>kb with Brotli); no NPM installs required
- No configuration needed
- Sass API; easily extend Duomo when you install via NPM
- Introspection via CSS variables; Duomo tokens can be overridden _without_ Sass
- Maintenance-friendly HTML / CSS

Reasons you might not want to use Duomo:

- You like Tailwind CSS just fine thank you very much
- You don’t want to use stacks vs. Flexbox\* (_stacks are based on Flexbox_)
- You don’t have a need for small CDN footprints
- Duomo is not 1.0 stable

\*Note that stacks are exported as a standalone dependency; you can experiment with stacks _with_ any CSS library.

## HStack

HStacks `<div class="hstack">` stack children elements _horizontally_. Like `VStack`s, they can be modified with
`align-{alignment}` and `space-{range}`. By default, children are automatically centered horizontally and vertically. To
opt-out of horizontal centering, use a nested `<div class="spacer">`. To opt-out of vertical centering, use
`align-stretch`, `align-start`, or `align-end`.

**Spacer examples:**

```html
<!--
	. . .
	. x .
	. . .
-->
<div class="hstack">
	<div class="x"></div>
</div>

<!--
	. . .
	. . x
	. . .
-->
<div class="hstack">
	<div class="spacer"></div>
	<div class="x"></div>
</div>

<!--
	. . .
	x . .
	. . .
-->
<div class="hstack">
	<div class="x"></div>
	<div class="spacer"></div>
</div>
```

**Alignment examples:**

```html
<!--
	. x .
	. x .
	. x .
-->
<div class="hstack align-stretch">
	<div class="x"></div>
</div>

<!--
	. x .
	. . .
	. . .
-->
<div class="hstack align-start">
	<div class="x"></div>
</div>

<!--
	. . .
	. . .
	. x .
-->
<div class="hstack align-end">
	<div class="x"></div>
</div>
```

**Responsive examples:**

Adapts to a vertical stack at the medium breakpoint.

```html
<div class="hstack md:vstack">
	<!-- ... -->
</div>
```

Stack is revealed at the medium breakpoint.\*

_\*Not yet implemented._

```html
<div class="hidden md:vstack">
	<!-- ... -->
</div>
```

Stack is hidden at the medium breakpoint.\*

_\*Not yet implemented._

```html
<div class="hstack md:hidden">
	<!-- ... -->
</div>
```

## VStack

VStacks `<div class="vstack">` stack children elements _vertically_. Like `HStack`s, they can be modified with
`align-{alignment}` and `space-{range}`. By default, children are automatically centered horizontally and vertically. To
opt-out of horizontal centering, use a nested `<div class="spacer">`. To opt-out of horizontal centering, use
`align-stretch`, `align-start`, or `align-end`.

**Spacer examples:**

```html
<!--
	. . .
	. x .
	. . .
-->
<div class="vstack">
	<div class="x"></div>
</div>

<!--
	. . .
	. . .
	. x .
-->
<div class="vstack">
	<div class="spacer"></div>
	<div class="x"></div>
</div>

<!--
	. x .
	. . .
	. . .
-->
<div class="vstack">
	<div class="x"></div>
	<div class="spacer"></div>
</div>
```

**Alignment examples:**

```html
<!--
	. . .
	x x x
	. . .
-->
<div class="vstack align-stretch">
	<div class="x"></div>
</div>

<!--
	. . .
	x . .
	. . .
-->
<div class="vstack align-start">
	<div class="x"></div>
</div>

<!--
	. . .
	. . x
	. . .
-->
<div class="vstack align-end">
	<div class="x"></div>
</div>
```

**Responsive examples:**

Adapts to a horizontal stack at the medium breakpoint.

```html
<div class="vstack md:hstack">
	<!-- ... -->
</div>
```

Stack is revealed at the medium breakpoint.\*

_\*Not yet implemented._

```html
<div class="hidden md:vstack">
	<!-- ... -->
</div>
```

Stack is hidden at the medium breakpoint.\*

_\*Not yet implemented._

```html
<div class="vstack md:hidden">
	<!-- ... -->
</div>
```

## Spacer

Spacers `<div class="spacer">` create negative space between children elements. They can be used to simulate
`justify-content: flex-start`, `justify-content: flex-end`, and `justify-content: space-evenly` declaratively.

Spacers, unlike HStacks and VStacks, implement no modifiers.

**Examples:**

Simualtes `justify-content: flex-start`.

```html
<!--
	. . .
	. x x
	. . .
-->
<div class="hstack">
	<div class="spacer"></div>
	<div class="x"></div>
	<div class="x"></div>
</div>
```

Simualtes `justify-content: flex-end`.

```html
<!--
	. . .
	. . x
	. . .
-->
<div class="hstack">
	<div class="x"></div>
	<div class="x"></div>
	<div class="spacer"></div>
</div>
```

Simualtes `justify-content: space-evenly`.

```html
<!--
	. . . . .
	. x . x .
	. . . . .
-->
<div class="hstack">
	<div class="spacer"></div>
	<div class="x"></div>
	<div class="spacer"></div>
	<div class="x"></div>
	<div class="spacer"></div>
</div>
```

## Spacing

The spacing modifier `<div class="[h|v]stack space-{px}>` creates consistent spacing between HStack and VStack children
elements. Spacing can be any negative\* or positive range value.

Note that spacing spaces children elements _horizontally_ or _vertically_ depending on the parent HStack or VStack
context. **You don’t need to specifiy x-axis or y-axis-specific spacing**.

_\*Not yet implemented._

**Examples:**

```html
<div class="hstack space-8">
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 8px gap -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 8px gap -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 8px gap -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
</div>
```

```html
<div class="vstack space-16">
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 16px gap -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 16px gap -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 16px gap -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
</div>
```

**Responsive examples:**

```html
<div class="hstack space-8 md:space-16">
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 8px gap, 16px gap at the medium breakpoint -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 8px gap, 16px gap at the medium breakpoint -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
	<!-- 8px gap, 16px gap at the medium breakpoint -->
	<div class="w-32 h-32 bg-gray-400 rounded-full"></div>
</div>
```

## ZStack

ZStacks `<div class="zstack">` stack children elements on the z-axis _and_ center children elements across the x- and y-
axes. ZStacks make layering elements on top of one another easy. ZStacks are intended to be used _with_ HStacks and or
VStacks; they simply layer and center children elements.

ZStacks, unlike HStacks and VStacks, implement no modifiers.

Note that ZStacks use `position: relative`, so children element that use `position: absolute` are bound to the parent
ZStack bounding box.

**Examples:**

TODO

<!--

Layers a red, green, and blue element on top of each other. The blue element is visible. The red and green elements are obscured.

```html
<div class="zstack">
	<div class="hstack w-32 h-32 bg-red-400 rounded-full"></div>
	<div class="hstack w-32 h-32 bg-green-400 rounded-full"></div>
	<div class="hstack w-32 h-32 bg-blue-400 rounded-full"></div>
</div>
```

-->

## Range

The standard range describes legal range values. Some properties support negative ranges (`margin`) and some properties
use a sub-range (`border`, etc.).

**The standard range:**

```
   0-10 increments by  1 ->   0   1   2   3   4   5   6   7   8   9
  10-20 increments by  2 ->  10  12  14  16  18
  20-40 increments by  4 ->  20  24  28  32  36
  40-80 increments by  8 ->  40  48  56  64  72
 80-160 increments by 16 ->  80  96 112 128 144
160-320 increments by 32 -> 160 192 224 256 288
320-640 increments by 64 -> 320 384 448 512 576 640
```

<!--

## Ranges

Ranges describe all possible numerical values. Some properties support negative ranges (`margin`) and some properties use a sub-range (`border`, etc.).

**Standard range:**

```
		0-10, increments by  1:   0,   1,   2,   3,   4,   5,   6,   7,   8,   9,
	10-20, increments by  2:  10,  12,  14,  16,  18
	20-40, increments by  4:  20,  24,  28,  32,  36,
	40-80, increments by  8:  40,  48,  56,  64,  72,
	80-160, increments by 16:  80,  96, 112, 128, 144,
160-320, increments by 32: 160, 192, 224, 256, 288, 320,
```




margin:

m-{-range|range} margin-all
mt-              margin-top
mr-              margin-right
mb-              margin-bottom
ml-              margin-left
mx-              margin-x-axis
my-              margin-y-axis

padding:

p-{range}        padding-all
pt-              padding-top
pr-              padding-right
pb-              padding-bottom
pl-              padding-left
px-              padding-x-axis
py-              padding-y-axis

```

-->

<!--

## Rationale and Demos

If you’re asking yourself **‘Why did you build this from scratch and how is this different from Tailwind CSS?’**, check out these demos for a primer. Note that these are impromptu demos.

<table>
  <tr>
    <td>
			<a href="https://youtube.com/watch?v=4PMPkLHD7Os" target="_blank">
				<img src="https://raw.githubusercontent.com/zaydek/duomo/main/.github/youtube-cover.png">
				<p><strong>Demo 1: Introducing Stacks</strong></p>
			</a>
    </td>
    <td>
			<a href="https://youtube.com/watch?v=vV-A3ywo6v8" target="_blank">
				<img src="https://raw.githubusercontent.com/zaydek/duomo/main/.github/youtube-cover.png">
				<p><strong>Demo 2: Introducing Theming</strong></p>
			</a>
    </td>
  </tr>
</table>

-->

<!--

## Table of Contents

- [Stack-based layouts](#stack-based-layouts)
- [Utility-first classes](#utility-first-classes)
- [Emphasis on zero-configuration](#zero-configuration)
- [Introspection via CSS variables (custom properties)](#introspection)

## [Stack-Based Layouts](#stack-based-layouts)

<sub>Stacks are inspired by [Swift UI](https://developer.apple.com/videos/play/wwdc2020/10031) and [Jon Q’s talk about implementing Swift UI stacks in CSS](https://youtube.com/watch?v=fvOlTDJpNcM).</sub>

What are stack-based layouts? Instead of thinking in terms of Flexbox, think in terms of stacks. A stack simply describes a horizontal or vertical axis, and stacks compose a layout. It’s turtles all the way down, for stacks. 🐢<sub>🐢</sub>

Why stacks? Stacks are a more natural way of thinking about layout. The trouble with Flexbox is that you need to remember `display`, `flex-direction`, `justify-content`, `align-items`, and `flex`, and remember how these properties change in the context of `flex-direction: row` and `flex-direction: column`. Stacks are a much more simple but powerful primitive for describing layout _that is based on Flexbox_.

This is a microcosm of how Duomo works:

```scss
.hstack {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.hstack > * + * {
	margin-top: 0;
	margin-left: var(--space, 0);
}

.vstack {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.vstack > * + * {
	margin-left: 0;
	margin-top: var(--space, 0);
}

.spacer {
	flex: 1 0 var(--space, 0);
}
```

-->

<!--

And this is a macrocosm of how Duomo works:

```scss
$separator: "\\:";

@function px($value) {
	@return $value + px;
}

@function rem($value) {
	@return $value / 16 + rem;
}

@function get-dynamic-ampersand() {
	@if not & {
		@return ".";
	}
	@return & + $separator;
}

@mixin stacks {
	$amp: get-dynamic-ampersand();

	#{$amp}hstack {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
	}
	// NOTE: The root stack context resets `--space`.
	@if not & {
		.hstack > * {
			--space: 0;
		}
	}
	#{$amp}hstack > * + * {
		margin-top: 0;
		margin-left: var(--space, 0);
	}
	// NOTE: Omit `spacer`s and sibling elements from `var(--space)`.
	#{$amp}hstack > .spacer:empty,
	#{$amp}hstack > .spacer:empty + * {
		margin-left: 0;
	}

	#{$amp}vstack {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
	}
	// NOTE: The root stack context resets `--space`.
	@if not & {
		.vstack > * {
			--space: 0;
		}
	}
	#{$amp}vstack > * + * {
		margin-left: 0;
		margin-top: var(--space, 0);
	}
	// NOTE: Omit `spacer`s and sibling elements from `var(--space)`.
	#{$amp}vstack > .spacer:empty,
	#{$amp}vstack > .spacer:empty + * {
		margin-top: 0;
	}

	#{$amp}align-start {
		align-items: flex-start;
	}
	#{$amp}align-center {
		align-items: center;
	}
	#{$amp}align-end {
		align-items: flex-end;
	}

	@if not & {
		.spacer {
			flex-grow: 1;
			flex-shrink: 0;
			flex-basis: var(--space, 0);
		}
		// NOTE: Edge `spacer`s are collapsible to `0`.
		.spacer:first-child,
		.spacer:last-child {
			flex-basis: 0;
		}
	}

	@each $value in (4, 8, 12, 16, 20, 24, 28, 32) {
		#{$amp}space-#{$value} > * {
			--space: #{rem($value)};
		}
	}
}

@mixin reset {
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	body {
		margin: 0;
	}
}

@mixin debugger {
	* {
		outline: 2px solid hsla(215, 100%, 50%, 0.2);
		outline-offset: -1px;
	}
}

@at-root {
	@include reset;
	@include debugger;
	@include stacks;
	@each $key, $value in ("sm": 640, "md": 768, "lg": 1024, "xl": 1280) {
		@media (min-width: #{px($value)}) {
			.#{$key} {
				@at-root {
					@include stacks;
				}
			}
		}
	}
}
```

This is how Duomo works. Duomo includes a CSS reset, debugger, and many utility classes that follow the same naming conventions as Tailwind CSS. Stacks however are the core of _how_ and _why_ Duomo works.

-->

<!--

- `hstack`s implements a horizontal stack. Think `flex-direction: row`.
- `vstack`s implements a vertical stack. Think `flex-direction: column`.
- `spacer`s implements direction-agnostic spacers. Think `flex: 1`.

Stacks in Duomo are easy to reason about because they manage Flexbox for you. 💡 Furthermore, Duomo stacks cover edge cases such as every stack resets `--space` and `spacer`s shrink to `--space` (unless they are the start or end element). **This enables you to think declaratively without worrying about implementation details or corner cases.**

## [Utility-First Classes](#utility-first-classes)

TODO

## [Zero-Configuration](#zero-configuration)

TODO

## [Introspection](#introspection)

TODO

-->

## License

Licensed as [MIT](./LICENSE).

<!--

Duomo is a utility-first framework for rapid development. Duomo is most similar to Tailwind CSS but differentiates itself in these key ways:

- Emphasis on zero-configuration
- SCSS-based, designed to be extended
- Limited API set, oriented for responsive skeleton prototyping
- Intended to be used in conjunction with CSS or SCSS
- Multiple CDN links for prototyping, add breakpoints as needed
- Classes map to utilities but can encompass higher-order patterns like `m-gap`

Furthermore, Duomo is simpler than Tailwind CSS for the following reasons:

- The API surface area is dramatically smaller
- More consistent class
- Numerical values are specified using `px` equivalents, not Tailwind units
- There are intentionally no `hover:`, `focus:`, etc. pseudo classes
- You are encouraged to use Duomo and CSS or SCSS, not exclusively Tailwind CSS or Duomo

The problem with almost every CSS library and framework is they attempt to _solve_ frontend. Frontend is not a solvable problem. Frontend is the amalgamation of _many_ tools coming together to create user experiences for people. How Duomo fits into this equation is by making it dead-easy to prototype responsive skeletons.

The key to understanding Duomo is to understand that it **does not attempt** to map every CSS property to an arbitrary class. What Duomo does is makes it easier to reason about responsive skeletons, and encourages you to lean into CSS or SCSS when you’re ready to retrofit your skeleton-app with content.

-->
