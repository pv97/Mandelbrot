## Mandelbrot sets

[Link][link]

[link]: https://pv97.github.io/Mandelbrot/

### Background

The core series being investigated is is z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c where z and c are complex numbers.
The graphs displayed lie on the complex plane of a+bi, which represents the values of z and c chosen for the series, respectively.
The to construct the graph on the left, we pair the coordinates of the left graph (z<sub>0</sub>) with one fixed point from the graph from the right (c).
The to construct the graph on the right, we pair the coordinates of the right graph (c) with one fixed point from the graph from the left (z<sub>0</sub>).
We are interested in how fast the series z<sub>n</sub> diverges with chosen initial z<sub>0</sub> and c, so we color the
graph with white representing no divergence and black representing rapid divergence.

The graph being displayed on the left is the Mandelbrot set, where z<sub>0</sub> is set to be 0 by default. Thus the Mandelbrot set is a 2D
representation of a 3D fractal surface.

A related collection of sets displayed on the right are the Julia sets, of which is generated by instead testing the convergence of a fixed c, with
varying z values from the complex plane. Thus the Mandelbrot set is the intersection at the origin on the complex plane with
the Julia sets following the series <br/> z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c.

To truly appeciate the duality of these two sets, this tool is created to explore the various Mandelbrot and Julia sets for different
initial z and c values, allowing, albeit gradual, exploration of the 5D fractal surface of the divergence of this beautiful series.

### Instructions

Click and drag to draw a rectangle that you wish to zoom into. Click on either graph to change the input for the other graph. Change settings in the settings box as desired. Look up [Mandelbrot set][mandel] and [Julia sets][julia]!

[mandel]: https://en.wikipedia.org/wiki/Mandelbrot_set
[julia]: https://en.wikipedia.org/wiki/Julia_set

### Technologies Used

Vanilla JavaScript with canvas, webpack to inject JavaScript into base HTML file.

### Features

####Graphs

The two graphs are rendered pixel by pixel using their coordinates on the a + bi axis as input into the recursive series. The divergence of the series is scored
to determine pixel rgb values. The pixels are rendered by iterating over the x and y resolution and setting their rgb values via imageData in canvas.

![logo.png](http://res.cloudinary.com/tlcoy4e3/image/upload/v1479408454/main_ucudv6.png)

####Zooming

On mouse drag, a rectangle is rendered displaying the area that will be zoomed once the mouse is let go. This is accomplished by saving the first vertex when
the mouse click is held down and the second vertex when the mouse click is let go. The new x y ranges are calculated and then a re-render is called. Upon zooming many times, users will notice that the graphs become pixelated. This is due to the fact that, with default JavaScript, we have a limited number of decimal places we can conduct calculations over. Once we run out of decimal places we can no longer calculate at the required precision, and round off errors will occur. This leads to many neighborhoods of coordinates resulting in the same output.

####Clicking

If the distance between the two vertexes from zooming is too small, ie: 5 pixels, the action will instead set the z<sub>0</sub> and c values respectively. This affects the opposite graph, thus calling a re-render on the other graph.

####Changing Colors

A few color schemes has been added to the application. These color schemes are callbacks given to the render function so different rgb values can be calculated from giving different functions. These functions need to be continuous and within 0-255, thus the color schemes were constructed mainly from using trigonometric functions.

####Changing Rendering Precision

Choosing different levels of precision tells the renderer to skip the calculation of n number of pixels. In this case, we skip none for 100%, every other pixel for 50% and 2 pixels for every calculated pixels for 33%.

###Future Direction

####Saving

Allow users to save pictures to desktop.

####Custom color schemes

Implement a REPL that will allow users to create their own color schemes.
