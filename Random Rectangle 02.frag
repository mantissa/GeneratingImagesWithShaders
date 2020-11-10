// Author:
// Title: Random

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float rect( vec2 xy, float size ){
    
    float r = step( (1.0-size), xy.x ) * step( (1.0-size), 1.-xy.x );
    r *= step( (1.0-size), xy.y ) * step( (1.0-size), 1.-xy.y );
    
    return  r;
}
    
void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float randt = ceil(u_time);

    vec3 bgcolor = vec3(0.);
    bgcolor.r = random(vec2(randt+0., 0.));
    bgcolor.g = random(vec2(randt+20., 1.));
    bgcolor.b = random(vec2(randt+401., 2.));
    
    vec3 fgcolor = vec3(0.);
    fgcolor.r = random(vec2(randt+19., 0.));
    fgcolor.g = random(vec2(randt+17., 1.));
    fgcolor.b = random(vec2(randt+18., 2.));
    
    float sz = random(vec2(randt+18., 3.))*0.4+0.6;
    float sz2 = random(vec2((randt+1.)+18., 3.))*0.4+0.6;
    float szLerp = mix( sz, sz2, smoothstep(0.1, 0.9, fract(u_time)));
    
    vec3 color = mix( bgcolor, fgcolor, rect(st, szLerp));
    
   // if( sz < 0. ) color = vec3(1.0, 0.0, 0.0);

    gl_FragColor = vec4(color,1.0);
}
