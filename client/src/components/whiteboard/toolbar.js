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
      <button className="toolbar-buttons-design" onClick={() => setShowToolbar(!showToolbar)}>Show/hide toolbar</button>
      <button 
      title="Download"
          id="screenshot"
          className="toolbar-buttons-design"
          onClick={() => {
            saveAsImage();
          }}
          download="image.png">Download image</button>      
      </div>

      {showToolbar && (
      <div className="toolbar-container">
        <h1 className="toolbar-header">Whiteboard</h1>

        <p>Current tool: {tool}</p>

        <button
          id="select"
          onClick={() => setTool("select")}
          className="toolbar-button"
        >
          <img src={Select} className="toolbar-icon" alt="Select arrow" />
        </button>

        <button
          id="line"
          onClick={() => setTool("line")}
          className="toolbar-button"
        >
          <img src={Line} className="toolbar-icon" alt="Line tool" />
        </button>

        <button
          id="pencil"
          onClick={() => setTool("pencil")}
          className="toolbar-button"
        >
          <img src={Pencil} className="toolbar-icon" alt="Pencil tool" />
        </button>
        <br />
        <button
          id="square"
          onClick={() => setTool("square")}
          className="toolbar-button-square"
        >
          <img src={Square} className="toolbar-icon-square" alt="Square tool" />
        </button>

        {/* <button
        id="circle"
        onClick={() => setTool("circle")}
        className="toolbar-button-square"
        >
        <img src={Circle} className="toolbar-icon" alt="Square tool" />
        </button> */}

        <button
          id="text"
          onClick={() => setTool("text")}
          className="toolbar-button"
        >
          <img src={Text} className="toolbar-icon-text" alt="Text tool" />
        </button>

        <button
          id="sticky"
          onClick={() => {
            setTool("sticky");
            setShowStickyNote(!showStickyNote);
          }}
          className="toolbar-button"
        >
          <img src={Sticky} className="toolbar-icon-text" alt="Sticky notes" />
        </button>
        <br />
        <p>Select background:</p>

        <button 
            id="white"
            className="white-background"
            onClick={() => {
              setBackgroundImage(`#ffffff`);
            }}
            ></button>

        <button
          id="lined"
          className="lined-background"
          onClick={() => {
            setBackgroundImage(`${Lined}`);
          }}
        ></button>

        <button
          id="grid"
          className="grid-background"
          onClick={() => {
            setBackgroundImage(`${Grid}`);
          }}
        ></button>
        <br />
        <p>Upload image:</p>
        
        <input type="file" className="upload-image" onChange={uploadImage}/>


        <button
          title="Increase"
          id="increase-thickness"
          className="toolbar-button"
          onClick={() => {
            setLineWidth((prevState) => prevState + 1);
          }}
        >
          <img
            src={Plus}
            className="toolbar-icon-width"
            alt="Increase pen thickness"
          />
        </button>

        <button
          title="Decrease"
          id="decrease-thickness"
          className="toolbar-button"
          onClick={() => {
            setLineWidth((prevState) => prevState - 1);
          }}
        >
          <img
            src={Minus}
            className="toolbar-icon-minus"
            alt="Decrease pen thickness"
          />
        </button>
        <br />

        <p>
          Pen Colour: <button id="colour-button"></button>
        </p>
        <HuePicker
          color="#fff"
          onChange={(color) => handleColourChange(color)}
          width="200px"
        />

        <p>
          Fill Colour: <button id="fill-colour-button"></button>
        </p>
        <HuePicker
          color="#fff"
          onChange={(color) => handleFillColourChange(color)}
          width="200px"
        />
        <br />

        <button
          title="Undo"
          id="undo-button"
          className="toolbar-button"
          onClick={undo}
        >
          <img src={Undo} className="toolbar-icon-undo" alt="Undo button" />
        </button>

        <button
          title="Redo"
          id="redo-button"
          className="toolbar-button"
          onClick={redo}
        >
          <img src={Redo} className="toolbar-icon-redo" alt="Redo button" />
        </button>
        <br />

        <button
          title="Download"
          id="screenshot"
          className="toolbar-button"
          onClick={() => {
            saveAsImage();
          }}
          download="image.png"
        >
          <img
            src={Download}
            className="toolbar-icon-dl"
            alt="Download button"
          />
        </button>

        <button
          title="Clear"
          id="clear-button"
          className="toolbar-button"
          onClick={clear}
        >
          <img
            src={Clear}
            className="toolbar-icon-clear"
            alt="Clear canvas button"
          />
        </button>
        <br />
      </div>
      )}
      </div>
  );
}
