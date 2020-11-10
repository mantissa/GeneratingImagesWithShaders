// Author: J. Rostsztain
// Title: Reflections

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 ij = st * 8.;
    vec2 st2 = fract(ij);
    ij = floor(ij);
    
    if( mod(ij.x, 2.) == 0.){
     	st2.x = 1.0-st2.x;  
    }
    
    if( mod(ij.y, 2.) == 0.){
     	st2.y = 1.0-st2.y;  
    }

    vec3 color = vec3(0.);
    color = vec3(st2.x,st2.y,abs(sin(u_time))*1.);

    gl_FragColor = vec4(color,1.0);
}
