// Author:
// Title: Grids & Patterns

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535
#define TWO_PI 6.283185307

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 xy = st;
    xy *= 4.;
    vec2 cell = ceil( xy);
    vec2 pct = fract(xy);
    
    //if( mod(cell.x, 2.) == 0.){
        //st.y += 0.125;
        st.y += random(vec2(cell.x, 0.5));
    //}
    
    //st.y -= u_time * 0.05;
    st.y -= u_time * (random( vec2(cell.x, 10.))*0.15+0.025);
    
    xy = st;
    xy *= 4.;
    cell = ceil( xy);
    pct = fract(xy);
    
    vec3 color = vec3(0.1, 0.2, 0.4);
    color.r = pct.r;
    color.g = pct.g;
    
    if( true){
        float dist = distance( pct, vec2(0.5));
        float scale = 0.4;
        scale = cos( random(vec2(cell.x/4., cell.y/4.)) * TWO_PI + u_time) * 0.225 + 0.25;
    	color = vec3(step(dist, scale));
    }
    
    
    gl_FragColor = vec4(color, 1.0);
}