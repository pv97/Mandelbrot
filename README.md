## Mandlebrot sets

### Background

The core formula being investigated is is z_n+1 = z_n^2 + c where z and c are complex numbers.

To generate a Julia set, a fixed c is chosen, and for all values z in the complex number plane, the series is calculated to see whether the values escape the set and diverge to infinite. The graph is color coded according to the speed at which the values diverge, thus resulting in a 3D graph displayed on a 2D plane. To generate the Mandlebrot set, z is instead fixed to be 0 and values of c from the complex plane are tested for divergence.

This project aims to create a visualization tool to explore other initial z values for the Mandlebrot set, thus producing different slices of the 5 dimensional graph.

### Functionality & MVP  

With this Julia/Mandlebrot set generator, users will be able to:

- [ ] Choose initial values for z
- [ ] Zoom into the Mandlebrot sets

### Wireframes

This app will consist of a graph with an settings box. Users will be able to choose the z values in this box. Users can drag a rectangle on the graph to choose a zoom area.

![wireframes](wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be four scripts involved in this project:

`graph.js`: this script will handle the logic for drawing the Mandlebrot set.

`rectangle.js`: this script will handle drawing zoom rectangles.

`complex.js`: this script will handle complex numbers.

`util.js`: this script will handle screen recalculation.

`mandlebrot.js`: this script will handle user inputs and calls graph to render.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js`.  Write a basic entry file and the bare bones of all 3 scripts outlined above. Goals for the day:

- Get a green bundle with `webpack`
- Set up `graph.js` to render individual pixels

**Day 2**: Produce a non-interactable Mandlebrot set by implementing the z^2+c algorithm for z = 0.  Goals for the day:

- Render Mandlebrot set

**Day 3**: Work on `mandlebrot.js` to create the settings box to allow users to change z inputs.  Goals for the day:

- create settings box
- inputs change graph render

**Day 4**: Add listeners to mouse click to implement zoom rectangles.  Goals for the day:

- Add zoom function to graph
- Zoom updates graph params to graph and triggers render


### Bonus features

- [ ] Add options for different different color schemes
- [ ] Add slice rotation
