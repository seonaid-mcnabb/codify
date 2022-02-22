import React from "react";

export default function Toolbar({ setToolType }) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div>
            <button
              title="Pencil"
              className="freehand-drawing"
              onClick={() => {
                setToolType("pencil");
              }}
            >
              Pencil
            </button>
            <button
              title="Line"
              className="line-drawing"
              onClick={() => {
                setToolType("line");
              }}
            >
              Line
            </button>
            <button
              title="Square"
              className="square-drawing"
              onClick={() => {
                setToolType("square");
              }}
            >
              Square
            </button>
            <button
              title="Circle"
              className="circle-drawing"
              onClick={() => {
                setToolType("circle");
              }}
            >
              Circle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}