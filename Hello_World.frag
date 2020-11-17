// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Hello World (GLSL)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    
    // get the xy coordinate in pixels & normalize to [0, 1] range
    // by dividing by width (500 x 500 px)
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // fix for aspect ratio
    st.x *= u_resolution.x/u_resolution.y;

    // set a fill color with r,g,b,a 
    // store as vec4 (normalized)
    vec4 color = vec4(1., 0., 0., 1.);
    
    // set individual rgb components
    //color.r = 0.0;
    //color.g = 1.0;
    //color.b = 0.5;
    
    // create a gradient
    //color.r = st.x;
    //color.g = st.y;
    //color.b = 1.0-st.x;
    
    gl_FragColor = color;
}
