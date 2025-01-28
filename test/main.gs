# Test code for using geo2d (used for development)
%include backpack/geo2d/geo2d

costumes "blank.svg";



onflag {run;}

func add1(a) {
    return $a + 1;
}

nowarp proc run{
    Node p = Node{x: 1, y: 10};

    Line l = Line{
            x1: -100, y1: -90,
            x2: 45, y2: 75
        };

    say sdf_line_seg(p, l);

    Node node = Node{};
    set_pen_size 1;
    FOR_SCREEN_NODE(node,
        node_goto node;

        dist = sdf_line(node, l);

        set_pen_color "#000000";
        set_pen_brightness (dist);

        pen_down; pen_up;
    );
}
