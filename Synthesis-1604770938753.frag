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

#define PI 3.1416

float fmsynth(vec2 xy, float t, float carrierf, float modf, float modindex ){
    
    float modulator = sin( xy.x * PI * modf + t  ) * modindex;
    //float carrier3 = sin( tt * 3.1 + st.x * 12.2 *1. ) * 4.1;
    return sin( xy.x * PI * 2. * (carrierf + modulator) + t  ) * 0.5 + 0.5;
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    st.x += 0.5;
    
    float tt = u_time * 0.7;
    
    st.y -= u_time * 0.4;
    
    st.x += sin(st.y*PI*1.3+tt)*0.08;
    
    
    
    
    
    float carrier = 20.8;
    float modulator = sin( st.x * PI * 2. * 2. + tt  ) * 1.3;
    //float carrier3 = sin( tt * 3.1 + st.x * 12.2 *1. ) * 4.1;
    float freq = sin( st.x * PI * 2. * (carrier + modulator) + tt  ) * 0.5 + 0.5;
    
    float freq2 = fmsynth(st*0.6, tt*1.5, 3.0, 4.0, 2.3);
    float freq3 = fmsynth(st*0.3, tt*2., 13.0, 8.0, 16.0);
    

    vec3 color = vec3(0.);
    color = vec3(freq, freq2, freq3);

    gl_FragColor = vec4(color,1.0);
}