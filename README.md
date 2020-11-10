# @zaydek/duomo

Duomo is a stack-based CSS framework. Contributions are welcome as issues and or pull requests.

To get started, simply run this command:

```bash
yarn add @zaydek/duomo
# or npm i @zaydek/duomo
```

**Usage:**

```tsx
import "@zaydek/duomo"

function Component() {
	return (
		<div className="hstack">
			<div className="hstack space-16">
				<div className="w-32 h-32 bg-gray-100 rounded-full" />
				<div className="w-32 h-32 bg-gray-100 rounded-full" />
			</div>
			<div className="spacer" />
			<div className="hstack space-16">
				<div className="w-32 h-32 bg-gray-100 rounded-full" />
				<div className="w-32 h-32 bg-gray-100 rounded-full" />
			</div>
		</div>
	)
}
```

**Usage: (CDN)**

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Hello, world!</title>
		<link rel="stylesheet" href="https://unpkg.com/@zaydek/duomo/dist/index.min.css" />
	</head>
	<body>
		<div class="hstack">
			<div class="hstack space-16">
				<div class="w-32 h-32 bg-gray-100 rounded-full"></div>
				<div class="w-32 h-32 bg-gray-100 rounded-full"></div>
			</div>
			<div class="spacer"></div>
			<div class="hstack space-16">
				<div class="w-32 h-32 bg-gray-100 rounded-full"></div>
				<div class="w-32 h-32 bg-gray-100 rounded-full"></div>
			</div>
		</div>
	</body>
</html>
```

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
