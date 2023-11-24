This example show how you can create an animated external widget.

## Quick start

To run this locally:

1. Clone `https://github.com/Megaputer/external-bar-chart-race-widget.git`
2. Go to directory with `cd external-widget-template`
3. Run `yarn prod`
4. Copy `build/MyWidgets.js` to a `<PA6 installation directory>/data/externals/MyWidgets.js` or use parameter `--output-path` for set output location of the bundle file.
 Example: `yarn prod --output-path="C:/Megaputer Intelligence/PolyAnalyst 6.5 Server 64-bit/data/externals"`
5. Edit `data/externals/wr-externals.json` inside PA6 installation directory which will contain `["MyWidgets.js"]`