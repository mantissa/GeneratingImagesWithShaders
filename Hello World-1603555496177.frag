// Author:
// Title: Hello World

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

    // set a fill color with r,g,b,a 
    // store as vec4
    vec4 color = vec4(1., 0., 0., 1.);
    //color.r = 0.0;
    //color.g = 1.0;
    //color.b = 0.5;
    
    // create a gradient
    //color.r = st.x;
    //color.g = st.y;
	//color.b = 1.0-st.x;
    
    gl_FragColor = color;
}