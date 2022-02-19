import React, { useState, useLayoutEffect } from "react";
import "./Whiteboard.css";
import Toolbar from "./toolbar";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const createElement = (x1, y1, x2, y2, type) => {
    if (type === "line") {
        // const line = gen.line(400, 500, 600, 500); // (x1, y1, x2, y2)
        const roughElement = generator.line(x1, y1, x2, y2);
        return { x1, y1, x2, y2, roughElement };
    } else if (type === "square") {
        // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
        const roughElement = generator.rectangle(x1, y1, x2-x1, y2-y1);
        return { x1, y1, x2, y2, roughElement };
    } else if (type === "circle") {
        // const circle = gen.circle(500, 300, 200); // (x1, y1, diameter), diameter = 2 * (x2-x1 + y2-y1)
        const roughElement = generator.circle(x1, y1, 2 * (x2 - x1 + y2 - y1));
        return { x1, y1, x2, y2, roughElement };
    }
}

export default function Whiteboard2() {

    const [elements, setElements] = useState([]); // keeping track of created elements
    const [drawing, setDrawing] = useState(false);
    const [elementType, setElementType] = useState("line");


    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas = rough.canvas(canvas);

        elements.forEach(({roughElement}) => roughCanvas.draw(roughElement));

    }, [elements])

    const startDrawing = (e) => {
        setDrawing(true);

        const { clientX, clientY } = e; // mouse coordinates relative to window size


        const element = createElement(clientX, clientY, clientX, clientY, elementType);
        setElements((prevState) => [...prevState, element]);
    }

    const draw = (e) => {
        if (!drawing) return;

        const { clientX, clientY } = e; // mouse coordinates relative to window size

        const index = elements.length - 1;
        const { x1, y1 } = elements[index];
        const updatedElement = createElement(x1, y1, clientX, clientY, elementType);

        const elementsCopy = [...elements];
        elementsCopy[index] = updatedElement;
        setElements(elementsCopy);
    }

    const finishDrawing = () => {
        setDrawing(false);
    }


  return (
    <div>
        <div style={{position: "fixed"}}>
            <input
            type="radio"
            id="line"
            checked={elementType === "line"}
            onChange={() => setElementType("line")}
            />
            <label htmlFor="line">Line</label>
            <input
            type="radio"
            id="square"
            checked={elementType === "square"}
            onChange={() => setElementType("square")}
            />
            <label htmlFor="square">Square</label>
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
