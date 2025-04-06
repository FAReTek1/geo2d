# geo2d
geo2d is a 2D geometry calculation system for goboscript. 

## usage
1. Add this to `goboscript.toml`:
    ```toml
    [dependencies]
    std = "https://github.com/FAReTek1/geo2d@<Tag   name of release you want to use>"
    ```
    Backpack will automatically add the [std package](https://github.com/FAReTek1/std), which is used by geo2d.

2. Add the following line in your code:
    ```rs
    %include backpack/geo2d/geo2d
    ```

## features

If you're looking for a package to place these shapes on the pen canvas, go to [pengine](https://github.com/FAReTek1/pengine), not geo2d

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
