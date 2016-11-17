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

The default set being displayed is the Mandelbrot set, where z<sub>0</sub> is set to be 0. Thus the Mandelbrot set is a 2D
representation of a 3D fractal surface.

A related collection of sets are the Julia sets, of which is generated by instead testing the covergence of a fixed c, with
varying z values from the complex plane. Thus the Mandelbrot set is the intersection at the origin on the complex plane with
the Julia sets following the series <br/> z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c.

To truly appeciate the duality of these two sets, this tool is created to explore the various Mandelbrot sets for different
initial z values, allowing, albeit gradual, exploration of the 5D fractal surface of the divergence of this beautiful series.
### Functionality & MVP  

With this Julia/Mandelbrot set generator, users will be able to:

- [ ] Choose initial values for z
- [ ] Zoom into the Mandelbrot sets

### Wireframes

This app will consist of a graph with an settings box. Users will be able to choose the z values in this box. Users can drag a rectangle on the graph to choose a zoom area.

![wireframes](wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be four scripts involved in this project:

`graph.js`: this script will handle the logic for drawing the Mandelbrot sets.

`Jgraph.js`: this script will handle the logic for drawing the Julia sets.

`rectangle.js`: this script will handle drawing zoom rectangles.

`complex.js`: this script will handle complex numbers.

`util.js`: this script will handle screen recalculation.

`mandelbrot.js`: this script will handle user inputs and calls graph to render.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js`.  Write a basic entry file and the bare bones of all 3 scripts outlined above. Goals for the day:

- Get a green bundle with `webpack`
- Set up `graph.js` to render individual pixels

**Day 2**: Produce a non-interactable Mandelbrot set by implementing the z^2+c algorithm for z = 0.  Goals for the day:

- Render Mandelbrot set

**Day 3**: Work on `mandelbrot.js` to create the settings box to allow users to change z inputs.  Goals for the day:

- create settings box
- inputs change graph render

**Day 4**: Add listeners to mouse click to implement zoom rectangles.  Goals for the day:

- Add zoom function to graph
- Zoom updates graph params to graph and triggers render


### Bonus features

- [ ] Add options for different different color schemes
- [ ] Add slice rotation
- [ ] Add Julia set graph
- [ ] Add quality/precision chooser