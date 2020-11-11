// Author:
// Title: Polygon

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535
#define TWO_PI 6.283185307

// function by lewis lepton (https://www.youtube.com/watch?v=RhsmRjv_uj0)

float polygon( vec2 xy, float radius, float sides){
    
    vec2 pos = xy * 2.0 - 1.0;
    float angle = atan( pos.y / pos.x);
    float slice = TWO_PI / sides;
    
    return step( radius, cos(floor(0.5+angle/slice) * slice - angle) * length(pos));
}

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
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 st0 = st;
    st.x += snoise(st0*2.5+vec2(100., u_time*0.2))*0.1-0.05;
    st.y += snoise(st0.yx*2.5+vec2(u_time*0.0, 100.))*0.1-0.05;
    
    // show pixels inside a polygon
    float amt = polygon( st, 0.5, 5.5);
    
    vec3 color = vec3( amt, 0.2, 0.4);
    
    // visualize the values
    //color.rgb = mix( color.rgb, vec3(0.0, 1.0, 0.0), plot( st, color.r));
    
    gl_FragColor = vec4(color, 1.0);
}