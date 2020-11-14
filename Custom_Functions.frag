// Author: Jeremy Rotsztain 
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Custom Functions

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// multiply one value by another

float multiply( float val1, float val2){
    
    return val1 * val2;
}

// just like processing!
// map value from one (input) range to a new (output range)
// for example [0, 1] => [500, 10000]

float map( float val, float inMin, float inMax, float outMin, float outMax){
    // calculate value as percentage of incoming range 
    float pct = (val-inMin)/(inMax-inMin);
    // clamp between 0% and 100% (optional)
    pct = clamp( pct, 0.0, 1.0);
    // mutliply to outgoing range
    return pct * (outMax-outMin) + outMin;
}
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // brightness as a function of the x-coordinate
    float br = st.x;
    
    // darken (multiply by 50%)
    // brightness goes from [0, 0.5]
    br = multiply( br, 0.5);
    
    // brighten (mutiply by 200%)
    // brightness goes from [0, 2] (out of range)
    //br = multiply( br, 2.0);
    
    // remap from range [0, 1] => [0.8, 1.0]
    // 0 => 0.8
    // 1 => 1.0
    // 0.5 => 0.9
    //br = map( br, 0.0, 1.0, 0.8, 1.0);
    
    vec3 color = vec3(br);

    gl_FragColor = vec4(color,1.0);
}
