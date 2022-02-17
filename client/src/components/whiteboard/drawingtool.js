import React, {useLayoutEffect, useState} from 'react';
import rough from 'roughjs/bundled/rough.esm';

const gen = rough.generator(); // generator allows user to create a drawable object - to be used for shapes later with .draw method


const DrawingTool = () => {

    const [elements, setElements] = useState([]); // shape state that is initially empty, stores coords of lines
    const [drawing, setDrawing] = useState(false); // drawing state, initially false, becomes true when mouse is held and drawing starts, false again when it finishes
    const [elementType, setElementType] = useState("line"); // state to determine which shapes are drawn by user. line is default

    const createElement = (x1, y1, x2, y2) => { // returns coordinates based on position of cursor and element to be drawn
        if (elementType === "line") {
            const roughEl = gen.line(x1 - 10, y1 - 10, x2 - 10, y2 - 10); // - 10 allows cursor and line to be aligned - due to 10px border
            return { x1, y1, x2, y2, roughEl };
        } else if (elementType === "square") {
            // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
        } else if (elementType === "circle") {
            // const circle = gen.circle(500, 300, 200); // (x1, y1, diameter), diameter = 2 * (x2-x1 + y2-y1)
        }
    }    

    useLayoutEffect(() => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d'); // gets canvas's context = what the drawings will be rendered on. 2d = creation of object with 2d rendering context

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears screen each time it is re-rendered - do i want this if drawings should be saved?!

        const rc = rough.canvas(canvas); // rough.js variable that stores the canvas defined above

        elements.forEach((el) => {
            rc.draw(el.roughEl)
        });

        // three shapes created here based on coordinates system - (x1, y1 = first click, x2, y2 = when mouse is released), calculated using React event listeners - onMouseDown > onMouseMove > onMouseUp
        // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
        // const circle = gen.circle(500, 300, 200); // (x1, y1, diameter), diameter = 2 * (x2-x1 + y2-y1)
        // const line = gen.line(400, 500, 600, 500); // (x1, y1, x2, y2)
        // rc.draw(rect);
        // rc.draw(circle);
        // rc.draw(line);

      }, [elements]);


    const startDrawing = (e) => {
        setDrawing(true);
        const { clientX, clientY } = e; 
        const newEl = createElement(clientX, clientY, clientX, clientY); // first coordinates of shape
        setElements((state) => [...state, newEl]); // copying element to previous state
    }

    const finishDrawing = (e) => {
        setDrawing(false);
    }

    const draw = (e) => {
        if (!drawing) return; // when mouse isn't in drawing position

        const { clientX, clientY } = e;
        console.log(clientX, clientY);
        const index = elements.length - 1;
        const { x1, y1 } = elements[index];
        const updatedEl = createElement(x1, y1, clientX, clientY); // 2nd coordinates (x2, y2)

        const copyEl = [...elements]; // update position of new element
        copyEl[index] = updatedEl; // replace last index
        setElements(copyEl);
    }

  return (
    <div>
        <canvas id="canvas" height={window.innerWidth} width={window.innerWidth} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={finishDrawing}>
            {/* canvas id allows us to use the Canvas API */}
            Canvas
        </canvas>

    </div>
  )
}

export default DrawingTool;
