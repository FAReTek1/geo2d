func circle_at(Node p, r) Circle {
    return Circle{
        x: $p.x, y:$p.y, r: $r
    };
}

func circle_pt(Circle c) Node {
    return Node{
        x: $c.x, y: $c.y
    };
}

enum intersect_circle_error_codes {
    notouch = "notouch",
    circinside = "circinside",
}


func intersect_circles(Circle c1, Circle c2) PtX2 {
    # i1 & i2
    local dx = $c2.x - $c1.x;
    local dy = $c2.y - $c1.y;

    # i3
    local disquared = dx * dx + dy * dy;
    local dist = sqrt(disquared);

    if dist > $c1.r + $c2.r {
        return PtX2{x1: intersect_circle_error_codes.notouch, x2: intersect_circle_error_codes.notouch};
    }

    if dist < abs($c1.r - $c2.r) {
        return PtX2{x1: intersect_circle_error_codes.circinside, x2: intersect_circle_error_codes.circinside};
    }
    
    # i1 & i2
    local vx = dx / dist;
    local vy = dy / dist;

    # This is old code, idk what to call this :\ I think it's some kind of magnitude to multiply by unit vector
    # i6
    local m1 = ((($c1.r * $c1.r) - ($c2.r * $c2.r)) + disquared) / (2 * dist);

    # i7 & i8
    local mdx = $c1.x + m1 * vx;
    local mdy = $c1.y + m1 * vy;

    # i9
    local m2 = sqrt(($c1.r * $c1.r) - (m1 * m1)); # Putting a lot of brackets because goboscript seems to have BIDMAS errors

    # i10 & i11
    local ox = m2 * vx;
    local oy = m2 * vy;

    return PtX2{
        x1: mdx + oy,
        y1: mdy - ox,
        x2: mdx - oy,
        y2: mdy + ox
    };
}

func get_tangent_points_of_circle_to_point(Circle c, Node p) PtX2 {
    return intersect_circles($c, Circle{
        x: ($c.x + $p.x) / 2,
        y: ($c.y + $p.y) / 2,
        r: DIST($c.x, $c.y, $p.x, $p.y) / 2
    });
}