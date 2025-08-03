
%define LINE2_FILL(a) Line2(a, a, a, a)
%define LINE2_V2(p1,p2) Line2(p1.x, p1.y, p2.x, p2.y)
func line2_v2(Vec2 p1, Vec2 p2) Line2 {return LINE2_V2($p1, $p2);}

%define LINE2_P1(l) Vec2(l.x1, l.y1)
%define LINE2_P2(l) Vec2(l.x2, l.y2)
%define LINE2_LENGTH(l) V2_MAG(LINE2_DV(l))

# returns vector from p1 to p2
%define LINE2_DV(l) Vec2(l.x2 - l.x1, l.y2 - l.y1)
%define LINE2_DX(l) (l.x2 - l.x1)
%define LINE2_DY(l) (l.y2 - l.y1)

# returns vector from p2 to p1
%define LINE2_DV2(l) Vec2(l.x1 - l.x2, l.y1 - l.y2)
%define LINE2_DX2(l) (l.x1 - l.x2)
%define LINE2_DY2(l) (l.y1 - l.y2)

# Check against the sign of this value. If it's equal to 0, it is on the line
# if it is - or + it is on one side of the line. - and + are opposite sides
# this uses a determinant to get a signed area
func line2_side_v2(Line2 l, Vec2 p) {
    return V2_AREA(LINE2_DV($l), Vec2($p.x - $l.x1, $p.y - $l.y1));
}

%define LINE2_GET_INTS_DENOM(a, b) ((a.x1 - a.x2) * (b.y1 - b.y2) - (a.y1 - a.y2) * (b.x1 - b.x2))
%define LINE2_INTERSECT_DENOM(a, b, denom) Vec2(\
    ((a.x1 * a.y2 - a.y1 * a.x2) * (b.x1 - b.x2) - (a.x1 - a.x2) * (b.x1 * b.y2 - b.y1 * b.x2)) / denom,\
    ((a.x1 * a.y2 - a.y1 * a.x2) * (b.y1 - b.y2) - (a.y1 - a.y2) * (b.x1 * b.y2 - b.y1 * b.x2)) / denom)
%define LINE2_INTERSECT(a, b) LINE2_INTERSECT_DENOM(a, b, LINE2_GET_INTS_DENOM(a, b))

func line2_intersect(Line2 self, Line2 other) Vec2 {
    local den = LINE2_GET_INTS_DENOM($self, $other);
    return LINE2_INTERSECT_DENOM($self, $other, den);
}


%define LINE2_IS_VERTICAL(l) (l.x1 == l.x2)
%define LINE2_IS_HORIZONTAL(l) (l.y1 == l.y2)

%define LINE2_GRAD(l) (LINE2_DY(l) / LINE2_DX(l))
%define LINE2_INTC(l, m) ((l.y1) - (l.x1) * (m)) # m = LINE2_GRAD(l)

func line2_intersect_circ(Line2 l, Circle c) Line2 {
    if LINE2_IS_VERTICAL($l) {
        # Vertical lines actually make the calculation extremely simple
        # https://www.desmos.com/calculator/qkkk3idnkq
        local discrim = $c.r * $c.r - ($l.x1 - $c.x) * ($l.x1 - $c.x);

        if discrim < 0 {
            return LINE2_FILL("NaN");
        } else {
            return Line2(
                $l.x1,
                $c.y + sqrt(discrim),
                $l.x1,
                $c.y - sqrt(discrim)
            );
        }
    } else {
        # https://www.desmos.com/calculator/hhyihldhhp
        local m = LINE2_GRAD($l);
        local c = ($l.y1 - $c.y) - ($l.x1 - $c.x) * m;

        local discrim = $c.r * $c.r * (m * m + 1) - c * c;
        if discrim < 0 {
            return LINE2_FILL("NaN");

        } else {
            local x1 = (sqrt(discrim) - m * c) / (1 + m * m);
            local x2 = (sqrt(discrim) + m * c) / (-1 - m * m);

            return Line2(
                x1 + $c.x, 
                m * x1 + c + $c.y,
                x2 + $c.x,
                m * x2 + c + $c.y
            );
        }
    }
}
