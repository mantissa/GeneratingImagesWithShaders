// Author:
// Title: Polygon

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535
#define TWO_PI 6.283185307

float polygon( vec2 xy, float radius, float sides){
    
    vec2 pos = xy * 2.0 - 1.0;
    float angle = atan( pos.y / pos.x);
    float slice = TWO_PI / sides;
    
    return step( radius, cos(floor(0.5+angle/slice) * slice - angle) * length(pos));
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // show pixels inside a polygon
    float amt = polygon( st, 0.5, 6.);
    
    vec3 color = vec3( amt, 0.2, 0.4);
    
    // visualize the values
    //color.rgb = mix( color.rgb, vec3(0.0, 1.0, 0.0), plot( st, color.r));
    
    gl_FragColor = vec4(color, 1.0);
}