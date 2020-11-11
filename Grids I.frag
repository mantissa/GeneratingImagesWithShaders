// Author: Jeremy Rotsztain 
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
    
    vec2 xy = st;
    xy *= 4.;
    vec2 cell = ceil( xy);
    vec2 pct = fract(xy);
    
    xy = st;
    xy *= 4.;
    cell = ceil( xy);
    pct = fract(xy);
    
    vec3 color = vec3(0.1, 0.2, 0.4);
    color.r = pct.r;
    color.g = pct.g;

    gl_FragColor = vec4(color, 1.0);
}