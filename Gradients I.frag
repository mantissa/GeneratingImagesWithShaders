// Author: Jeremy Rotsztain
// Title: Gradients I 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
    
void main() {
    
    // calculate our canvas
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // set color #1 (manually)
    vec3 colorA = vec3(1.000,0.600,0.405);
    
    // pick colro #2 (manually)
    vec3 colorB = vec3(0.390,0.225,1.000);
    
    // use our x coordinate to 'mix' between the two colors
    // arguments: vec3, vec3, float
    vec3 color = mix( colorA, colorB, st.x);

    gl_FragColor = vec4(color,1.0);
}
