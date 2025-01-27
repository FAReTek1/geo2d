# Test code for using geo2d (used for development)
%include backpack/geo2d/geo2d

costumes "blank.svg";

onflag {
    Node p = Node{x: 1, y: 10};

    Line l = Line{
            x1: -100, y1: -90,
            x2: 45, y2: 75
        };

    say sdf_line_seg(p, l);
}
