// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Time & Animation

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // set a fill color with r,g,b
    // store as vec3
    vec3 color;
    color.r = sin(u_time * PI); // animate red channel with sin wave
    //color.g = cos(u_time * PI) * 0.5 + 0.5; // animate green channel with cos wave
    //color.b = cos(u_time * PI * 0.5 + st.y) * 0.5 + 0.5; // animate blue channel with y-offset 
    
    gl_FragColor = vec4(color, 1.0);
}