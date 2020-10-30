# @zaydek/sorcery

`@zaydek/sorcery` is a stack-based CSS framework. Contributions are welcome as issues and or pull requests.

To get started, simply run this command:

```bash
yarn add @zaydek/sorcery
# or npm i @zaydek/sorcery
```

**Usage:**

```tsx
import "@zaydek/sorcery"

function Component() {
	return (
		<div class="hstack">
			<div class="hstack s-16">
				<div class="w-32 h-32 bg-gray-100 rounded-full" />
				<div class="w-32 h-32 bg-gray-100 rounded-full" />
			</div>
			<div class="spacer" />
			<div class="hstack s-16">
				<div class="w-32 h-32 bg-gray-100 rounded-full" />
				<div class="w-32 h-32 bg-gray-100 rounded-full" />
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
		<link rel="stylesheet" href="https://unpkg.com/@zaydek/sorcery/dist/index.min.css" />
	</head>
	<body>
		<div class="hstack">
			<div class="hstack s-16">
				<div class="w-32 h-32 bg-gray-100 rounded-full"></div>
				<div class="w-32 h-32 bg-gray-100 rounded-full"></div>
			</div>
			<div class="spacer"></div>
			<div class="hstack s-16">
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

<sub>Stacks are inspired by [Apple Swift UI](TODO) and [Jon Q’s talks about implementing stacks in CSS](TODO).</sub>

What do stack-based layouts mean? Instead of thinking in terms of Flexbox, think in terms of stacks. A stack simply describes a horizontal or vertical axis, and stacks compose a layout. It’s turtles all the way down, but for stacks. 🐢<sub>🐢</sub>

Why stacks? Stacks are a more natural way of thinking about layout. The trouble with Flexbox is that you need to remember `display`, `flex-direction`, `justify-content`, `align-items`, and `flex`, and remember how these properties change in the context of `flex-direction: row` and `flex-direction: column`. Stacks are a much more simple but powerful primitive for describing layout _that is based on Flexbox_.

At the core of Sorcery CSS are three classes: `hstack`, `vstack`, and `spacer`:

```scss
.hstack {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.hstack > * + * {
	margin-top: 0;
	margin-left: var(--spacing, 0);
}

.vstack {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.vstack > * + * {
	margin-left: 0;
	margin-top: var(--spacing, 0);
}

.spacer {
	flex: 1 0 var(--spacing, 0);
}
```

- `hstack` implements a horizontal stack.
- `vstack` implements a vertical stack.
- `spacer` implements a `hstack` or `vstack` spacer.

Stacks are easy to reason about because they manage Flexbox for you. 💡

## [Utility-First Classes](#utility-first-classes)

TODO

## [Zero-Configuration](#zero-configuration)

TODO

## [Introspection](#introspection)

TODO

## License

Licensed as [MIT](./LICENSE).

<!--

Sorcery SCSS is a utility-first framework for rapid development. Sorcery SCSS is most similar to Tailwind CSS but differentiates itself in these key ways:

- Emphasis on zero-configuration
- SCSS-based, designed to be extended
- Limited API set, oriented for responsive skeleton prototyping
- Intended to be used in conjunction with CSS or SCSS
- Multiple CDN links for prototyping, add breakpoints as needed
- Classes map to utilities but can encompass higher-order patterns like `m-gap`

Furthermore, Sorcery SCSS is simpler than Tailwind CSS for the following reasons:

- The API surface area is dramatically smaller
- More consistent class
- Numerical values are specified using `px` equivalents, not Tailwind units
- There are intentionally no `hover:`, `focus:`, etc. pseudo classes
- You are encouraged to use Sorcery SCSS and CSS or SCSS, not exclusively Tailwind CSS or Sorcery SCSS

The problem with almost every CSS library and framework is they attempt to _solve_ frontend. Frontend is not a solvable problem. Frontend is the amalgamation of _many_ tools coming together to create user experiences for people. How Sorcery SCSS fits into this equation is by making it dead-easy to prototype responsive skeletons.

The key to understanding Sorcery SCSS is to understand that it **does not attempt** to map every CSS property to an arbitrary class. What Sorcery SCSS does is makes it easier to reason about responsive skeletons, and encourages you to lean into CSS or SCSS when you’re ready to retrofit your skeleton-app with content.

-->
