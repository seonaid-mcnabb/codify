import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useReducer,
} from "react";
import { v4 as uuid } from "uuid";
import "./Whiteboard.css";
import Toolbar from "./toolbar";
import Header from "../Header";
import rough from "roughjs/bundled/rough.esm";
import { getStroke } from "perfect-freehand";
import Close from "./images/close.png";
import { useNavigate } from "react-router-dom";

const generator = rough.generator(); // generator allows user to create a drawable object - to be used for shapes later with .draw method

const nearPoint = (x, y, x1, y1, name) => {
  // function checks if mouse is near the corner/end of the shape for resizing
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null; // mouse is subtracting shape sides and checking if they're near each other, < 5 is the offset, .abs deals with positive and negative digits
};

const onLine = (x1, y1, x2, y2, x, y, maxoffset = 1) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c)); // if c is between a + b, and equal distance between a + c, and b + c
  return Math.abs(offset) < maxoffset ? "inside" : null; // offset < 5 gives some leeway so user doesn't have to click exactly on the line
};

const positionWithinElement = (x, y, element) => {
  const { type, x1, y1, x2, y2 } = element;
  switch (type) {
    case "line":
      const on = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, "start"); // finds start of line
      const end = nearPoint(x, y, x2, y2, "end"); // finds end of line
      return start || end || on; // returns whichever is available
    case "square":
      const topLeft = nearPoint(x, y, x1, y1, "tl"); // tl = topleft
      const topRight = nearPoint(x, y, x2, y1, "tr");
      const bottomLeft = nearPoint(x, y, x1, y2, "bl");
      const bottomRight = nearPoint(x, y, x2, y2, "br");
      const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null; // returns true if mouse is within the square
      return topLeft || topRight || bottomLeft || bottomRight || inside; // returns what is found
    case "pencil":
      const betweenAnyPoint = element.points.some((point, index) => {
        // checking if any points are on the line and returning true for each one
        const nextPoint = element.points[index + 1];
        if (!nextPoint) return false;
        return (
          onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) !== null
        );
      });
      return betweenAnyPoint ? "inside" : null;
    case "text":
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    case "sticky":
      return;
    default:
      throw new Error("Type not recognised");
  }
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    })) // goes through elements and returns position within element
    .find((element) => element.position !== null); // finds first one in return statement that isn't null
};

const adjustElementCoordinates = (element) => {
  // function ensures that x1,y1 and x2,y2 are always in the same place no matter which direction the user draws in - for resizing purposes
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
      return { x1: x2, y1: y2, x2: x1, y2: y1 }; // switching coords if user draws the line in the opposite direction
    }
  }
};

const cursorForPosition = (position) => {
  // returns cursor style based on position within element
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

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  // adjusts shape size based on which corner is being moved
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
};

const useHistory = (initialState, elements) => {
  // custom hook to save history of state changes for undo/redo function
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action, overwrite = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action; // prevstate = previous step in drawing
    if (overwrite) {
      // ensures that steps are only added once and now every time the coordinates change
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory((prevState) => [...updatedState, newState]); // adds point in time to history state that we can go back and forth from, overrides any undone steps
      setIndex((prevState) => prevState + 1);
    }
  };

  const undo = () => {
    index > 0 && setIndex((prevState) => prevState - 1);
  };

  const redo = () => {
    index < history.length - 1 && setIndex((prevState) => prevState + 1);
  };
  return [history[index], setState, undo, redo];
};

const getSvgPathFromStroke = (stroke) => {
  // the function below will turn the points returned by getStroke into SVG path data for rendering
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

const adjustmentRequired = (type) => ["line", "rectangle"].includes(type); // checks for type and whether points should be adjusted - pencil tool not included here

const initialNoteState = {
  notes: [],
};

const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "add_note":
      const newState = {
        notes: [...prevState.notes, action.payload],
      };
      return newState;
    case "delete_note":
      const updatedState = {
        ...prevState,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
      };
      return updatedState;
    default:
      throw new Error("Not recognised");
  }
};

export default function Whiteboard2(props) {
  const [elements, setElements, undo, redo] = useHistory([]); // keeping track of created elements
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("pencil");
  const [selectedElement, setSelectedElement] = useState(null);
  const [lineColour, setLineColour] = useState("#000000");
  const [fillColour, setFillColour] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(3);
  const [backgroundImage, setBackgroundImage] = useState("#ffffff");
  const textAreaRef = useRef();
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [notesState, dispatch] = useReducer(notesReducer, initialNoteState);
  const [imageUpload, setImageUpload] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d"); // gets canvas's context = what the drawings will be rendered on. 2d = creation of object with 2d rendering context

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineCap = 5;
    ctx.strokeStyle = lineColour;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas each time it is re-rendered

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, ctx, element);
    });
  }, [elements, lineColour, backgroundImage, action, selectedElement]);

  useEffect(() => {
    const undoRedoFunction = (e) => {
      // allows users to use CTRL+Z to undo
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        // checks for command or ctrl key
        if (e.shiftKey) {
          // command + shift + z = redo for mac
          redo();
        } else {
          // command/ctrl + z = undo for windows/mac
          undo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key === "y") {
        // ctrl + y = redo for windows
        redo();
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [backgroundImage, undo, redo]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      textArea.focus(); // allows users to type as soon as mouse is clicked
      textArea.value = selectedElement.text;
    }

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    setIsMobile(true);
}
  }, [action, selectedElement]);

  const createElement = (id, x1, y1, x2, y2, type) => {
    // returns coordinates based on position of cursor and element to be drawn
    if (type === "line") {
      // const line = gen.line(400, 500, 600, 500); // (x1, y1, x2, y2)
      const roughElement = generator.line(x1, y1, x2, y2, {
        stroke: lineColour,
      });
      return { id, x1, y1, x2, y2, type, roughElement };
    } else if (type === "square") {
      // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
      const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
        fill: fillColour,
        hachureGap: 1,
        stroke: lineColour,
      });
      return { id, x1, y1, x2, y2, type, roughElement };
    } else if (type === "sticky") {
      return;
    } else if (type === "pencil") {
      return { id, type, points: [{ x: x1, y: y1 }], lineColour };
    } else if (type === "text") {
      return { id, type, x1, y1, x2, y2, text: "" };
    }
  };

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];
    switch (type) {
      case "line":
      case "square":
        // case "circle":
        elementsCopy[id] = createElement(id, x1, y1, x2, y2, type); // ensures last coords stored are the ones where the mouse stops moving
        break;
      case "pencil":
        elementsCopy[id].points = [
          ...elementsCopy[id].points,
          { x: x2, y: y2 },
        ];
        break;
      case "text":
        const textWidth = document
          .getElementById("canvas")
          .getContext("2d")
          .measureText(options.text).width;
        const textHeight = 24;
        elementsCopy[id] = {
          ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
          text: options.text,
        };
        break;
      default:
        throw new Error("Type not recognised");
    }
    setElements(elementsCopy, true);
  };

  const drawElement = (roughCanvas, ctx, element) => {
    switch (element.type) {
      case "square":
      case "line":
      case "circle":
        roughCanvas.draw(element.roughElement);
        break;
      case "pencil":
        ctx.fillStyle = lineColour;
        const stroke = getStroke(element.points, {
          size: lineWidth,
          thinning: 0,
        });
        const pathData = getSvgPathFromStroke(stroke);
        const myPath = new Path2D(pathData);
        console.log(myPath);
        ctx.fill(myPath);
        break;
      case "text":
        ctx.textBaseline = "middle"; // where text appears against the cursor when you click, and where select tool can grab it
        ctx.font = "24px Chivo";
        ctx.fillStyle = "#000000";
        ctx.fillText(element.text, element.x1, element.y1);
        break;
      case "sticky":
        return;
      default:
        throw new Error("Type not recognised");
    }
  };

  const addNote = (e) => {
    e.preventDefault();
    if (!noteInput) return;
    const newNote = {
      id: uuid(),
      text: noteInput,
    };
    dispatch({ type: "add_note", payload: newNote });
  };

  const dropNote = (e) => {
    e.target.style.left = `${e.pageX - 50}px`;
    e.target.style.top = `${e.pageY - 50}px`;
  };

  const dragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const startDrawing = (e) => {
    // onMouseDown
    if (action === "writing") return;
    const { clientX, clientY } = e; // mouse coordinates relative to window size
    if (tool === "select") {
      const element = getElementAtPosition(clientX, clientY, elements);
      if (element) {
        if (element.type === "pencil") {
          const xOffsets = element.points.map((point) => clientX - point.x);
          const yOffsets = element.points.map((point) => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }

        setElements((prevState) => prevState); // updates steps so copies of elements are made. when shapes are moved, a copy of their previous state/position is saved and can undone/redone

        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);
      setAction(tool === "text" ? "writing" : "drawing");
    }
  };

  const draw = (e) => {
    // tracks movement of mouse after clicking, saves copy of element to elements state
    const { clientX, clientY } = e; // mouse coordinates relative to window size

    if (tool === "select") {
      const element = getElementAtPosition(clientX, clientY, elements);
      e.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default"; // if cursor within element, returns different cursor style
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool); // ensures last coords stored are the ones where the mouse stops moving
    } else if (action === "moving") {
      if (selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options = type === "text" ? { text: selectedElement.text } : {};
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          options
        ); // ensures last coords stored are the ones where the mouse stops moving
      }
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  const finishDrawing = (e) => {
    // sets drawing state to false when mouse is released, stores end coords for shape and stroke so the final element is rendered on board
    const { clientX, clientY } = e;
    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        // if mouse position hasn't moved - then text can be edited
        setAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type);
      }
    }
    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const handleBlur = (e) => {
    const { id, x1, y1, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, { text: e.target.value });
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (props.loginStatus === false) {
      navigate(`/login`);
    }
  }, props);

  if (props.loginStatus === false) {
    navigate(`/login`);
  }
  return (
      <div id="screenshot" className="canvas-container" onDragOver={dragOver}>
      <div style={{ position: "fixed", left: "0%", right: "0%" }}>
        {/* buttons are fixed so canvas isn't offset */}
        <Header
          tabIndex={1}
          getToken={props.getToken}
          loginStatus={props.loginStatus}
          setLoginStatus={props.setLoginStatus}
        />
      </div>

      <div style={{ position: "fixed" }}>
        
        <div>
          <Toolbar
            setTool={setTool}
            tool={tool}
            showStickyNote={showStickyNote}
            setShowStickyNote={setShowStickyNote}
            setBackgroundImage={setBackgroundImage}
            setLineWidth={setLineWidth}
            setLineColour={setLineColour}
            setFillColour={setFillColour}
            undo={undo}
            redo={redo}
            setImageUpload={setImageUpload}
            isMobile={isMobile}
          />
        </div>

        <img
          src={imageUpload}
          className="uploaded-image"
          alt=""
          draggable="true"
          onDragEnd={dropNote}
        />

        {/* FORM TO ADD STICKY NOTE */}
        {showStickyNote ? (
          <form className="sticky-note" onSubmit={addNote}>
            <textArea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add text..."
            ></textArea>
            <button className="add-note">Add</button>
          </form>
        ) : null}
      </div>

      {/* TEXT AREA FOR TYPING */}
      {action === "writing" ? (
        <textarea
          ref={textAreaRef}
          onBlur={handleBlur}
          style={{
            position: "fixed",
            top: selectedElement.y1 - 2, // sets height of editing area to exactly where text is
            left: selectedElement.x1,
            font: "24px Chivo",
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            resize: "auto",
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
          }}
        />
      ) : null}

      {/* DISPLAY STICKY NOTE ON SCREEN */}
      {notesState.notes.map((note) => (
        <div
          className="note"
          draggable="true"
          onDragEnd={dropNote}
          key={note.id}
        >
          <div
            className="close"
            onClick={() => dispatch({ type: "delete_note", payload: note })}
          >
            <img src={Close} className="close-button" alt="" />
          </div>
          <pre className="text">{note.text}</pre>
        </div>
      ))}

      {/* CANVAS CONTAINER */}
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
      ></canvas>
    </div>
  
  
  );
}
