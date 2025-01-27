# SDF module because it is a bit much to contain in just node.gs
# This is inspired/referenced from llamalib (I hope that's ok...)
# Llamalib can be found here: https://github.com/awesome-llama/llamalib/

# The first argument will always be the Node.

################################################################

func sdf_node(Node p, Node n) {
    # Return the distance between two nodes. Not really a *signed* distance function, oh well
    return DIST($p.x, $p.y, $n.x, $n.y);
}

# This one is adapted from llamalib: https://github.com/awesome-llama/llamalib/blob/e75c8503130a992403c92b7c741a4464b22e016c/geo2D/sdf.gs#L17C1-L22C2
%define _SDF_LINE(PX,PY,X1,Y1,X2,Y2) (((X2)-(X1))*((Y1)-(PY)) - ((X1)-(PX))*((Y2)-(Y1))) / DIST(X1, Y1, X2, Y2)
func sdf_line(Node p, Line l) {
    return _SDF_LINE($p.x, $p.y, $l.x1, $l.y1, $l.x2, $l.y2);
}

# This one is adapted from llamalib: https://github.com/awesome-llama/llamalib/blob/e75c8503130a992403c92b7c741a4464b22e016c/geo2D/sdf.gs#L25C1-L36C2
func sdf_line_seg(Node p, Line l) {
    local len = DIST($l.x1, $l.y1, $l.x2, $l.y2);
    local t = (($l.x2 - $l.x1) * ($px - $l.x1) + ($py - $l.y1) * ($l.y2 - $l.y1)) / len * len;
    if t < 0 {
        return DIST($l.x1, $l.y1, $px, $py);
    } elif t > 1 {
        return DIST($l.x2, $l.y2, $px, $py);
    } else {
        return abs(($l.x2-$l.x1)*($l.y1-$py) - ($l.x1-$px)*($l.y2 - $l.y1)) / len;
    }
}