import React, { useLayoutEffect, useState, useRef } from 'react';


let pos = { x: 0, y: 0 }

const PencilTool = () => {

    const [points, setPoints] = useState([]);
    const [drawing, setDrawing] = useState(false);

    const contextRef = useRef(null);

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        contextRef.current = ctx;

        points.forEach((el) => {
            contextRef.current.lineTo(el.x, el.y);
            contextRef.current.stroke();
        })

    }, [points])

    const startDrawing = (e) => {
        setDrawing(true);
        const { clientX, clientY } = e;
        pos.x = clientX;
        pos.y = clientY;
    }

    const finishDrawing = () => {
        setDrawing(false);
    }

    const draw = (e) => {
        if (!drawing) return;

        setPoints((state) => [...state, pos]);
        contextRef.current.moveTo(pos.x, pos.y);

        const { clientX, clientY } = e;
        pos.x = clientX;
        pos.y = clientY;
    }


  return (
    <div className="canvas-container">
        <canvas id="canvas" width={window.innerWidth} height={window.innerWidth} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={finishDrawing}>
            Canvas
        </canvas>
        <button>Pencil</button>
    </div>
  )
}
export default PencilTool;
