# typeface_deformer
Choose a font. Brutalize it. Download it. Use it!
(Picture)
See [live app](https://www.hafiyyandi.com/typeface-deformer)
Code adapted from [OpenType.JS](https://github.com/opentypejs/opentype.js/blob/master/index.html
) & Allison Parrish’s [modify every glyph](https://editor.p5js.org/allison.parrish/sketches/SJwZn0wpQ).

## Modifying a font file
OpenType parses a font file and allows modification of specific elements within it.
 * Font file has to be loaded as bytes -> loadBytes();
 * Parse the bytes = opentype.parse(font.bytes.buffer);

## Snapping
Once a font is parsed, we can modify its glyphs. These glyphs contain drawing commands to make a character in the font. The sketch goes through every character glyphs in a font file and modify the coordinates used for the drawing commands.

The snapping function is as follow:

function snap(v, distance, strength) {
    return (v * (1.0 - strength)) + (strength * Math.round(v / distance) * distance);
}

The strength and distance are derived from slider controls on the webpage.
