// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Mouse interaction

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    
    // THIS IS A GOOD WAY TO GET TO KNOW OUR XY COORDINATES!!
    // [0, 0] is on bottom left (black)
    // [1, 0] is on bottom right (red)
    // [0, 1] is on top left (green)
    // [1, 1] is on top right (yellow)
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // set a fill color with r,g,b,a 
    // store color as vec3
    vec3 color;
    color.r = u_mouse.x / u_resolution.x;
    color.g = u_mouse.y / u_resolution.y;
    //color.b = st.y; // gradient on blue
    
    gl_FragColor = vec4(color, 1.0);
}