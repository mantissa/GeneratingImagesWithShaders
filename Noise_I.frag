// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Noise I

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Simplex 2D noise

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float snoiseu( vec2 xy){
    return snoise( xy ) * 0.5 + 0.5;
}

float plot( vec2 xy, float amt){
    if( amt > xy.y - 0.02 && amt < xy.y + 0.02) return 1.0;
    return 0.;
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // our canvas color
    vec3 color = vec3(0.);
    
    // red with 1D noise (unsigned)
    float freq = 1.0;
    color.r = snoiseu( vec2(st.x * freq, 0.) );
    //color.r = snoiseu( vec2(st.x * freq, st.y * freq) );
    //color.r = snoiseu( vec2(st.x * freq, st.y * freq + u_time*0.3) );
    
    // plot the noise
    color = mix( color, vec3(0., 1.0, 0.0), plot( st, color.r ));
    
    gl_FragColor = vec4(color,1.0);
}
