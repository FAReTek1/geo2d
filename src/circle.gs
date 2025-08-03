
%define CIRC_V2R(p,r) Circle(p.x, p.y, r)
%define V2_CIRC(c) Vec2(c.x, c.y)

enum CircIntersectCases {
    notouch = "notouch",
    circinside = "circinside",
}

proc circ_draw Circle c, res=30 {
    goto $c.x + $c.r, $c.y;
    pen_down;
    local a = 0;
    repeat $res {
        a += 360 / $res;
        goto $c.x + $c.r * cos(a), $c.y + $c.r * sin(a);
    }
    pen_up;
}

# returns the intersect of two circles - i.e. 2 points
# returns a line which is a packages for the 2 points
func circ_intersect(Circle c1, Circle c2) Line2 {
    # i1 & i2
    local dx = $c2.x - $c1.x;
    local dy = $c2.y - $c1.y;

    # i3
    local disquared = dx * dx + dy * dy;

    if disquared > ($c1.r + $c2.r) * ($c1.r + $c2.r) {
        return LINE2_FILL(CircIntersectCases.notouch);
    }

    if disquared < ($c1.r - $c2.r) * ($c1.r - $c2.r) {
        return LINE2_FILL(CircIntersectCases.circinside);
    }

    local dist = sqrt(disquared);

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

    return Line2(
        mdx + oy,
        mdy - ox,
        mdx - oy,
        mdy + ox
    );
}

%define CIRC_OUTER_TANGENT_POINTS_TO_V2(c, p) circ_intersect(c, Circle(\
        (c.x + p.x) / 2,\
        (c.y + p.y) / 2,\
        DIST(c.x, c.y, p.x, p.y) / 2))
func circ_outer_tangent_points_to_v2(Circle c, Vec2 p) Line2 {
    local Line2 ret = CIRC_OUTER_TANGENT_POINTS_TO_V2($c, $p);
    return ret;
}
