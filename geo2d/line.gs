%include std\\math.gs
%include geo2d\\structs.gs

func line_side_node(Line l, Node p) {
    # Return -1, 0, or 1 depending on the side of the line that point p is on. 0 means the point is on the line.
    local det = (($l.x2 - $l.x1) * ($p.y - $l.y1)) - (($l.y2 - $l.y1) * ($p.x - $l.x1));
    return SIGN(det);
}

func lines_intersect(Line l1, Line l2) Node {
    local denom = ($l1.x1 - $l1.x2) * ($l2.y1 - $l2.y2) - ($l1.y1 - $l1.y2) * ($l2.x1 - $l2.x2);

    return Node {
        x: (($l1.x1 * $l1.y2 - $l1.y1 * $l1.x2) * ($l2.x1 - $l2.x2) - ($l1.x1 - $l1.x2) * ($l2.x1 * $l2.y2 - $l2.y1 * $l2.x2)) / denom,
        y: (($l1.x1 * $l1.y2 - $l1.y1 * $l1.x2) * ($l2.y1 - $l2.y2) - ($l1.y1 - $l1.y2) * ($l2.x1 * $l2.y2 - $l2.y1 * $l2.x2)) / denom
    };
}

func line_length(Line l) {
    return DIST($l.x1, $l.y1, $l.x2, $l.y2);
}

%define line_dx(l) ((l.x2) - (l.x1))
%define line_dy(l) ((l.y2) - (l.y1))

%define line_dx2(l) ((l.x1) - (l.x2))
%define line_dy2(l) ((l.y1) - (l.y2))

%define line_is_vertical(l) ((l.x1) == (l.x2))
# Convert line to mx+c form:
%define line_grad(l) (((l.y1) - (l.y2)) / ((l.x1) - (l.x2)))
%define line_intc(l,m) ((l.y1)- (l.x1) * (m))


func intersect_line_circle(Line l, Circle c) PtX2 {
    local r = SQUARE($c.r);  # Yeah, sorry :\ It was a mistake in my desmos graph

    if line_is_vertical($l) {
        # Vertical lines actually make the calculation extremely simple
        # https://www.desmos.com/calculator/qkkk3idnkq
        local discrim = r - SQUARE($l.x1 - $c.x);

        if discrim < 0 {
            return PtX2{x1: "NaN", x2: "NaN"};
        } else {
            return PtX2{
                x1: $l.x1, x2: $l.x2,
                y1: $c.y + sqrt(discrim),
                y2: $c.y - sqrt(discrim)
            };
        }
    } else {
        # https://www.desmos.com/calculator/hhyihldhhp
        local m = line_grad($l);
        local c = ($l.y1 - $c.y) - ($l.x1 - $c.x) * m;

        local discrim = r * (m * m + 1) - c * c;
        if discrim < 0 {
            return PtX2{x1: "NaN", x2: "NaN"};

        } else {
            local x1 = (sqrt(discrim) - m * c) / (1 + m * m);
            local x2 = (sqrt(discrim) + m * c) / (-1 - m * m);

            return PtX2{
                x1: x1 + $c.x, 
                y1: m * x1 + c + $c.y,
                x2: x2 + $c.x,
                y2: m * x2 + c + $c.y
            };
        }
    }
}
