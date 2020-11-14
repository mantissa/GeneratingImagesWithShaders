// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Polygon Grid

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535
#define TWO_PI 6.283185307

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

const int N = 5;

// inificent way to access array elements

vec2 getElement( in vec2[N] v, int index){
    for (int i=0; i<5; i++) {
        if (i == index) return v[i];
    }
}

// function by Inigo Quilez https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm

float sdPolygon( in vec2[N] v, in vec2 p )
{
    float d = dot(p-v[0],p-v[0]);
    float s = 1.0;
    int i=0, j=N-1;
    // for( int i=0, j=N-1; i<N; j=i, i++ )
    for( int i =0; i<5; i++){
        vec2 e = getElement(v, j) - getElement(v, i);
        vec2 w = p - v[i];
        vec2 b = w - e*clamp( dot(w,e)/dot(e,e), 0.0, 1.0 );
        d = min( d, dot(b,b) );
        bvec3 c = bvec3(p.y>=getElement(v, i).y,p.y<getElement(v, j).y,e.x*w.y>e.y*w.x);
        if( all(c) || all(not(c)) ) s*=-1.0;  
        j = i;
    }
    return s*sqrt(d);
}

vec2 circlePoint( float angle, float radius ){
    
    vec2 point;
    point.x = cos( angle ) * radius;
    point.y = sin( angle ) * radius;
    
    return point;
}

vec2 circleNoise( vec2 xy ){
    
    vec2 noise;
    noise.x = snoise(xy + vec2(0., u_time*0.2+100.));
    noise.y = snoise(xy + vec2(0., u_time*0.15+200.));
    
    noise *= 0.5 + 0.5;
    
    noise.x *= abs(noise.x);
    noise.y *= abs(noise.y);
    
    return noise;
}

float pointRotation( vec2 ij){
    return snoise(ij +  vec2(100.0, u_time*0.03)) * 0.1 *TWO_PI;
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 st0 = st;
    
    vec2 xy = st * 4.;
    vec2 ij = floor(xy);
    st = fract( xy );
    
    float radius = 0.6;
    float drift = 0.3;
    float rotation = snoise( ij + vec2(0.0, u_time*0.03))*TWO_PI;
    float angle = snoise(ij +  vec2(100.0, u_time*0.03)) * 2.5 *TWO_PI;;
    
    vec2 v0 = vec2(0.5) + circlePoint(pointRotation(ij+vec2(0))+rotation, radius) + circleNoise( ij + vec2(0.) ) * drift; 
	vec2 v1 = vec2(0.5) + circlePoint(pointRotation(ij+vec2(1))+rotation+TWO_PI/5., radius) + circleNoise( ij +vec2(2.) ) * drift; 
	vec2 v2 = vec2(0.5) + circlePoint(pointRotation(ij+vec2(2))+rotation+2.0*TWO_PI/5., radius) + circleNoise( ij +vec2(4.) ) * drift; 
	vec2 v3 = vec2(0.5) + circlePoint(pointRotation(ij+vec2(3))+rotation+3.0*TWO_PI/5., radius) + circleNoise( ij +vec2(8.) ) * drift; 
    vec2 v4 = vec2(0.5) + circlePoint(pointRotation(ij+vec2(4))+rotation+4.0*TWO_PI/5., radius) + circleNoise( ij +vec2(14.) ) * drift; 
    
    // add points
    vec2 poly[5]; 
    poly[0] = v0;
    poly[1] = v1;
    poly[2] = v2;
	poly[3] = v3;
    poly[4] = v4;
    
    // show pixels inside a polygon
    float amt = sdPolygon( poly, st);
    
    vec3 colorA = vec3(0.955,0.738,0.165);
    vec3 colorB = vec3(0.258,0.226,0.835);
    vec3 color = mix( colorA, colorB, sign(-amt)); //*vec3(0.700,0.195,0.583);

    
    gl_FragColor = vec4(color, 1.0);
}