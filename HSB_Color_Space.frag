// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: HSB Color Space

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // set a fill color with hsb
    // store as vec3
    vec3 hsb;
    hsb.r = u_time * 0.2; // animate hue with time
    hsb.g = 1.0; // saturation
    hsb.b = 1.0; // brightness
    
    if( false ){
        
         // color wash
    	// same calculation as above with slight x-offset
    	hsb.r = u_time*0.2 + st.x*0.1; 
    }
   
    if( false ){
     
        // distanced based hue
    	float d = distance( st, vec2(0.5))*1.377;
    	hsb.r = d;
    
    	// animate hue over time
    	//hsv.r = sin(u_time*PI*0.2+d);
    }
    
    // use custom function to translate hsv to rgb color space
    vec3 color = hsb2rgb(hsb);
    
    gl_FragColor = vec4(color, 1.0);
}
