# Collection of all structs used in Geo2D.gs
# Maybe there should also be enums.gs

# --- --- --- --- --- --- --- --- --- --- #
# Structs representing geometrical objects
struct Node{
    x, y
}

struct Polar {
    r, t # t = theta
}

struct Line{
    # Ideally this would be p1, p2, but I can't put structs in structs
    # If x1 is NaN (ignore the rest), then don't draw the line
    x1, y1, x2, y2
}

struct Circle {
    x, y, r
}

struct Box {
    # Struct representing a rectangle bounded by x/y min & max values
    xmin, ymin, xmax, ymax
}

# --- --- --- --- --- --- --- --- --- --- #
# Structs for returning values
struct PtX2{
    x1, y1, x2, y2
}

func get_ptx2(PtX2 pts, index) Node {
    if index == 1 {
        return Node{
            x: $pts.x1,
            y: $pts.y1
        };
    } else {
        return Node{
            x: $pts.x2,
            y: $pts.y2
        };
    }
}

# --- --- --- --- --- --- --- --- --- --- #
# Structs that are specific to certain proc/funcs