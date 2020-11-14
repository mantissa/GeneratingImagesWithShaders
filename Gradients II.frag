// Author: Jeremy Rotsztain
// Title: Gradients II 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// map value from one (input) range to a new (output range)
// for example [0, 1] => [500, 10000]

float map( float val, float inMin, float inMax, float outMin, float outMax){
    float pct = (val-inMin)/(inMax-inMin);
    pct = clamp( pct, 0.0, 1.0);
    return pct * (outMax-outMin) + outMin;
}

// create a 3 color gradient
// if value is between 0 & 50%, mix between colorA & color B
// if value is between 50 & 100%, mix between colorB & color C

vec3 gradient( vec3 colorA, vec3 colorB, vec3 colorC, float blend){
    if( blend < 0.5){
        float b = map( blend, 0.0, 0.5, 0.0, 1.0);
        return mix( colorA, colorB, b);
    } else {
        float b = map( blend, 0.5, 1.0, 0.0, 1.0);
        return mix( colorB, colorC, b);
    }
}
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // pick 3 colors
    vec3 colorA = vec3(0.390,0.225,1.000); 
    vec3 colorB = vec3(1.000,0.600,0.405);
    vec3 colorC = vec3(1.000,0.898,0.158);
    
    // use our custom 3-color gradient function based on the x value
    vec3 color = gradient( colorA, colorB, colorC, st.x);
    
    // gradient function based on the y value
    color = gradient( colorA, colorB, colorC, st.y);

    gl_FragColor = vec4(color,1.0);
}
