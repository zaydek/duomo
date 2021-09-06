# Introducing Duomo

What is Duomo? Duomo is a CSS component that makes implementing layout fun!

Duomo is based on the philosophy that layout and design implementation are separate concerns, and that design should be able to be layered subsequent to layout.

In practice, Duomo is a small collection of utility classes and Sass mixins and functions. Note that Duomo utilities are not strict utility classes in the sense that every class maps to one and only one property / value combination. Instead, Duomo is designed around some higher-order patterns such as `flex-row` instead of `flex flex-row` or `position top-all` instead of `position top-0 right-auto bottom-auto left-auto`.

**Duomo is not for everyone or every project.** Duomo simply attempts to solve for layout, and needs to be layered with CSS, Sass, etc. in order to be effective. Think of a Duomo as a CSS component, not a CSS library.

## Get Started

If you need breakpoints, use either one of the following links:

```html
<link rel="stylesheet" href="https://unpkg.com/duomo/dist/duomo.css" />
<link rel="stylesheet" href="https://unpkg.com/duomo/dist/duomo.min.css" />
```

If you don't need breakpoints, use either one of the following links:

```html
<link rel="stylesheet" href="https://unpkg.com/duomo/duomo/dist/duomo-root-only.css" />
<link rel="stylesheet" href="https://unpkg.com/duomo/duomo/dist/duomo-root-only.min.css" />
```

If you only need the CSS reset / base, use either one of the following links:

```html
<link rel="stylesheet" href="https://unpkg.com/duomo/duomo/dist/reset.css" />
<link rel="stylesheet" href="https://unpkg.com/duomo/duomo/dist/reset.min.css" />
```

If you need sourcemaps, simply concatenate `.map` to the filename. For example, [`duomo.css.map`](https://unpkg.com/duomo/dist/duomo.css.map).

## Build Sizes

To see the exact kB size for every artifact, open [`dist/stats.txt`](/dist/stats.txt). Here's an idea of what you can expect:

```
// This is the non-minified version
dist/duomo.css
+-----------------+
| text   |  202kB |
| gzip   |   26kB |
| brotli |    9kB |
+-----------------+

// This is the minified version
dist/duomo.min.css
+-----------------+
| text   |  142kB |
| gzip   |   20kB |
| brotli |    8kB |
+-----------------+
```

Duomo is only acceptable in production when compressed. Also note that Duomo can and should be cached for a long time if not forever if you hash the filename or concatenate the release version. This means that users should only ever need to download Duomo infrequently and is `<10kB` because of compression.

## Supported Properties

Duomo exports utility classes for the following CSS properties:

- [`position`](/#position)
- [`margin`](/#margin)
- [`padding`](/#padding)
- [`flexbox`](/#flexbox)
- [`aspect-ratio`](/#aspect-ratio) (polyfill using `padding-bottom`)
- [`width`](/#width)
- [`height`](/#height)
- [`border-width`](/#border-width)
- [`overflow`](/#overflow)
- [`z-index`](/#z-index)

## API

The API uses a regex-like pattern to describe all class name combinations.

This means one class name:

```
class-name
```

This means one class name, `class-foo` or `class-bar`:

```
class-(
  | foo
  | bar
)
```

This means the second class name is optional:

```
class-name | optional-class-name
```

This means the second class name is required:

```
class-name & required-class-name
```

This means the second class name is optional and one of `foo` or `bar`:

```
class-name | (
  | foo
  | bar
)
```

This means the second class name is required and one of `foo` or `bar`:

```
class-name & (
  | version-a
  | version-b
)
```

It may seem confusing at first, but because there are many class names, describing them this way should make it easy to reference which class name combinations are supported.

### `position`

```
relative

(
  | relative
  | absolute
  | fixed
  | sticky
) & (
  | all
  | top-all
  | top-right-all
  | right-all
  | bottom-right-all
  | bottom-all
  | bottom-left-all
  | left-all
  | top-left-all
)
```

For example:

- `relative`
- `absolute all`

### `margin`

```
m-(
  | <px>
  | auto
)

m(
  | x
  | y
  | t
  | r
  | b
  | l
)-(
  | <px>
  | auto
)
```

For example:

- `m-16`
- `m-auto`
- `mx-16`
- `mx-auto`

### `padding`

```
p-<px>

p(
  | x
  | y
  | t
  | r
  | b
  | l
)-<px>
```

For example:

- `p-16`
- `px-16`

### `flexbox`

```
justify-self-(
  | stretch
  | start
  | center
  | end
  | baseline
)

align-self-(
  | stretch
  | start
  | center
  | end
  | baseline
)

flex-(
  | row
  | col
) | justify-(
  | stretch
  | start
  | center
  | end
  | baseline
) | align-(
  | stretch
  | start
  | center
  | end
  | baseline
) | m-gap-<px>

flex-grow
```

For example:

- `self-justify-center`
- `self-justify-center self-align-center`
- `flex flex-row justify-center`
- `flex flex-row justify-center align-center`
- `flex flex-row justify-center align-center m-gap-16`
- `flex-grow`

### `display`

```
hide | show

hide & flex-(
  | row
  | col
) & <breakpoint>:show

show & flex-(
  | row
  | col
) & <breakpoint>:hide
```

For example:

- `hide md:show`
- `show md:hide`
- `hide md:show flex-row`
- `show md:hide flex-row`

### `aspect-ratio`

```
aspect & aspect-w-<integer> & aspect-h-<integer>

aspect-revert
```

For example:

- `aspect aspect-w-16 aspect-h-9`
- `aspect-revert`

### `width`

```
w-(
  | <px>
  | full
  | screen
  | sm
  | md
  | lg
  | xl
)
```

For example:

- `w-16`
- `w-full`
- `w-screen`
- `w-sm`
- `w-md`
- `w-lg`
- `w-xl`

### `height`

```
h-(
  | <px>
  | full
  | screen
)

min-h-(
  | 0
  | full
  | screen
)
```

For example:

- `h-16`
- `h-full`
- `h-screen`
- `min-h-0`
- `min-h-full`
- `min-h-screen`

### `border-width`

```
border-<px>

border-(
  | x
  | y
  | top
  | right
  | bottom
  | left
)-<px>
```

### `overflow`

For example:

- `border-4`
- `border-x-4`

```
overflow-(
  | scroll
  | hidden
)

overflow-(
  | x
  | y
)-(
  | scroll
  | hidden
)
```

For example:

- `overflow-scroll`
- `overflow-x-scroll`

### `z-index`

```
z-<integer>
```

For example:

- `z-10`

## Meta Classes

You may notice that classes such as `hide` and `show` don't map 1:1 with CSS. This is intentional as Duomo is not strictly a utility CSS library. Duomo uses a combination of selector logic and CSS variables where necessary to achieve higher-level APIs that are intuitive and easy to reason about.

The `m-gap` (short for `margin-gap`), `flex-grow`, `hide`, `show`, and `aspect-ratio` classes are examples of APIs that use selector logic and or CSS variables.

## Ranges

For classes that use `<px>` values, Duomo uses a standard range (a range is simply a list of integers) that changes its increment at `20`, `40`, `80`, `160`, and `320`.

Here's the standard range, which can be user-configured:

```scss
$-duomo-configuration: (
  // ...
  range: (
      0, // Increment by 2
      1,
      2,
      4,
      6,
      8,
     10,
     12,
     14,
     16,
     18,
     20, // Increment by 4
     24,
     28,
     32,
     36,
     40, // Increment by 8
     48,
     56,
     64,
     72,
     80, // Increment by 16
     96,
    112,
    128,
    144,
    160, // Increment by 32
    192,
    224,
    256,
    288,
    320, // Increment by 64
    384,
    448,
    512,
    576,
    640,
  ),
  // ...
);
```

Different properties implement different bounds, which are simply upper and lower limits on the standard range.

Here's the range bounds, which can be user-configured:

```scss
$-duomo-configuration: (
  // ...
  margin-bounds: (
    -128,
    128,
  ),
  margin-gap-bounds: (
    0,
    128,
  ),
  padding-bounds: (
    0,
    128,
  ),
  width-bounds: (
    0,
    640,
  ),
  height-bounds: (
    0,
    640,
  ),
  border-width-bounds: (
    0,
    8,
  ),
  // ...
);
```

This means `margin` supports values inclusively between `-128` and `128`, whereas `border-width` supports values inclusively between `0` and `8`.

## Configuration

While Duomo can be configured, Duomo is designed to not rely on configuration. Think of Duomo as a set of immutable classes. Configuring Duomo means the immutability of those classes cannot be guaranteed, therefore only do so when you know what you are doing.

A common use-case for configuration would be disabling some breakpoints or all breakpoints (this is how [`scripts/duomo-root-only.scss`](/scripts/duomo-root-only.scss) works). Another common use-case would be tweaking breakpoint values.

Here's how to disable breakpoints:

```scss
@use "../duomo";

@include duomo.configure(
  (
    breakpoints: (),
  ),
);
```

And Here's how to tweak breakpoints:

```scss
@use "../duomo";

@include duomo.configure(
  (
    breakpoints: (
      sm: 512px,
    ),
  ),
);
```

Note that you only need to provide key-value pairs for values you want to change. For example, if you want to tweak the `sm` breakpoint, only provide a key-value pair for `sm`. Under the hood, Duomo uses [ordered deep map merging](/duomo/utils/map.scss).

## Sass Mixins

Duomo exports a few mixins to help you configure Duomo and or generate your own `duomo.css` file.

```scss
// This is how you import Duomo in Sass-land
@use "duomo";

// Optionally configure Duomo by providing key-value pairs you want to override
duomo.configure(
  breakpoints: (
    // Tweak `sm` to `512px`
    sm: 512px,
  ),
);

// The CSS reset / base Tailwind CSS uses
duomo.reset;

// Generate Duomo classes
duomo.classes;
```

## Sass Functions

Duomo exports a few functions to help you layer your design implementation.

```scss
@use "duomo" as *;

// `duomo` is an accessor for configured key-value pairs

@debug duomo(nrange);
// -> (-640, -576, ...)

@debug duomo(range);
// -> (0, 1, ...)

@debug duomo(margin-bounds);
// -> (-128, 128)

@debug duomo(margin-gap-bounds);
// -> (0, 128)

@debug duomo(padding-bounds);
// -> (0, 128)

@debug duomo(width-bounds);
// -> (0, 640)

@debug duomo(height-bounds);
// -> (0, 640)

@debug duomo(border-width-bounds);
// -> (0, 8)

@debug duomo(breakpoints);
// -> (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
```

Furthermore, Duomo implements Tailwind CSS's design tokens:

```scss
@use "duomo" as *;

// `tailwind` is an accessor for configured key-value pairs

// https://tailwindcss.com/docs/font-family
@debug tailwind(<font>);

// https://tailwindcss.com/docs/customizing-colors
@debug tailwind(<color>-<key>);

// https://tailwindcss.com/docs/box-shadow
@debug tailwind(shadow-<key>);

// https://tailwindcss.com/docs/transition-timing-function
@debug tailwind(ease-<key>);
```

Note that Tailwind CSS design tokens [can be configured in the same manner as Duomo](#configuration).

And finally, unit functions for converting between types. Note that Duomo relies on `rem` units exclusively behind the scenes.

```scss
@use "duomo" as *;

// Convert to `rem` units
@debug rem(16);
// -> 1rem

// Convert to `em` units
@debug em(16);
// -> 1em

// Convert to `px` units
@debug px(16);
// -> 16px

// Dynamically convert to `rem`, `em`, or `px` units
@debug resolve-unit(16, rem);
// -> 1rem
```

## Themeable API (Sass)

The `themeable` API exports functions for:

- `background-color`
- `border-color`
- `box-shadow`
- `color`
- `fill`
- `opacity`
- `stroke`

Note that the second argument `$dark-value` is optional.

```scss
@use "duomo" as *;

// Note that Sass CSS variables need to use interpolation syntax, e.g. `#{...}`
:root {
  --color: #{color(#000, #fff)};
  --background-color: #{background-color(#fff, #000)};
}
// -> :root {
// ->   --color: #000;
// ->   --background-color: #fff;
// -> }
// -> :root[data-theme="dark"] {
// ->   --color: #fff;
// ->   --background-color: #000;
// -> }

.foo {
  @include color(#000, #fff);
  @include background-color(#fff, #000);
}
// -> .foo {
// ->   color: #000;
// ->   background-color: #fff;
// -> }
// -> :root[data-theme="dark"] .foo {
// ->   color: #fff;
// ->   background-color: #000;
// -> }
```

## Transition API (Sass)

```scss
@use "duomo" as *;

.foo {
  @include transition((color, background-color), 1s, ease-out);
}
// -> .foo {
// ->   transition: color 1s ease-out,
// ->     background-color 1s ease-out;
// -> }

.foo {
  @include transition((background-color, border-color, box-shadow, color, fill, opacity, stroke), 1s, ease-out);
}
// -> .foo {
// ->   transition: background-color 1s ease-out,
// ->     border-color 1s ease-out,
// ->     box-shadow 1s ease-out,
// ->     color 1s ease-out,
// ->     fill 1s ease-out,
// ->     opacity 1s ease-out,
// ->     stroke 1s ease-out;
// -> }
```

Note that the last argument `$delay` is optional.

---

## License

Duomo is licensed as [MIT open source](/LICENSE).
