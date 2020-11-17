// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Gradients I 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
    
void main() {
    
    // normalize our canvas
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // fix for aspect ratio
    st.x *= u_resolution.x/u_resolution.y;
    
    // set color #1 manually (peach)
    vec3 colorA = vec3(1.000,0.600,0.405);
    
    // pick color #2 manually (blue)
    vec3 colorB = vec3(0.390,0.225,1.000);
    
    // use our x coordinate to 'mix' between the two colors
    // arguments: vec3, vec3, float
    vec3 color = mix( colorA, colorB, st.x);
    
    // change the 'space' where the gradient changes
    //color = mix( colorA, colorB, step( 0.5, st.x));
    //color = mix( colorA, colorB, smoothstep( 0.184, 1., st.x));

    gl_FragColor = vec4(color,1.0);
}
