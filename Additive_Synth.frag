// Author: Jeremy Rotsztain 
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Additive Synth

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14156
#define TWO_PI 6.28318

float additive_synth( float x, float time ){
    
    float br = sin( x * TWO_PI + time ) * 0.5;
    br += sin(  x * TWO_PI * 2.3212 + time * 3. ) * 0.25;
    br += sin(  x * TWO_PI * 4.3 + time * 4.25 ) * 0.125;
    br += sin(  x * TWO_PI * 8.15 + time * 7.5 ) * 0.0625;
    br = smoothstep(-1., 1., br);
    
    return br;
}

float map( float val, float inMin, float inMax, float outMin, float outMax){
    float pct = (val-inMin)/(inMax-inMin);
    pct = clamp( pct, 0.0, 1.0);
    return pct * (outMax-outMin) + outMin;
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    if( false ){
		// modulate the canvas too
        // add layers of sine waves with different frequencies & amplitudes
        // frequencies can be applied to time & to space (the canvas)
        st.y += sin( st.x * TWO_PI + u_time) * 0.01;
        st.y += sin( st.x * TWO_PI * 3.1 + u_time * 2.) * 0.005;
        st.y += sin( st.x * TWO_PI * 2.33 + u_time * 2.34) * 0.0025;
        //st.y *= 1.0 + sin( st.x *0.2 + st.y * TWO_PI * 1.33 - u_time * 1.34) * 0.5;
        //st.y *= 1.0 + sin( st.x *0.4 + st.y * TWO_PI * 2.303 + u_time * 2.46) * 0.25;
    }
	
	// start with black
    vec3 color = vec3(0.0);
    
    // add layers of sine waves with different frequencies & amplitudes
    // frequencies can be applied to time & to space (the canvas)
    color.r = sin( st.y * TWO_PI - u_time ) * 0.5;
    //color.r += sin(  st.y * TWO_PI * 2.3 - u_time * 3. ) * 0.25;
    //color.r += sin(  st.y * TWO_PI * 4.12 - u_time * 4.25 ) * 0.125;
    //color.r += sin(  st.y * TWO_PI * 8.93 - u_time * 7.5 ) * 0.0625;
    
    // remap [-1, 1] => [0, 1] with linear interpolation
    color.r = map(color.r, -0.9375, 0.9375, 0.0, 1.);
    //color.r = smoothstep(-1., 1., color.r); // or with cubic interpolation
    
    // apply 'additive synth' to green & blue (with variation)
    if( false ){
        color.g = additive_synth( st.y*1.2, -u_time* 0.6);
    	color.b = additive_synth( st.y*3.12, -u_time* 1.2);
    }
    

    gl_FragColor = vec4(color,1.0);
}
