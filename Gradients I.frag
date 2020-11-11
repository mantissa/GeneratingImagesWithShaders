// Author:
// Title: Gradients I 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 colorA = vec3(1.000,0.600,0.405);
    vec3 colorB = vec3(0.390,0.225,1.000);
    vec3 color = mix( colorA, colorB, st.x);

    gl_FragColor = vec4(color,1.0);
}
