// Author:
// Title: HSB Color Space

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

    // set a fill color with hsv
    // store as vec3
    vec3 hsv;
    hsv.r = sin(u_time * PI * 0.2); // animate hue with sin wave
    hsv.g = 1.0;
    hsv.b = 1.0;
    
    // color wash
    // hsv.r = sin(u_time * PI * 0.2 + st.x*0.1); 
    
    // distanced based hue
    float d = distance( st, vec2(0.5));
    //hsv.r = d;
    //hsv.r = sin(u_time*PI*0.2+d);

    // use function to translate hsv to rgb color space
    vec3 color = hsv2rgb(hsv);
    
    gl_FragColor = vec4(color, 1.0);
}