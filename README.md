# geo2d.gs

> 2D geometry calculations 

This is a 2D geometry library which is built for [goboscript](https://github.com/aspizu/goboscript).
It is designed to be used with [inflator](https://github.com/faretek1/inflator).

## Credits

...

## Installation

Make sure you have inflator installed

`inflate install https://github.com/FAReTek1/geo2d`

add geo2d to your `inflator.toml` config:
```toml
[dependencies]
# ...
geo2d = "https://github.com/FAReTek1/geo2d"
```

## Development

use `inflate install -e .`:

1. clone the respository: `git clone https://github.com/FAReTek1/geo2d`
2. `cd geo2d`
3. `inflate install -e .`
4. `cd test`
5. `inflate`
6. `goboscript build`
7. open `test.sb3`
