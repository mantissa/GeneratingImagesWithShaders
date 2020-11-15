// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: FM Synthesis

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1416

// FM Syntesis: "is a form of sound synthesis whereby the frequency of a waveform is changed by modulating its frequency with a modulator. The frequency of an oscillator is altered "in accordance with the amplitude of a modulating signal". -Wikipedia

// https://cdn.lynda.com/video/189730-50-635511592392286831_338x600_thumb.jpg

float fmsynth(vec2 xy, float t, float carrierf, float modf, float modindex ){
    
    float modulator = sin( xy.x * PI * modf + t  ) * modindex;
    
    return sin( xy.x * PI * 2. * (carrierf + modulator) + t  ) * 0.5 + 0.5;
}

float plot( vec2 xy, float amt, float thickness ){
    if( amt > xy.y - thickness && amt < xy.y + thickness) return 1.0;
    return 0.;
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    st.x += 0.5;

    // slower time
    float tt = u_time * 0.7;
    
    if( false ){
    	// animate the grid, moving upwards
    	st.y -= tt * 0.6;
    
    	// offset the on the x axis (modulated)
    	st.x += sin(st.y*PI*1.3+tt)*0.08;
    }
    
    // FM synthesis 'carrier freq' 
    float carrier = 6.8;

    // FM sythesis 'modulator ratio'
    float modulator = sin( st.x * PI * 2. * 1.4 + tt  ) *2.3;

    // create complex wave by adding variable output (from other sine wave) into sin wave
    // remap wave from [-1, 1] => [0, 1]
    float freq = sin( st.x * PI * 1. * (carrier + modulator) + tt  ) * 0.5 + 0.5;

    // other waves for G & B
    float freq2 = 0.; 
    float freq3 = 0.; 
    
    if( false ){
        freq2 = fmsynth(st*0.6, tt*1.5, 3.0, 4.0, 2.3);
        freq3 = fmsynth(st*0.3, tt*2., 13.0, 8.0, 16.0);
    }

    vec3 color = vec3(0.);
    color = vec3(freq, freq2, freq3);
    
    // plot it
    color = mix( color, vec3(0,1, 0), plot(st, freq, 0.05));

    gl_FragColor = vec4(color,1.0);
}
