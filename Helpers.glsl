
#define PI 		3.1415926535
#define TWO_PI	6.283185307

// 1-dimensional graphing 

float plot( vec2 xy, float amt){
    if( amt > xy.y - 0.006 && amt < xy.y + 0.006) return 1.0;
    return 0.;
}

// rgb & hsb conversions

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// random number generator (2D)

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

vec4 grid( vec2 xy, float size ){

	vec2 xy0 = xy * dimensions;
    
    return fract(xy0);
}

vec2 gridWithReflections( vec2 xy, vec2 dimensions){
    
    vec2 xy0 = xy;
    xy *= dimensions;
    
    vec2 ij = floor(xy);
    
    if( mod(ij.x, 2.) == 0.){
     	xy.x = 1.0-xy.x;  
    }
    
    if( mod(ij.y, 2.) == 0.){
     	xy.y = 1.0-xy.y;  
    }
    
    return fract(xy);
}

// just like processing!!

float map( float val, float inMin, float inMax, float outMin, float outMax){
    float pct = (val-inMin)/(inMax-inMin);
    pct = clamp( pct, 0.0, 1.0);
    return pct * (outMax-outMin) + outMin;
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

// 2D simplex noise (signed: [-1,-1])

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

// 2D simplex noise (unsigned: [0, 1])

float snoiseu( vec2 xy){
    
    return snoise( xy ) * 0.5 + 0.5;
}

// draw a rectangle @ xy

float rectangle( vec2 xy, float size );
