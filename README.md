# geo2d
geo2d is a 2D geometry calculation system for goboscript. 

## usage
1. Add this to `goboscript.toml`:
    ```toml
    [dependencies]
    std = "https://github.com/FAReTek1/geo2d@<Tag   name of release you want to use>"
    ```
    Backpack should automatically add the [std] (https://github.com/FAReTek1/std) package, which is used by geo2d.

    <details>
    <summary>If this doesn't work...</summary>
    If it doesn't work (which is happening to me right now, copy the dependencies from the  `goboscript.toml` file that can be found in  the corresponding geo2d release):

    ```toml
    [dependencies]
    geo2d = "https://github.com/FAReTek1/geo2d@v0.  0.1"
    std = "https://github.com/FAReTek1/std@v0.0.    5b2"
    ```
    </details>

2. Add the following line in your code:
    ```rs
    %include backpack/geo2d/geo2d
    ```

## features

If you're looking for a package to place these shapes on the pen canvas, look no further than shapefill (not released yet :/ )

Main Structs:
- Node
- Line
- Circle

With just these structs, many features have been implemented. A few examples:
- Line-Circle intersection
- Circle-Circle intersection
- Side of line that a Node is one
- Get tangent points of a circle to a point

geo2d also implements many clipping algorithms:
- circle-ngon
- cohen-sutherland
- circle-line
- cyrus-beck
- sutherland-hodgman
