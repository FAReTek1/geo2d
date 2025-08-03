%define PLR_TO_V2(s) Vec2(s.r * cos(s.t), s.r * sin(s.t))
func plr_to_v2(Polar s) {return PLR_TO_V2($s);}
