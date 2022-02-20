import React, { useState, useLayoutEffect } from "react";
import "./Whiteboard.css";
import Toolbar from "./toolbar";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator(); // generator allows user to create a drawable object - to be used for shapes later with .draw method

const createElement = (id, x1, y1, x2, y2, type) => { // returns coordinates based on position of cursor and element to be drawn
    if (type === "line") {
        // const line = gen.line(400, 500, 600, 500); // (x1, y1, x2, y2)
        const roughElement = generator.line(x1, y1, x2, y2);
        return { id, x1, y1, x2, y2, type, roughElement };
    } else if (type === "square") {
        // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
        const roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1);
        return { id, x1, y1, x2, y2, type, roughElement };
    } else if (type === "circle") {
        // const circle = gen.circle(500, 300, 200); // (x1, y1, diameter), diameter = 2 * (x2-x1 + y2-y1)
        const roughElement = generator.circle(x1, y1, 2 * (x2 - x1 + y2 - y1));
        return { id, x1, y1, x2, y2, type, roughElement };
    }
}

const isWithinElement = (x, y, element) => {
    const { type, x1, y1, x2, y2 } = element;
    if (type === "square") {
        const minX = Math.min(x1, x2); // min and max x - checking if mouse position is between
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2); // min and max y - checking if mouse position is between
        const maxY = Math.max(y1, y2);
        return x >= minX && x <= maxX && y >= minY && y <= maxY; // returns true if mouse is within the square

    } else if (type === "line") {
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c)); // if c is between a + b, and equal distance between a + c, and b + c
        return Math.abs(offset) < 1; // offset < 1 gives some leeway so user doesn't have to click exactly on the line
    } else if (type === "circle") { // currently not working properly as the circle can be moved from anywhere on the screen....
        // const radius = (x2 - x1 + (y2 - y1)) / 1.4; // defines radius
        // const x0 = (x1 + x2) / 2;
        // const y0 = (y1 + y2) / 2;
        // return Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < radius;
    }
}

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
    return elements.find(element => isWithinElement(x, y, element));
}

const cursorForPosition = position => {
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
        return "move";
    }
  };

export default function Whiteboard2() {

    const [elements, setElements] = useState([]); // keeping track of created elements
    const [action, setAction] = useState("none");
    const [tool, setTool] = useState("line");
    const [selectedElement, setSelectedElement] = useState(null);


    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d"); // gets canvas's context = what the drawings will be rendered on. 2d = creation of object with 2d rendering context
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas each time it is re-rendered

        const roughCanvas = rough.canvas(canvas);

        elements.forEach(({roughElement}) => roughCanvas.draw(roughElement));

    }, [elements])

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const updatedElement = createElement(id, x1, y1, x2, y2, type); // ensures last coords stored are the ones where the mouse stops moving

        const elementsCopy = [...elements];
        elementsCopy[id] = updatedElement;
        setElements(elementsCopy);
    }

    const startDrawing = (e) => { // onMouseDown
        const { clientX, clientY } = e; // mouse coordinates relative to window size
        if (tool === "select") {             
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                const offsetX = clientX - element.x1;
                const offsetY = clientY - element.y1;
                setSelectedElement({...element, offsetX, offsetY});
                setAction("moving");
            }
        } else {
            const id = elements.length;
            const element = createElement(id, clientX, clientY, clientX, clientY, tool);
            setElements((prevState) => [...prevState, element]);

            setAction("drawing");

        }
    }

    const draw = (e) => { // tracks movement of mouse after clicking, saves copy of element to elements state
        const { clientX, clientY } = e; // mouse coordinates relative to window size

        if (tool === "select") {
            const element = getElementAtPosition(clientX, clientY, elements);
            e.target.style.cursor = element ? cursorForPosition(element.position) : "default";
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

        }
    }

    const finishDrawing = () => { // sets drawing state to false when mouse is released, stores end coords for shape and stroke so the final element is rendered on board
        setAction("none");
        setSelectedElement(null);
    }


  return (
    <div>
        <div style={{position: "fixed"}}> 
        {/* buttons are fixed so canvas isn't offset, add toolbar here? */}
        <input
            type="radio"
            id="select"
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
            id="square"
            checked={tool === "square"}
            onChange={() => setTool("square")}
            />
            <label htmlFor="square">Square</label>
            <input
            type="radio"
            id="circle"
            checked={tool === "circle"}
            onChange={() => setTool("circle")}
            />
            <label htmlFor="circle">Circle</label>
        </div>
        <canvas 
        id="canvas" 
        width={window.innerWidth} 
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}>
            Canvas
        </canvas>
    </div>
  )
}
