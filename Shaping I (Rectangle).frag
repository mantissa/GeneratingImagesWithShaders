// Author: Jeremy Rotsztain 
// Title: Shaping I: Rectangle

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // set a fill color with rgb
    vec3 color = vec3(0.);

    // show pixels that are less than 0.8
    color.r = step(0.2, st.x);
    
    // multiply by pixels that are less than 0.8 (inverted x)
    color.r *= step(0.2, 1.0-st.x);
    
    // do the same on the green axis
    //color.g = step( st.y, 0.8);
    //color.g *= step(1.0-st.y, 0.8);
    
    // make a red square (for malevich)
    // disable green channel first!
    color.r *= step( 0.2, st.y);
    color.r *= step( 0.2, 1.0-st.y);
    
    gl_FragColor = vec4(color, 1.0);
}