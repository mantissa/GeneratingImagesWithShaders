// Author: Jeremy Rotsztain 
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Grids I

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // multiply the canvas by an integer
    // range becomes [0,4]
    vec2 xy = st;
    xy *= 4.;
    
    // get the cell # [0,3] using floor
    vec2 cell = floor( xy);
    
    // get the new xy coordinate using fract
    // fract returns the fractional value 1.373 => 0.373
    vec2 pct = fract(xy);
    
    // set the color using the grid cell's coordinates
    vec3 color;
    color.r = pct.r;
    color.g = pct.g;

    gl_FragColor = vec4(color, 1.0);
}