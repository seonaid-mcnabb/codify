import React, {useState} from "react";
import { HuePicker } from "react-color";


export default function Toolbar({ setToolType, setPenColour }) {

const [showColours, setShowColours] = useState(false)
const [colourValue, setColourValue] = useState("#fff");

const handleColourChange = (color) => {
    console.log(color);
    setPenColour(color.hex);
}

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
            <button
              title="Blue"
              className="colour-button"
              onClick={() => {
                setShowColours(!showColours);
              }}
            >
              Pen Colour
            </button>

        { showColours ? <div className="popover"><div className="cover" />
          <HuePicker color="#fff" onChange={(color) => handleColourChange(color)}/>
        </div> : null }
      </div>
          </div>
      </div>
    </div>
  );
}