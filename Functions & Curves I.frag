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

float plot( vec2 xy, float amt){
    if( amt > xy.y - 0.006 && amt < xy.y + 0.006) return 1.0;
    return 0.;
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // linear curve
    // increases at a constant rate
    float amt = st.x;
    
    // pow (exponential curve)
    // multiplies value by itself n times
    //amt = pow( st.x, 2.); // same as color.r = st.x * st.x
    
    // fract
    // computes fractional value (i.e. 2.137 => 0.137 )
    //amt = fract(st.x*2.); 
    
    // step
    // threshold ... pixels greater than value
    //amt = step( 0.5, st.x);
    
    // smoothstep
    // smooth threshold ... interpolate between [0, 1] while in range of val 1 and 2
    // if less, 0. if greater 1.
    // uses cubic interpolation
    //amt = smoothstep(0.15, 0.85, st.x);
    
    // sin
    // repeating sinusodal curve
    // note: values range [-1, 1]
    //amt = sin( st.x * TWO_PI);
    //amt = sin( st.x * TWO_PI ) * 0.5 + 0.5; // scale into [0, 1] range
    
    // visualize 'amt' as red value
    vec3 color = vec3( amt, 0.2, 0.4);
    
    // graph the value using plot
    color.rgb = mix( color.rgb, vec3(0.0, 1.0, 0.0), plot( st, color.r));
    
    gl_FragColor = vec4(color, 1.0);
}
