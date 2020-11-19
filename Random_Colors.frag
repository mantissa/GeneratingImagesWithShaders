// Author: Jeremy Rotsztain 
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Random Color

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

vec3 randomColor( float f ){
    if( f < 0.2){
        return vec3(0.233,0.275,0.995); // blue
    } else if( f < 0.4){
        return vec3(0.975,0.957,0.131); // yellow
    } else if( f< 0.6){
        return vec3(0.890,0.000,0.890); // pink
    } else if( f < 0.8){
        return vec3(0.386,0.780,0.172); // green
    } 
    
    return vec3(1.000,0.605,0.184); // orange
}
    
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // animate over time
    //st.y -= 0.07*u_time;
    
    // multiply grid x 8 & then round up
    // 1.2 => 2.0
    // 8.9 => 9.0
    vec2 grid = st * vec2(8.); 
    grid = floor( grid );

    // random # based on the cell id
    float cellR = random( grid )*1.;
    
    // random speed based on cell index
    float cellSpeed = random( grid + vec2(200.) )*3.;
    
    // random number & next random number
    float cellRand = random( grid + vec2(0, floor(u_time*cellSpeed+cellR)) );
    float cellRand2 = random( grid + vec2(0., floor(u_time*cellSpeed+1.+cellR)) );
    
    // random color & next random color
    vec3 color = randomColor( cellRand );
    vec3 color2 = randomColor( cellRand2 );
    
    // mix the current & next random color
    color = mix( color, color2, smoothstep(0.2, 0.6, fract(u_time*cellSpeed+cellR)));

    gl_FragColor = vec4(color,1.0);
}
