// Author: J. Rostsztain
// Title: Synthesis

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float reflect( float f){
 
    float i = f;
    
    if( floor(mod( i, 2.0)) == 0.0 )
        return 1.0 - fract(f);
    
    return fract(f);
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 mx = 3.141 * 2. * u_mouse / u_resolution.xy;
    
    st *= 4.;
    
    float tt = u_time * 0.3;
    
    float carrier = sin( mx.x + tt + st.x * 12. + sin(st.y * 6. + tt * 1.)*2.) * 2.;
    float freq = sin( mx.y + tt + st.y * 6. + sin(st.x * 6. + tt * 2.)*2. * carrier) * 3. ;
    freq = smoothstep( 0.0, 1., freq );

    vec3 color = vec3(0.);
    color = vec3(reflect(freq));

    gl_FragColor = vec4(color,1.0);
}