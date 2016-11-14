## Mandlebrot sets

### Background

The core formula being investigated is is z_n+1 = z_n^2 + c where z and c are complex numbers.

To generate a Julia set, a fixed c is chosen, and for all values z in the complex number plane, we run z through the formula and see if the values escape the set and diverge to infinite. We color code the speed at which the values diverge, thus we have a 3D graph displayed on a 2D plane. To generate the Mandlebrot set, we instead fix z to be 0 and we take all values of c from the complex plane and see if the values escape the set.

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

In addition to the webpack entry file, there will be three scripts involved in this project:

`iterate.js`: this script will calculate the values/color of each pixel

`graph.js`: this script will handle the logic for drawing the graph by calling iterate.

`interface.js`: this script will handle user inputs and calls graph to render.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above. Goals for the day:

- Get a green bundle with `webpack`
- Set up `graph.js` to render individual pixels

**Day 2**: Produce a non-interactable Mandlebrot set by implementing the z^2+c algorithm for z = 0.  Goals for the day:

- Render Mandlebrot set

**Day 3**: Work on `interface.js` to create the settings box to allow users to change z inputs.  Goals for the day:

- create settings box
- inputs change graph render

**Day 4**: Add listeners to mouse click to implement zoom rectangles.  Goals for the day:

- Add zoom function to graph
- Zoom updates graph params to graph and triggers render


### Bonus features

- [ ] Add options for different different color schemes
- [ ] Add slice rotation
