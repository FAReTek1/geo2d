struct Polar{r, t} # t = theta
%define Polar(a,b) (Polar{r:a, t:b})

# Ideally this would be p1, p2, but no nested structs yet
# If x1 is NaN (ignore the rest), then don't draw the line
# also works as a package for 2 vec2s
struct Line2 {x1, y1, x2, y2}
%define Line2(a,b,c,d) (Line2{x1:a, y1:b, x2:c, y2:d})

struct Circle {x, y, r}
%define Circle(a,b,c) (Circle{x:a, y:b, r:c})

# Struct representing a rectangle bounded by x/y min & max values
struct Box {xmin, ymin, xmax, ymax}
%define Box(x1,y1,x2,y2) (Box{xmin:x1,ymin:y1,xmax:x2,ymax:y2})
