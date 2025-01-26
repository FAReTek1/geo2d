func to_cart(Polar p) Node {
    return Node{
        x: $p.r * sin($p.t),
        y: $p.r * cos($p.t)
    };
}