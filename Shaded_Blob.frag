// Author: Jeremy Rotsztain 
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Shaded Blob

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float map( float val, float inMin, float inMax, float outMin, float outMax){
 	float pct = (val-inMin)/(inMax-inMin);
    pct = clamp( pct, 0.0, 1.0);
    return (pct * (outMax-outMin)) + outMin;
}


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
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float dist = distance( st, vec2(0.5));
    
    float cc = (snoise(st*2.+ vec2(100.4, 0.4*u_time))*0.5+0.5)*.5;
    
    float circ = step( dist, cc);
    
    float gr = pow(map( dist, 0., cc, 1.0, 0.0), 0.4);
    
    vec3 color = vec3(circ*0.2+gr*0.8);

    gl_FragColor = vec4(color,1.0);
}