// Author:
// Title: Shaping II: Circles

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

    // set a fill color with rgb
    vec3 color = vec3(0.);

    // visualize the distance from the center
    float dist = distance( st, vec2(0.5));
    color.r = 1.0-dist;
    
    // modulate the distance I
    vec2 dd = st - vec2(0.5);
    float angle = atan( dd.y / dd.x);
    //dist += cos( angle * 16. + u_time*PI)*0.04;
    //dist += cos( angle * 16. + u_time*PI) * (sin( angle * 24. + u_time*PI*2.) * 0.5 + 0.5) * 0.08;
    
    // modulate the distance II
    dist += cos( u_time * PI * 0.5 + st.x * 4. ) * .9;
    dist *= sin( u_time * 1. * PI + st.y * 2. ) * 2.5;
    
    // threshold the distance to create a circle
    color.rgb = vec3(step( dist, 0.4));
    
    gl_FragColor = vec4(color, 1.0);
}