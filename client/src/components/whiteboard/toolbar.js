import React, {useState} from "react";
import { HuePicker } from "react-color";
import html2canvas from "html2canvas";
import Select from "./images/selection.png";
import Line from "./images/line.png";
import Pencil from "./images/pencil.png";
import Square from "./images/square.png";
import Text from "./images/text (1).png";
import Sticky from "./images/sticky-note.png";
import Lined from "./images/lined.jpg";
import Grid from "./images/grid.png";
import Plus from "./images/plus.png";
import Minus from "./images/minus-sign.png";
import Undo from "./images/undo.png";
import Redo from "./images/redo.png";
import Download from "./images/download-arrow.png";
import Clear from "./images/cross.png";

export default function Toolbar({
  setTool,
  tool,
  setShowStickyNote,
  showStickyNote,
  setBackgroundImage,
  setLineWidth,
  setLineColour,
  setFillColour,
  undo,
  redo,
  setImageUpload
}) {

  const [showToolbar, setShowToolbar] = useState(true);

  const handleColourChange = (color) => {
    console.log(color);
    document.getElementById("colour-button").style.backgroundColor = color.hex;
    // setLineColour((prevState) => [...prevState, color.hex]);
    const newState = color.hex;
    setLineColour(newState); // adds point in time to history state that we can go back and forth from, overrides any undone steps
    // setIndex(prevState => prevState + 1);
  };

  const handleFillColourChange = (color) => {
    console.log(color);
    document.getElementById("fill-colour-button").style.backgroundColor =
      color.hex;
    setFillColour(color.hex);
  };

  const saveAsImage = () => {
    html2canvas(document.getElementById("screenshot")).then((canvas) => {
      var imageURL = canvas.toDataURL("image/png");
      let a = document.createElement("a");
      a.href = imageURL;
      a.download = imageURL;
      a.click();
    });
  };

  const uploadImage = (e) => {
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    setImageUpload(prevState => [...prevState, img.src]);
    // img.onload = function() {
    //   // setImageUpload(img.src);
    //   console.log("img uploaded");
    //   ctx.drawImage(img, 0, 0);
    // }
  }

  const clear = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="toolbar-buttons">
        {/* SHOW/HIDE/DOWNLOAD BUTTONS */}
      <button className="toolbar-buttons-show" onClick={() => setShowToolbar(!showToolbar)}>Show/hide toolbar</button>
      <button title="Download" id="screenshot" className="toolbar-buttons-show" onClick={() => {saveAsImage()}} download="image.png">Download image</button>      
      </div>
        {/* CURRENT TOOL */}
      {showToolbar && (
      <div className="toolbar-container">
        <p className="toolbar-sections">Current tool: {tool}</p>

        {/* SELECT BUTTON */}
        <button id="select" onClick={() => setTool("select")} className="toolbar-button">
          <img src={Select} className="toolbar-icon" alt="Select arrow" />
        </button>

        {/* LINE TOOL */}
        <button id="line" onClick={() => setTool("line")} className="toolbar-button">
          <img src={Line} className="toolbar-icon" alt="Line tool" />
        </button>

        {/* PENCIL TOOL */}
        <button id="pencil" onClick={() => setTool("pencil")} className="toolbar-button">
          <img src={Pencil} className="toolbar-icon" alt="Pencil tool" />
        </button>

        {/* SQUARE TOOL */}
        <button id="square" onClick={() => setTool("square")} className="toolbar-button">
          <img src={Square} className="toolbar-icon" alt="Square tool" />
        </button>

        {/* TEXT TOOL */}
        <button id="text" onClick={() => setTool("text")} className="toolbar-button">
          <img src={Text} className="toolbar-icon" alt="Text tool" />
        </button>

        {/* STICKY NOTE TOOL */}
        <button id="sticky"  onClick={() => { setTool("sticky"); setShowStickyNote(!showStickyNote); }} className="toolbar-button">
          <img src={Sticky} className="toolbar-icon" alt="Sticky notes" />
        </button>

        {/* INCREASE PEN THICKNESS */}
        <button title="Increase" id="increase-thickness" className="toolbar-button" onClick={() => { setLineWidth((prevState) => prevState + 1); }}>
          <img src={Plus} className="toolbar-icon" alt="Increase pen thickness" />
        </button>

        {/* DECREASE PEN THICKNESS */}
        <button title="Decrease" id="decrease-thickness" className="toolbar-button" onClick={() => { setLineWidth((prevState) => prevState - 1); }}>
          <img src={Minus} className="toolbar-icon" alt="Decrease pen thickness" />
        </button>

        {/* SELECT BACKGROUND IMAGE */}
        <p className="toolbar-sections">Select background:
        <button id="white" className="white-background" onClick={() => {setBackgroundImage("#ffffff");}}></button>
        <button id="lined" className="lined-background" onClick={() => {setBackgroundImage(`${Lined}`);}}></button>
        <button id="grid"  className="grid-background"  onClick={() => {setBackgroundImage(`${Grid}`);}}></button>
        </p>

        {/* IMAGE UPLOAD */}
        <p className="toolbar-sections">Upload image:        
        <input type="file" className="upload-image" onChange={uploadImage}/>
        </p>

        {/* COLOUR PICKERS */}
        <p className="toolbar-sections">
          Pen Colour: <button id="colour-button"></button>        
        <HuePicker color="#fff" onChange={(color) => handleColourChange(color)} width="200px" className="colour-picker" />
        </p>

        <p className="toolbar-sections">
          Fill Colour: <button id="fill-colour-button"></button>
        <HuePicker color="#fff" onChange={(color) => handleFillColourChange(color)} width="200px" className="fill-colour-picker"/>
        </p>

        {/* UNDO/REDO BUTTONS */}
        <button title="Undo" id="undo-button" className="toolbar-button" onClick={undo}>
          <img src={Undo} className="toolbar-icon-bottom" alt="Undo button" />
        </button>
        <button title="Redo" id="redo-button" className="toolbar-button" onClick={redo}>
          <img src={Redo} className="toolbar-icon-bottom" alt="Redo button" />
        </button>

        {/* DOWNLOAD/CLEAR BUTTONS */}
        <button title="Download" id="screenshot" className="toolbar-button" onClick={() => {saveAsImage(); }} download="image.png">
          <img src={Download} className="toolbar-icon-bottom" alt="Download button" />
        </button>

        <button title="Clear" id="clear-button" className="toolbar-button" onClick={clear}>
          <img src={Clear} className="toolbar-icon-bottom"alt="Clear canvas button" />
        </button>

      </div>
      )}
      </div>
  );
}
