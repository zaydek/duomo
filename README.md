# Sorcery SCSS

Sorcery SCSS ([v0.1](https://github.com/sorcery-src/sorcery/releases)) is utility-first framework for rapid development. Sorcery SCSS is most similar to Tailwind CSS but differentiates itself in these key ways:

- Emphasis on zero-configuration
- SCSS based, designed to be extended
- Limited API set, oriented for responsive skeleton prototyping
- Intended to be used in conjunction with CSS or SCSS
- Multiple CDN links for prototyping, add breakpoints as needed
- Classes map to utilities but can encompass higher-order patterns like `m-gap`

The problem with almost every CSS library and framework is they attempt to _solve_ frontend. Frontend is not a solvable problem. Frontend is the amalgamation of _many_ tools coming together to create user experiences for people. How Sorcery SCSS fits into this equation is by making it dead-easy to prototype responsive skeleton UIs.

The key to understanding Sorcery SCSS is to understand that it **does not attempt** to map every CSS property to an arbitrary class name. What Sorcery SCSS does is makes it easier to reason about responsive skeletons, and encourages you to lean into CSS or SCSS when you’re ready to retrofit your skeleton-app with content.

### API

Breakpoints are defined as the following and are not currently customizable (yet):

```scss
$xs: 40 * 16; //  640
$sm: 48 * 16; //  768
$md: 56 * 16; //  896
$lg: 64 * 16; // 1024
$xl: 80 * 16; // 1280
```

The standard scale used for numeric utilities:

```scss
$range: 0, 1, 2, 3, 4, 5, 6, 7,
	//  +1
	8, 10, 12, 14, 16, 18, 20, 22, //  +2
	24, 28, 32, 36, 40, 44, 48, 52,
	//  +4
	64, 72, 80, 88, 96, 104, 112, 120, //  +8
	128, 144, 160, 176, 192, 208, 224, 240,
	// +16
	256;
```

Note that the `margin` utilities also support an inverted scale for negative values.

### `margin`

Uses the standard range scale, from `1-256`. Note that `px` values are converted to `rem` values behind-the-scenes.

Note that the `m` utilities also support `auto` and an inverted scale for negative values.

```scss
.m-#{$v} {
	margin: rem($v);
}
.mx-#{$v} {
	margin-left: rem($v);
	margin-right: rem($v);
}
.ml-#{$v} {
	margin-left: rem($v);
}
.mr-#{$v} {
	margin-right: rem($v);
}
.my-#{$v} {
	margin-top: rem($v);
	margin-bottom: rem($v);
}
.mt-#{$v} {
	margin-top: rem($v);
}
.mb-#{$v} {
	margin-bottom: rem($v);
}
```

## Contributing

Contribution is welcome. To get started, check out the issues page — library maintainers will often hastily create issues to document an idea and context. If you need help understanding how the library works or need some deeper orientation, don’t hesitate to DM @username_ZAYDEK on Twitter. If there’s enough demand, we can create a Discord server to better support the community.

## License

Sorcery SCSS is MIT open source.
