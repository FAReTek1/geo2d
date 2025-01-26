# geo2d
geo2d is a 2D geometry calculation system for goboscript. 

## usage
Add this to `goboscript.toml`:
```toml
[dependencies]
std = "https://github.com/FAReTek1/geo2d@<Tag name of release you want to use>"
```
Backpack should automatically add the [std](https://github.com/FAReTek1/std) package, which is used by geo2d.
Add the following line in your code:
```rs
%include backpack/geo2d/geo2d/__init__
```

## features

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
