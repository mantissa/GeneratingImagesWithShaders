// Author: Jeremy Rotsztain 
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Animation

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float map( float val, float inMin, float inMax, float outMin, float outMax){
    float pct = (val-inMin)/(inMax-inMin);
    pct = clamp( pct, 0.0, 1.0);
    return pct * (outMax-outMin) + outMin;
}

float rect( vec2 xy,  vec2 pos, float size ){
    
    // offset to center
    xy -= (pos - vec2(0.5));
    size = map( size, 0.0, 1.0, 0.5, 1.);
    
    // find values within boundaries
    float r = step( (1.0-size), xy.x ) * step( (1.0-size), 1.-xy.x );
    r *= step( (1.0-size), xy.y ) * step( (1.0-size), 1.-xy.y );
    
    return  r;
}
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // start & end positions 
    vec2 pos1 = vec2(0.0, 0.5);
    vec2 pos2 = vec2(1.0, 0.5);
    
    // interpolate between positions using mix
    // @ 0., result is pos1
    // @ 1., result is pos2
    // @ 0.5, result is 50% of pos1 & 50% of pos2
    float lerp = fract(u_time*0.2);
    //lerp = pow( fract(u_time*0.2), 3.); // accellerating
    //lerp = pow( fract(u_time*0.2), 0.7); // decellerating
    //lerp = smoothstep(0.1, 0.9, fract(u_time*0.2)); // accellerate & decellerate
    
    vec2 pos = mix( pos1, pos2, lerp);
    
    // calculate square @ dynamic position
    float rr = rect(st, pos, 0.4);
    
    // modest blue square
    vec3 color = vec3(0, 0, rr);

    gl_FragColor = vec4(color,1.0);
}
