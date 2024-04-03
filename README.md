# PostCSS Fluid Typography

Responsive typography values using linear scale: define `fluid` properties for `font-size`,
`line-height`, and `letter-spacing`.

A plugin for [PostCSS][postcss]. Fork of [postcss-responsive-type][upstream] with slightly
different ergonomics and support for custom properties.

![Responsive Type Demo][demo]

## Usage

### Quick Start

Set a fluid font-size on `html` and use `rem` units throughout your site to create a whole fluid UI.

```css
html {
  font-size: fluid;
}
```

### Specify Parameters

Units can be in px, rem, or em. When using em units, specify the `font-range` in em as well.

```css
html {
  font-size: fluid 12px 21px; /* min-size, max-size */
  font-range: 420px 1280px; /* viewport widths between which font-size is fluid */
}
```

### Fluid Line Height and Letter-Spacing

You can also set fluid sizes for the `line-height` and `letter-spacing` properties. They have the
same syntax and work the same way as fluid font sizes. **Note:** Unitless line heights are not supported.

```css
html {
  line-height: fluid 1.2em 1.8em;
  line-height-range: 420px 1280px;
}
```

```css
html {
  letter-spacing: fluid 0px 4px;
  letter-spacing-range: 420px 1280px;
}
```

## Defaults

You only need to specify the `fluid` property, all other values have sane defaults.

### Font Size

- `min-font-size`: 14px
- `max-font-size`: 21px
- `lower-font-range`: 420px
- `upper-font-range`: 1280px

#### Line Height

- `min-line-height`: 1.2em
- `max-line-height`: 1.8em
- `lower-line-height-range`: 420px
- `upper-line-height-range`: 1280px

#### Letter-Spacing

- `min-letter-spacing`: 0px
- `max-letter-spacing`: 4px
- `lower-letter-spacing-range`: 420px
- `upper-letter-spacing-range`: 1280px

## Browser Support

The plugin just uses calc, vw units, and media queries behind the scenes, so it works on all modern
browsers except Opera Mini. Legacy browsers will ignore the output `fluid` font-size. You can easily
provide a simple static fallback:

```css
.foo {
  font-size: 16px;
  font-size: responsive;
}
```

## License

MIT © Philipp Daun

[PostCSS]: https://github.com/postcss/postcss
[upstream]: https://github.com/seaneking/postcss-responsive-type
[demo]: /demo.gif?raw=true
