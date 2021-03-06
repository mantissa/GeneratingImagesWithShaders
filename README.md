
# GeneratingImagesWithShaders
![Workshop Header Image](https://interaccess.org/sites/default/files/styles/paralax/public/generating%20images%20with%20shaders.png "Workshop Header Image")
A GLSL Shader Programming Workshop at [InterAccess](https://interaccess.org/)\
November 17 & 19, 2020

# Outline
* Shader components: inputs, outputs, main() function
* RGB color & HSB color 
* Common functions, custom functions
* 2D shapes
* Animation
* Randomness & Noise
* Grids & Patterns

# Shaders
* Shaders are tiny programs that run on your computer’s GPU
* Used extensively in gaming to create color, lighting, materials, special effects.
* Some shaders can also create geometry and compute massive amounts of information
* Shaders commonly read/write pixels (rgb values) but can process different data types.
* Shaders are notoriously hard to learn and difficult to debug.
* Writing shaders in the Book of Shaders Editor 
* Writing shaders in c-like language called GLSL (OpenGL Shading Language)

# Artists Working with Shaders
* Natalia Stuyk https://www.instagram.com/nataliastuyk/
* Kynd https://www.instagram.com/kyndinfo/
* Andrew Benson https://pixlpa.com/
* Char Stiles https://www.instagram.com/charstiles/
* Sean Zellmer https://www.instagram.com/lejeunerenard/ 
* IQ https://www.shadertoy.com/view/wlsfRn

# Pipeline
![Fragment Shaders in the Pipeline (from open.gl)](https://open.gl/media/img/c2_pipeline.png "Fragment Shaders in the Pipeline")

# Platform
All of these shaders will run in the [Book of Shaders Editor](http://editor.thebookofshaders.com/). Just copy & paste!

# Day I: Tuesday
* [Hello World](Hello_World.frag)
* [Mouse Interaction](Mouse_Interaction.frag)
* Mixing Colors: [RGB Gradients I](Gradients_I.frag) 
* [HSB Color Space](HSB_Color_Space.frag) 
* [Functions & Curves I](Functions_&_Curves_I.frag)
* [Functions & Curves II](Functions_&_Curves_II.frag)
* Exercise I: Create a gradient using 3 different functions/curves. Play with frequency, amplitude & phase. If you're done, switch to a HSV gradient. Then, try additing time (u_time) into the mix.
* [Writing Custom Functions](Custom_Functions.frag)
* [Gradients II (Multi-Color)](Gradients_II.frag)
* [Synthesis I: Additive Synth](Additive_Synth.frag)
* [Synthesis II: FM Synthesis](FM_Synth.frag)
* Shaping: [Square](Shaping_I_(Square).frag) & [Circle](Shaping_II_(Circle).frag)
* Exercise II: experiment with creating different foreground & background colors for your shapes. Hint: use mix().

# Day II: Thursday
* Review and/or questions
* Exercise III: use shaping functions to modulate the canvas (st) and manipulate your circle or square.
* [Animation](Animation.frag)
* Exercise IV: Try animating the color of the shapes (i.e. lerp between or mix 2 colors)
* [Random Square I (RGB)](Random_Square_I_(RGB).frag)
* [Random Square II (Animated)](Random_Square_II.frag)
* [Random Colors](Random_Colors.frag)
* [Noise I (RGB)](Noise_I.frag)
* [Noise II (Modulated Circle)](Noise_II.frag)
* [Grids I](Grids_I.frag) & [Grids II (HSB)](Grids_II_(HSB).frag) 

# Advanced Examples
* [Noise I](Noise_I_(Live_Code).frag)
* [Shaded Blobs](Shaded_Blobs.frag)
* [Layering Shapes](Layering_Shapes.frag)
* [Polygon Grid](Polygon_Grid.frag)

# Helpers
* [Helpers](Helpers.glsl)

# Resources
* [Book of Shaders](https://thebookofshaders.com/) by Patricio Gonzales Vivo & Jen Lowe
* [IQ's 2D distance functions](https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm)
* [Shadershop](http://tobyschachman.com/Shadershop/) by Toby Schachman
* [GLSL Easing Functions (tweens)](https://github.com/glslify/glsl-easings)
* [Shaders in Processing, Three.js, openFrameworks](https://thebookofshaders.com/04/)

# Some Other Programming Tools/Environments
* [The Force](https://shawnlawson.github.io/The_Force/)
* [GlslViewer](https://github.com/patriciogonzalezvivo/glslViewer)
* [kodelife](https://hexler.net/products/kodelife) ($)
* [GLSL Sandbox](http://glslsandbox.com/)
* [ShaderToy](https://www.shadertoy.com/)

