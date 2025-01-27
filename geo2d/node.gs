# Run the substack for each pixel on the 480x360 Scratch stage.
# Will assign the x/y coords to the given VARIABLE, which must have x & y attrs.
# You are supposed to use a Node struct for this.
%define FOR_SCREEN_NODE(var,substack) \
    var.x = -240;                                                   \
    repeat 480 {                                                    \
        var.y = -180;                                               \
        repeat 360 {                                                \
            var.y++;                                                \
            substack                                                \
        }                                                           \
        var.x++;                                                    \
    }


func node_to_polar(Node p) Polar {
    return Polar{
        r: sqrt($p.x * $p.x + $p.y * $p.y),
        t: DIR($p.x, $p.y, 0, 0)
    };
}

func node_dir(Node p1, Node p2) {
    return DIR($p1.x, $p1.y, $p2.x, $p2.y);
}

func node_join(Node p1, Node p2) Line {
    return Line {
        x1: $p1.x, y1: $p1.y,
        x2: $p2.x, y2: $p2.y
    };
}

func node_mouse() Node {
    return Node{
        x: mouse_x(),
        y: mouse_y()
    };
}

func node_position() Node {
    return Node{
        x: x_position(),
        y: y_position()
    };
}

proc node_goto Node p {
    goto $p.x, $p.y;
}

func nodes_lerp(Node a, Node b, t) Node {
    return Node{
        x: LERP($a.x, $b.x, $t),
        y: LERP($a.y, $b.y, $t)
    };
}