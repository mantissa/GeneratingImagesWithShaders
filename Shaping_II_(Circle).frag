// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Shaping II: Circles

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // set a fill color with rgb
    vec3 color = vec3(0.);

    // get the distance from the center (this is your virtual compass)
    // can also use length() or sqrt()
    float dist = distance( st, vec2(0.50));

    // modulate the distance I
    if( false){
        vec2 dd = st - vec2(0.5); // calculate xy distance
    	float angle = atan( dd.y / dd.x); // calculate the angle (in radians!) [-PI, PI]
        dist += cos( angle * 12. + u_time*PI)*0.030; // change freq & amp
    }
   
    // modulate the distance II
    if( false ){
    	vec2 dd = st - vec2(0.5);
    	float angle = atan( dd.y / dd.x); // calculate the angle (in radians)
    	dist += cos( angle * 16. + u_time*PI) * (sin( angle * 24. + u_time*PI*2.) * 0.5 + 0.5) * 0.08;
	}
    
    // modulate the distance III (~FM syth)
    if( false ){
    	dist += cos( cos( 0.2 * u_time * PI * 3.5 + st.x * 40. ) * PI * 0.2 + u_time * PI * 0.5 + st.x * 8. ) * .3;
    	dist *= sin( u_time * 1. * PI + st.y * 6. ) * 2.5;
    }
    
    // threshold the distance to create a circle
    float size = 0.2;
    // https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/step.xhtml
    color.rgb = vec3(1.0-step( size, dist));
    
    // w/soft edge
    color.rgb = vec3(1.0-smoothstep( 0.3, 0.4, dist));
    
    gl_FragColor = vec4(color, 1.0);
}
