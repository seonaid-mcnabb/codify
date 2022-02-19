// import React, { useState, useEffect } from "react";
// import "./Whiteboard.css";
// import Toolbar from "./toolbar";
// import rough from "roughjs/bundled/rough.esm";

// const gen = rough.generator(); // generator allows user to create a drawable object - to be used for shapes later with .draw method

// const midPointBtw = (p1, p2) => {
//   return {
//     x: p1.x + (p2.x - p1.x) / 2,
//     y: p1.y + (p2.y - p1.y) / 2,
//   };
// };

// export const adjustElementCoordinates = (element) => {
//   const { type, x1, y1, x2, y2 } = element;
//   if (x1 < x2 || (x1 === x2 && y1 < y2)) {
//     return { x1, y1, x2, y2 };
//   } else {
//     return { x1: x2, y1: y2, x2: x1, y2: y1 };
//   }
// };

// function Whiteboard() {
//   const [elements, setElements] = useState([]); // shape state that is initially empty, stores coords of lines
//   const [isDrawing, setIsDrawing] = useState(false); // drawing state, initially false, becomes true when mouse is held and drawing starts, false again when it finishes

//   const [points, setPoints] = useState([]);
//   const [path, setPath] = useState([]);

//   const [action, setAction] = useState("none"); // state to determine whether user is sketching or drawing shapes
//   const [toolType, setToolType] = useState("pencil"); // state to determine which tool is being used by user - pencil, square, circle, line. pencil is default
//   const [penColour, setPenColour] = useState("#000000"); // default pen colour = black
//   const [fillColour, setFillColour] = useState("#ffffff"); // default shape fill = white
//   const [lineWidth, setLineWidth] = useState(1); //default pen thickness = 1
//   const [selectedElement, setSelectedElement] = useState(null);

//   const createElement = (id, x1, y1, x2, y2) => { // returns coordinates based on position of cursor and element to be drawn
//     if (toolType === "line") {
//       // const line = gen.line(400, 500, 600, 500); // (x1, y1, x2, y2)
//       const roughEl = gen.line(x1, y1, x2, y2, {stroke: penColour, strokeWidth: lineWidth});
//       return { id, x1, y1, x2, y2, roughEl };
//     } else if (toolType === "square") {
//       // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
//       const roughEl = gen.rectangle(x1, y1, x2 - x1, y2 - y1, { roughness: 0.5, fill: fillColour, stroke: penColour, strokeWidth: lineWidth });
//       return { id, x1, y1, x2, y2, roughEl };
//     } else if (toolType === "circle") {
//       // const circle = gen.circle(500, 300, 200); // (x1, y1, diameter), diameter = 2 * (x2-x1 + y2-y1)
//       const roughEl = gen.circle(x1, y1, 2 * (x2 - x1 + y2 - y1), { roughness: 0.5, fill: fillColour, stroke: penColour, strokeWidth: lineWidth });
//       return { id, x1, y1, x2, y2, roughEl };
//     }
//   };

//   useEffect(() => {
//     const canvas = document.getElementById("canvas");
//     const context = canvas.getContext("2d"); // gets canvas's context = what the drawings will be rendered on. 2d = creation of object with 2d rendering context
//     context.lineCap = "round";
//     context.lineJoin = "round";

//     context.save();

//     const drawpath = () => {
//       path.forEach((stroke, index) => {
//         context.beginPath();

//         stroke.forEach((point, i) => {
//           var midPoint = midPointBtw(point.clientX, point.clientY);

//           context.quadraticCurveTo(
//             point.clientX,
//             point.clientY,
//             midPoint.x,
//             midPoint.y
//           );
//           context.lineTo(point.clientX, point.clientY);
//           context.stroke();
//         });
//         context.closePath();
//         context.save();
//       });
//     };

//     const roughCanvas = rough.canvas(canvas);

//     if (path !== undefined) drawpath();

//     elements.forEach(({ roughEl }) => {
//       context.globalAlpha = "1";
//       roughCanvas.draw(roughEl);
//     });

//     return () => {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//     };
//   }, [elements, path]); // makes sure there is a dynamic change visible on the canvas board

//   const updateElement = (index, x1, y1, x2, y2, toolType) => {
//     const updatedElement = createElement(index, x1, y1, x2, y2, toolType);
//     const elementsCopy = [...elements];
//     elementsCopy[index] = updatedElement;
//     setElements(elementsCopy);
//   };

//   const handleMouseDown = (e) => { // check if tool is pencil or something else, draws on canvas and stores path of cursor in points state. new element created for desired shape and saved in element state
//     console.log(toolType);
//     const { clientX, clientY } = e;
//     const canvas = document.getElementById("canvas");
//     const context = canvas.getContext("2d");

//     const id = elements.length;
//     if (toolType === "pencil") {
//       setAction("sketching"); // action saved which helps when making comparisons for building tools
//       setIsDrawing(true);

//       const transparency = "1.0";
//       const newEle = {
//         clientX,
//         clientY,
//         transparency,
//       };
//       setPoints((state) => [...state, newEle]);

//       context.lineCap = 5;
//       context.strokeStyle = penColour;
//       context.lineWidth = lineWidth;
//       context.moveTo(clientX, clientY);
//       context.beginPath();
//     } else {
//       setAction("drawing");
//       const element = createElement(id, clientX, clientY, clientX, clientY);

//       setElements((prevState) => [...prevState, element]);
//       setSelectedElement(element);
//       console.log(elements);
//     }
//   };

//   const handleMouseMove = (e) => {
//     const canvas = document.getElementById("canvas");
//     const context = canvas.getContext("2d");
//     const { clientX, clientY } = e;

//     if (action === "sketching") { // comparisons/different tools based on actions
//       if (!isDrawing) return;

//       const transparency = points[points.length - 1].transparency;
//       const newEle = { clientX, clientY, transparency };

//       setPoints((state) => [...state, newEle]);
//       var midPoint = midPointBtw(clientX, clientY);
//       context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y); // quadratic curve = inbuilt function to create smoother curves
//       context.lineTo(clientX, clientY);
//       context.stroke();
//     } else if (action === "drawing") {
//       const index = elements.length - 1;
//       const { x1, y1 } = elements[index];

//       updateElement(index, x1, y1, clientX, clientY, toolType); // ensures last coords stored are the ones where the mouse stops moving
//     }
//   };
//   const handleMouseUp = () => { // stores end coords for shape and stroke so the final element is rendered on board
//     if (action === "drawing") {
//       const index = selectedElement.id;
//       const { id, type, strokeWidth } = elements[index];
//       const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
//       updateElement(id, x1, y1, x2, y2, type, strokeWidth);
//     } else if (action === "sketching") {
//       const canvas = document.getElementById("canvas");
//       const context = canvas.getContext("2d");
//       context.closePath();
//       const element = points;
//       setPoints([]); // stores current points 
//       setPath((prevState) => [...prevState, element]);
//       setIsDrawing(false);
//     }
//     setAction("none");
//   };
//   return (
//     <div>
//       <div>
//         {/* toolbar that allows user to change drawing/sketching tool, pen colour, add text, etc. */}
//         <Toolbar setToolType={setToolType} setPenColour={setPenColour} setFillColour={setFillColour} /> 
//       </div>
//       <canvas
//         id="canvas"
//         className="App"
//         width={window.innerWidth}
//         height={window.innerHeight}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         Canvas
//       </canvas>
//     </div>
//   );
// }

// export default Whiteboard;