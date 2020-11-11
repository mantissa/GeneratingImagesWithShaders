// Author:
// Title: Functions & Curves

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535
#define TWO_PI 6.283185307

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 color = vec3(0.1, 0.2, 0.4);
    
    // linear curve
    // increases at a constant rate
    color.r = st.x;
    
    // pow (exponential curve)
    // multiplies value by itself n times
    color.r = pow( st.x, 2.); // same as color.r = st.x * st.x
    
    // fract
    // computes fractional value
    color.r = fract(st.x*2.); 
    
    // step
    // threshold ... pixels greater than value
    color.r = step( 0.5, st.x);
    
    // smoothstep
    // smooth threshold ... interpolate in range
    color.r = smoothstep(0.4, 0.6, st.x);
    
    // sin
    // repeating sinusodal curve
    // note: values range [-1, 1]
    color.r = sin( st.x * TWO_PI);
    color.r = sin( st.x * TWO_PI ) * 0.5 + 0.5;
    
    gl_FragColor = vec4(color, 1.0);
}