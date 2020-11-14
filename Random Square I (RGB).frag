// Author: Jeremy Rotsztain @ InterAccess
// Title: Random I

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float rect( vec2 xy ){
    
    float r = step( 0.2, xy.x ) * step( 0.2, 1.0-xy.x );
    r *= step( 0.2, xy.y ) * step( 0.2, 1.0-xy.y );
    
    return  r;
}
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // random background color
    vec3 bgcolor = vec3(0.);
    bgcolor.r = random(vec2(0., 0.));
    bgcolor.g = random(vec2(0., 1.));
    bgcolor.b = random(vec2(0., 2.));
    
    // random foreground color
    vec3 fgcolor = vec3(0.);
    fgcolor.r = random(vec2(1., 0.));
    fgcolor.g = random(vec2(1., 1.));
    fgcolor.b = random(vec2(1., 2.));
    
    // mix the two using a rectangle function
    vec3 color = mix( bgcolor, fgcolor, rect(st));

    gl_FragColor = vec4(color,1.0);
}
