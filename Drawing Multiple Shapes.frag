// Author: Jeremy Rotsztain
// Workshop: Generating Images with Shaders @ InterAccess, 2020
// Title: Drawing Multiple Shapes

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.1415926535

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void drawSphere( vec2 st, vec2 xy, float size, vec3 color, inout vec3 canvas){
    
    //st.x += cos( xy.y * 4.+ size + u_time + st.y * PI * 6.) * 0.15;
    //st.y += sin( xy.x * 4. + size + u_time + st.x * PI * 6.) * 0.15;
    
    float d = distance( st, xy);
    
    if( d < size){
        
        canvas.rgb = color;
    }
}

void main() {
    
    // get the xy coordinate & normalize to [0, 1] range
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    

    vec3 color = vec3(0.1, 0.2, 0.4);
    
    vec2 xy;
    float sz = 0.35;
    
    xy.x = 0.5 + cos( u_time *  PI * 0.4) * 0.15;
    xy.y = 0.5 + sin( u_time *  PI * 0.4) * 0.15;
    //sz = sin( u_time *  PI * 0.5) * 0.2 + 0.22;
    drawSphere( st, xy, sz, vec3(1.0, 0.0, 0.0), color);
    
    if( false){
        
        xy.x = 0.5 + cos( 0.2 + u_time *  PI * 0.15) * 0.25;
        xy.y = 0.5 + sin( 0.2 + u_time *  PI * 0.15) * 0.25;
        sz = sin( 0.2 + u_time *  PI * 0.15) * 0.25 + 0.275;
        drawSphere( st, xy, sz, vec3(0.0, 0.3, 1.0), color);

        xy.x = 0.5 + cos( 0.8 +u_time *  PI * 0.35) * 0.3;
        xy.y = 0.5 + sin( 0.8 +u_time *  PI * 0.35) * 0.3;
        sz = sin( 0.8 + u_time *  PI * 0.35) * 0.25 + 0.275;
        drawSphere( st, xy, sz, vec3(1.0, 1.0, 0.0), color);

        xy.x = 0.5 + cos( 1.7 + u_time *  PI * 0.25) * 0.4;
        xy.y = 0.5 + sin( 1.7 + u_time *  PI * 0.25) * 0.4;
        sz = sin( 1.7 + u_time *  PI * 0.25) * 0.25 + 0.275;
        drawSphere( st, xy, sz, vec3(0.1, 0.6, 0.2), color);
    }
    
    
     /**/
    
    gl_FragColor = vec4(color, 1.0);
}