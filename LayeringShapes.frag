// Author: Jeremy Rotsztain @ InterAccess
// Title: LayeringShapes

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PI 6.28318

float draw_rect(vec2 st, vec2 pos, float scale ){
    
    float s = 1.0 - scale - 0.25;
    
    vec2 xy = st + pos - vec2(0.5, 0.5);
    
    float r = step( s, xy.x) * step( s, 1.0-xy.x);
    r *= step( s, xy.y) * step( s, 1.0-xy.y);
    
    return r;
}

float draw_circle(vec2 st, vec2 pos, float scale ){
    
    vec2 xy = st + pos - vec2(0.5, 0.5);
    
    float r = distance( xy, vec2(0.5));
    
    return 1.0-step(scale*0.5, r);
}

float draw_polygon( vec2 xy, vec2 pos, float radius, float sides){
    
    pos =( xy + pos - 0.5)* 2.0 - 1.0;
    float angle = atan( pos.y / pos.x);
    float slice = TWO_PI / sides;
    
    return 1.0-step( radius, cos(floor(0.5+angle/slice) * slice - angle) * length(pos));
}

float draw_triangle( in vec2 p, vec2 pos, float scale )
{
    const float k = sqrt(3.0);
    
    p += pos - vec2(0.5);
    p = (p * 2.0 - 1.0);
	p.y += 0.220;
    
    //p += pos - vec2(0.5, 0.5);
    p.x = abs(p.x) - 1.0;
    p.y = p.y + 1.0/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0, 0.0 );
    float t = length(p)*sign(p.y);
    return step( scale, t);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    // blue background
    vec3 color = vec3(0.3, 0.0, 0.9);
    
    // draw 10 layers/shapes
    for(float i=0.; i<10.; i++){
        
        float speed = random(vec2(101.0, i*100.))*1.2+0.1;
        float el = u_time * speed;
        float tt = floor(u_time * speed);
        
        // position #1
        vec2 xy;
        xy.x = random(vec2(10.0, tt+i*100.))*0.8+0.1;
        xy.y = random(vec2(101.0, tt+i*100.))*0.8+0.1;
        
        // position #2
        vec2 xy2;
        xy2.x = random(vec2(10.0, (tt+1.)+i*100.))*0.8+0.1;
        xy2.y = random(vec2(101.0, (tt+1.)+i*100.))*0.8+0.1;
        
        // lerp from 1 to 2
        xy = mix( xy, xy2, fract(el));
        
        // scale #1 & #2
        float sc = random(vec2(201.0, tt+i*100.))*0.2+0.3;
        float sc2 = random(vec2(201.0, (tt+1.0)+i*100.))*0.2+0.3;
        
        // lerp from scale 1 to 2
        sc = mix( sc, sc2, fract(el));
        
        // random color
        vec3 fgcolor = vec3(0.0, 0.0, 0.0);
        fgcolor.r = random(vec2(301.0, i));
        fgcolor.g = random(vec2(401.0, i));
        fgcolor.b = random(vec2(501.0, i));
        
        // random shape
        float shape = random(vec2(101.0, i*100.));
        
        float alpha = 1.0;
        
        if( shape < 0.33){
            
             color =  mix( color, fgcolor, draw_rect( st, xy, sc)*alpha);
            
        } else if( shape < 0.66){
            
             color =  mix( color, fgcolor, draw_circle( st, xy, sc)*alpha);
            
        } else {
            
            color =  mix( color, fgcolor, draw_triangle( st, xy, sc)*alpha);
        }
    }

    gl_FragColor = vec4(color,1.0);
}