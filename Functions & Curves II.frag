// Author:
// Title: Functions & Curves II

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float cubicPulse( float c, float w, float x )
{
    x = abs(x - c);
    if( x>w ) return 0.0;
    x /= w;
    return 1.0 - x*x*(3.0-2.0*x);
}
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 color;
    color.r = (cubicPulse(.5, 0.500, st.x ));
    color.g = (cubicPulse(0.036, 0.7, st.x ));
    color.b = (cubicPulse(0.700, 1.308, st.x ));

    gl_FragColor = vec4(color,1.0);
}
