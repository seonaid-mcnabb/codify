import React, { useState, useLayoutEffect, useEffect } from "react";
import "./Whiteboard.css";
import Toolbar from "./toolbar";
import rough from "roughjs/bundled/rough.esm";
import { getStroke } from 'perfect-freehand';
import { HuePicker } from "react-color";

const generator = rough.generator(); // generator allows user to create a drawable object - to be used for shapes later with .draw method


const nearPoint = (x, y, x1, y1, name) => { // function checks if mouse is near the corner/end of the shape for resizing
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null; // mouse is subtracting shape sides and checking if they're near each other, < 5 is the offset, .abs deals with positive and negative digits
}

const positionWithinElement = (x, y, element) => {
    const { type, x1, y1, x2, y2 } = element;
    if (type === "square") {
        const topLeft = nearPoint(x, y, x1, y1, "tl"); // tl = topleft
        const topRight = nearPoint(x, y, x2, y1, "tr");
        const bottomLeft = nearPoint(x, y, x1, y2, "bl");
        const bottomRight = nearPoint(x, y, x2, y2, "br");
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null; // returns true if mouse is within the square
        return topLeft || topRight || bottomLeft || bottomRight || inside; // return what is found

    } else if (type === "line") {
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c)); // if c is between a + b, and equal distance between a + c, and b + c
        const start = nearPoint(x, y, x1, y1, "start"); // finds start of line
        const end = nearPoint(x, y, x2, y2, "end"); // finds end of line
        const inside = Math.abs(offset) < 1 ? "inside" : null; // offset < 1 gives some leeway so user doesn't have to click exactly on the line
        return start || end || inside; // returns whichever is available

    } else if (type === "circle") { // currently not working properly as the circle can be moved from anywhere on the screen....
        // const radius = (x2 - x1 + (y2 - y1)) / 1.4; // defines radius
        // const x0 = (x1 + x2) / 2;
        // const y0 = (y1 + y2) / 2;
        // return Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < radius;
    }
}

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
    return elements
      .map(element => ({ ...element, position: positionWithinElement(x, y, element) })) // goes through elements and returns position within element
      .find(element => element.position !== null); // finds first one in return statement that isn't null
  };

const adjustElementCoordinates = (element) => { // function ensures that x1,y1 and x2,y2 are always in the same place no matter which direction the user draws in - for resizing purposes
    const { type, x1, y1, x2, y2 } = element;
    if (type === "square") {
        const minX = Math.min(x1, x2); // min and max x - checking if mouse position is between
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2); // min and max y - checking if mouse position is between
        const maxY = Math.max(y1, y2);
        return { x1: minX, y1: minY, x2: maxX, y2: maxY };
    } else if (type === "line") {
        if (x1 < x2 || (x1 === x2 && y1 < y2)) {
            return { x1, y1, x2, y2 };
        } else {
            return {x1: x2, y1: y2, x2: x1, y2: y1}; // switching coords if user draws the line in the opposite direction
        }
    }
}

const cursorForPosition = position => { // returns cursor style based on position within element 
    switch (position) {
      case "tl":
      case "br":
      case "start":
      case "end":
        return "nwse-resize"; 
      case "tr":
      case "bl":
        return "nesw-resize";
      default:
        return "move"; // if cursor inside element
    }
  };

  const resizedCoordinates = (clientX, clientY, position, coordinates) => { // adjusts shape size based on which corner is being moved
    const { x1, y1, x2, y2 } = coordinates;
    switch (position) {
        case "tl":
        case "start":
            return { x1: clientX, y1: clientY, x2, y2 };
        case "tr":
            return { x1, y1: clientY, x2: clientX, y2 };
        case "bl":
            return { x1: clientX, y1, x2, y2: clientY };
        case "br":
        case "end":
            return { x1, y1, x2: clientX, y2: clientY };
        default:
            return null; // should not reach this return
      }
  }

  const useHistory = (initialState) => { // custom hook to save history of state changes for undo/redo function
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([initialState]); 

    const setState = (action, overwrite = false) => {
        const newState = typeof action === "function" ? action(history[index]) : action; // prevstate = previous step in drawing
        if (overwrite) { // ensures that steps are only added once and now every time the coordinates change
            const historyCopy = [...history];
            historyCopy[index] = newState;
            setHistory(historyCopy);
        } else {
            const updatedState = [...history].slice(0, index + 1);
            setHistory(prevState => [...updatedState, newState]); // adds point in time to history state that we can go back and forth from, overrides any undone steps
            setIndex(prevState => prevState + 1);
        }
    }

    const undo = () => {
        index > 0 && setIndex(prevState => prevState - 1);
    }

    const redo = () => {
        index < history.length - 1 && setIndex(prevState => prevState + 1);
    }
    return [history[index], setState, undo, redo]; 
  }



  const getSvgPathFromStroke = (stroke) => { // the function below will turn the points returned by getStroke into SVG path data for rendering
    if (!stroke.length) return '';
  
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length]
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
        return acc
      },
      ['M', ...stroke[0], 'Q']
    )
  
    d.push('Z')
    return d.join(' ')
  }


    const adjustmentRequired = (type) => ["line", "rectangle", "circle"].includes(type); // checks for type and whether points should be adjusted - pencil tool not included here

export default function Whiteboard2() {

    const [elements, setElements, undo, redo] = useHistory([]); // keeping track of created elements
    const [action, setAction] = useState("none");
    const [tool, setTool] = useState("pencil");
    const [selectedElement, setSelectedElement] = useState(null);
    const [penColour, setPenColour] = useState("#000000");
    const [showColours, setShowColours] = useState(false);
    const [showFillColours, setShowFillColours] = useState(false);
    const [fillColour, setFillColour] = useState("#ffffff");
    const [lineWidth, setLineWidth] = useState(1);


    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d"); // gets canvas's context = what the drawings will be rendered on. 2d = creation of object with 2d rendering context
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineCap = 5;
        ctx.strokeStyle = penColour;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas each time it is re-rendered

        const roughCanvas = rough.canvas(canvas);


        elements.forEach(element => drawElement(roughCanvas, ctx, element));

    }, [elements])

    useEffect(() => {

        const undoRedoFunction = (e) => { // allows users to use CTRL+Z to undo
            if ((e.metaKey || e.ctrlKey) && e.key === "z") { // checks for command or ctrl key
                if (e.shiftKey) { // command + shift + z = redo for mac
                    redo();
                } else { // command/ctrl + z = undo for windows/mac
                    undo(); 
                }
            } else if ((e.metaKey || e.ctrlKey) && e.key === "y") { // ctrl + y = redo for windows
                redo();
            }
        }

        document.addEventListener("keydown", undoRedoFunction);
        return () => {
            document.removeEventListener("keydown", undoRedoFunction);
        }
    }, [undo, redo])

    const createElement = (id, x1, y1, x2, y2, type) => { // returns coordinates based on position of cursor and element to be drawn
        switch (type) {}
        if (type === "line") {
            // const line = gen.line(400, 500, 600, 500); // (x1, y1, x2, y2)
            const roughElement = generator.line(x1, y1, x2, y2, {stroke: penColour, strokeWidth: lineWidth});
            return { id, x1, y1, x2, y2, type, roughElement };
    
        } else if (type === "square") {
            // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
            const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, { roughness: 0.5, fill: fillColour, stroke: penColour, strokeWidth: lineWidth });
            return { id, x1, y1, x2, y2, type, roughElement };
    
        } else if (type === "circle") {
            // const circle = gen.circle(500, 300, 200); // (x1, y1, diameter), diameter = 2 * (x2-x1 + y2-y1)
            // const roughElement = generator.circle(x1, y1, 2 * (x2 - x1 + y2 - y1), { roughness: 0.5, fill: fillColour, stroke: penColour, strokeWidth: lineWidth });
            // return { id, x1, y1, x2, y2, type, roughElement };
    
        } else if (type === "pencil") {
            return { id, type, points: [{x: x1, y: y1}] };
        }
    }
    

    const updateElement = (id, x1, y1, x2, y2, type) => {

        const elementsCopy = [...elements];

        switch (type) {
            case "line":
            case "square":
            // case "circle":
                elementsCopy[id] = createElement(id, x1, y1, x2, y2, type); // ensures last coords stored are the ones where the mouse stops moving;
                break;
            case "pencil":
                elementsCopy[id].points = [...elementsCopy[id].points, {x: x2, y: y2}];
                break;
            default:
                throw new Error("Type not recognised");
        }
        setElements(elementsCopy, true);
    }

    const drawElement = (roughCanvas, ctx, element) => {
        switch (element.type) {
          case "square":
          case "line":
          case "circle":
              roughCanvas.draw(element.roughElement);
              break;
          case "pencil":
              ctx.fillStyle = penColour;
              const stroke = getStroke(element.points, {
                  size: 3,
                  thinning: 0
              })
              const pathData = getSvgPathFromStroke(stroke);
  
              const myPath = new Path2D(pathData);
              console.log(myPath)
  
              ctx.fill(myPath);
              // const stroke = getSvgPathFromStroke(getStroke(element.points, pencilOptions));
              // ctx.fill(new Path2D(stroke));
              break;
          default:
              throw new Error("Type not recognised")
        }
      }

      const handleColourChange = (color) => {
        console.log(color);
        document.getElementById("colour-button").style.backgroundColor = color.hex;
        setPenColour(color.hex);
    }

    const handleFillColourChange = (color) => {
        console.log(color);
        document.getElementById("fill-button").style.backgroundColor = color.hex;
        setFillColour(color.hex);
    }

    const startDrawing = (e) => { // onMouseDown
        const { clientX, clientY } = e; // mouse coordinates relative to window size
        if (tool === "select") {             
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                const offsetX = clientX - element.x1;
                const offsetY = clientY - element.y1;
                setSelectedElement({...element, offsetX, offsetY});
                setElements(prevState => prevState); // updates steps so copies of elements are made. when shapes are moved, a copy of their previous state/position is saved and can undone/redone

                if (element.position === "inside") {
                setAction("moving");
                } else {
                    setAction("resizing");
                }
            }
        } else {
            const id = elements.length;
            const element = createElement(id, clientX, clientY, clientX, clientY, tool);
            setElements((prevState) => [...prevState, element]);
            setSelectedElement(element);

            setAction("drawing");

        }
    }

    const draw = (e) => { // tracks movement of mouse after clicking, saves copy of element to elements state
        const { clientX, clientY } = e; // mouse coordinates relative to window size

        if (tool === "select") {
            const element = getElementAtPosition(clientX, clientY, elements);
            e.target.style.cursor = element ? cursorForPosition(element.position) : "default"; // if cursor within element, returns different cursor style
          }

        if (action === "drawing") {
            const index = elements.length - 1;
            const { x1, y1 } = elements[index];
            updateElement(index, x1, y1, clientX, clientY, tool); // ensures last coords stored are the ones where the mouse stops moving

        } else if (action === "moving") {
            const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
            const width = x2 - x1;
            const height = y2 - y1;
            const newX1 = clientX - offsetX;
            const newY1 = clientY - offsetY;
            updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type); // ensures last coords stored are the ones where the mouse stops moving

        } else if (action === "resizing") {
            const { id, type, position, ...coordinates } = selectedElement;
            const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates);
            updateElement(id, x1, y1, x2, y2, type);
        }
    }

    const finishDrawing = () => { // sets drawing state to false when mouse is released, stores end coords for shape and stroke so the final element is rendered on board
        if (selectedElement) {
            const index = selectedElement.id;
            const { id, type } = elements[index];
            if ((action === "drawing" || action === "resizing") && adjustmentRequired(type)) {
                const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
                updateElement(id, x1, y1, x2, y2, type);
            }
        }
        setAction("none");
        setSelectedElement(null);
    }


  return (
    <div className="canvas-container">
        <div style={{position: "fixed"}}>
        {/* buttons are fixed so canvas isn't offset, add toolbar here? */}
        <h1>Whiteboard</h1>
        <input
            type="radio"
            id="select"
            className="select"
            checked={tool === "select"}
            onChange={() => setTool("select")}
            />
            <label htmlFor="select">Select</label>
            <input
            type="radio"
            id="line"
            checked={tool === "line"}
            onChange={() => setTool("line")}
            />
            <label htmlFor="line">Line</label>
            <input
            type="radio"
            id="pencil"
            checked={tool === "pencil"}
            onChange={() => setTool("pencil")}
            />
            <label htmlFor="pencil">Pencil</label>
            <input
            type="radio"
            id="square"
            checked={tool === "square"}
            onChange={() => setTool("square")}
            />
            <label htmlFor="square">Square</label>
            <input
            type="radio"
            id="circle"
            disabled={true}
            checked={tool === "circle"}
            onChange={() => setTool("circle")}
            />
            <label htmlFor="circle">Circle</label>
            <button
              title="Colour"
              id="colour-button"
              onClick={() => {
                setShowColours(!showColours);
              }}
            >
              Pen Colour
            </button>
            { showColours ? <div className="popover">
          <HuePicker color="#fff" onChange={(color) => handleColourChange(color)}/>
        </div> : null }
        <button
              title="Fill"
              id="fill-button"
              onClick={() => {
                setShowFillColours(!showFillColours);
              }}
            >
              Fill Colour
            </button>
        { showFillColours ? <div className="fill-popover">
          <HuePicker color="#fff" onChange={(color) => handleFillColourChange(color)}/>
        </div> : null }
        </div>
            <div style={{position: "fixed", bottom: 0, padding: 10}}>
                <button onClick={undo}>Undo</button>
                <button onClick={redo}>Redo</button>
            </div>
        <canvas 
        id="canvas" 
        width={window.innerWidth} 
        height={window.innerWidth}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}>
            Canvas
        </canvas>
    </div>
  )
}
