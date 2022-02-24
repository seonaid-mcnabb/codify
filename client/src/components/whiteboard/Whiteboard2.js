import React, { useState, useLayoutEffect, useEffect, useRef, useReducer } from "react";
import { v4 as uuid } from 'uuid';
import "./Whiteboard.css";
import Toolbar from "./toolbar";
import Header from "../Header";
import rough from "roughjs/bundled/rough.esm";
import { getStroke } from 'perfect-freehand';
import { HuePicker } from "react-color";
import Lined from "./images/lined.jpg";
import Grid from "./images/grid.png";
import Close from "./images/close.png";


const generator = rough.generator(); // generator allows user to create a drawable object - to be used for shapes later with .draw method


const nearPoint = (x, y, x1, y1, name) => { // function checks if mouse is near the corner/end of the shape for resizing
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null; // mouse is subtracting shape sides and checking if they're near each other, < 5 is the offset, .abs deals with positive and negative digits
}

const onLine = (x1, y1, x2, y2, x, y, maxoffset = 1) => {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c)); // if c is between a + b, and equal distance between a + c, and b + c
    return Math.abs(offset) < maxoffset ? "inside" : null; // offset < 5 gives some leeway so user doesn't have to click exactly on the line
}

const positionWithinElement = (x, y, element) => {
    const { type, x1, y1, x2, y2 } = element;
    switch(type) {
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
            return topLeft || topRight || bottomLeft || bottomRight || inside; // return what is found
        case "circle": // currently not working properly as the circle can be moved from anywhere on the screen....
            // const radius = (x2 - x1 + (y2 - y1)) / 1.4; // defines radius
            // const x0 = (x1 + x2) / 2;
            // const y0 = (y1 + y2) / 2;
            // return Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < radius;
            break;
        case "pencil":
            const betweenAnyPoint = element.points.some((point, index) => { // checking if any points are on the line and returning true for each one
                const nextPoint = element.points[index + 1];
                if (!nextPoint) return false;
                return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) !== null;
            })
            return betweenAnyPoint ? "inside": null;
        case "text":
            return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
        default:
            throw new Error("Type not recognised");


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

  const useHistory = (initialState, elements) => { // custom hook to save history of state changes for undo/redo function
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

  const initialNoteState = {
    notes: []
  }

  const notesReducer = (prevState, action) => {
  switch(action.type) {
    case "add_note":
      const newState = {
        notes: [...prevState.notes, action.payload]
      }
      return newState;
    case "delete_note":
      const updatedState = {
        ...prevState,
        notes: prevState.notes.filter(note => note.id !== action.payload.id)
      }
      return updatedState;
    default:
      throw new Error("Not recognised");
  
  }
}

export default function Whiteboard2() {

    const [elements, setElements, undo, redo] = useHistory([]); // keeping track of created elements
    const [action, setAction] = useState("none");
    const [tool, setTool] = useState("text");
    const [selectedElement, setSelectedElement] = useState(null);
    const [lineColour, setLineColour] = useState("#000000");
    const [showColours, setShowColours] = useState(false);
    const [showFillColours, setShowFillColours] = useState(false);
    const [fillColour, setFillColour] = useState("#ffffff");
    const [lineWidth, setLineWidth] = useState(3);
    const [background, setBackground] = useState("#ffffff");
    const [backgroundImage, setBackgroundImage] = ("");
    const textAreaRef = useRef();
    const [showStickyNote, setShowStickyNote] = useState(false);
    const [noteInput, setNoteInput] = useState("");
    const [notesState, dispatch] = useReducer(notesReducer, initialNoteState);
    // const [penSelected, setPenSelected] = useState(false);
    // const [pencilSelected, setPencilSelected] = useState(true);
    // const [arrowSelected, setArrowSelected] = useState(false);


    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d"); // gets canvas's context = what the drawings will be rendered on. 2d = creation of object with 2d rendering context

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineCap = 5;
        ctx.strokeStyle = lineColour;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas each time it is re-rendered

        const roughCanvas = rough.canvas(canvas);

        elements.forEach(element => {
          if (action === "writing" && selectedElement.id === element.id) return;
          drawElement(roughCanvas, ctx, element)
        })


    }, [elements, lineColour, background, action, selectedElement]);

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
    }, [background, undo, redo])

    useEffect(() => {
      const textArea = textAreaRef.current;
      if (action === "writing") {
        textArea.focus(); // allows users to type as soon as mouse is clicked
        textArea.value = selectedElement.text;

      }
    }, [action, selectedElement])
    

    const createElement = (id, x1, y1, x2, y2, type) => { // returns coordinates based on position of cursor and element to be drawn
        if (type === "line") {
            // const line = gen.line(400, 500, 600, 500); // (x1, y1, x2, y2)
            const roughElement = generator.line(x1, y1, x2, y2, {stroke: lineColour});
            return { id, x1, y1, x2, y2, type, roughElement };

        } else if (type === "square") {
            // const rect = gen.rectangle(100, 200, 200, 300); // (x1, y1, width, height), width = x2-x1, height = y2-y1
            const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, { fill: fillColour, hachureGap: 5, stroke: lineColour });
            return { id, x1, y1, x2, y2, type, roughElement };

        } else if (type === "circle") {
            // const circle = gen.circle(500, 300, 200); // (x1, y1, diameter), diameter = 2 * (x2-x1 + y2-y1)
            // const roughElement = generator.circle(x1, y1, 2 * (x2 - x1 + y2 - y1), { roughness: 0.5, fill: fillColour, stroke: lineColour, strokeWidth: lineWidth });
            // return { id, x1, y1, x2, y2, type, roughElement };

        } else if (type === "pencil") {
            return { id, type, points: [{x: x1, y: y1}], lineColour };

        } else if (type === "text") {
          return { id, type, x1, y1, x2, y2, text: "" };
        }
    }


    const updateElement = (id, x1, y1, x2, y2, type, options) => {

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
            case "text":
              const textWidth = document.getElementById("canvas").getContext("2d").measureText(options.text).width;
              const textHeight = 24;
                elementsCopy[id] = {
                  ...createElement(id, x1, y1, x1 + textWidth, y1 + textHeight, type),
                  text: options.text
                }
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
              ctx.fillStyle = lineColour;
              const stroke = getStroke(element.points, {
                  size: lineWidth,
                  thinning: 0
              })
              const pathData = getSvgPathFromStroke(stroke);

              const myPath = new Path2D(pathData);
              console.log(myPath)

              ctx.fill(myPath);
              // const stroke = getSvgPathFromStroke(getStroke(element.points, pencilOptions));
              // ctx.fill(new Path2D(stroke));
              break;
          case "text":
              ctx.textBaseline = "middle"; // where text appears against the cursor when you click, and where select tool can grab it
              ctx.font = "24px Chivo";
              ctx.fillStyle = "#000000";
              ctx.fillText(element.text, element.x1, element.y1);
              break;
          default:
              throw new Error("Type not recognised")
        }
      }

    const addNote = (e) => {
      e.preventDefault();

      if (!noteInput) return;

      const newNote = {
        id: uuid(),
        text: noteInput,
      }

      dispatch({type: "add_note", payload: newNote});
    }

    const dropNote = (e) => {
      e.target.style.left = `${e.pageX - 50}px`;
      e.target.style.top = `${e.pageY - 50}px`;
    }

    const dragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

      const handleColourChange = (color) => {
        console.log(color);
        document.getElementById("colour-button").style.backgroundColor = color.hex;
        // setLineColour((prevState) => [...prevState, color.hex]);
        const newState = color.hex;
        setLineColour(newState); // adds point in time to history state that we can go back and forth from, overrides any undone steps
        // setIndex(prevState => prevState + 1);
    }

    const handleFillColourChange = (color) => {
        console.log(color);
        document.getElementById("fill-button").style.backgroundColor = color.hex;
        setFillColour(color.hex);
    }

    const startDrawing = (e) => { // onMouseDown
      if (action === "writing") return;
        const { clientX, clientY } = e; // mouse coordinates relative to window size
        if (tool === "select") {             
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                if (element.type === "pencil") {
                    const xOffsets = element.points.map(point => clientX - point.x);
                    const yOffsets = element.points.map(point => clientY - point.y);;
                    setSelectedElement({...element, xOffsets, yOffsets});

                } else {
                    const offsetX = clientX - element.x1;
                    const offsetY = clientY - element.y1;
                    setSelectedElement({...element, offsetX, offsetY});
                }

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

            setAction(tool === "text" ? "writing" : "drawing");

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
            if (selectedElement.type === "pencil") {
                const newPoints = selectedElement.points.map((_, index) => ({
                        x: clientX - selectedElement.xOffsets[index],
                        y: clientY - selectedElement.yOffsets[index]
                }))
                const elementsCopy = [...elements];
                elementsCopy[selectedElement.id] = {
                    ...elementsCopy[selectedElement.id],
                    points: newPoints
                }
                setElements(elementsCopy, true);
            } else {
                const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
                const width = x2 - x1;
                const height = y2 - y1;
                const newX1 = clientX - offsetX;
                const newY1 = clientY - offsetY;
                const options = type === "text" ? {text: selectedElement.text} : {};
                updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type, options); // ensures last coords stored are the ones where the mouse stops moving
            }


        } else if (action === "resizing") {
            const { id, type, position, ...coordinates } = selectedElement;
            const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates);
            updateElement(id, x1, y1, x2, y2, type);
        }
    }

    const finishDrawing = (e) => { // sets drawing state to false when mouse is released, stores end coords for shape and stroke so the final element is rendered on board
        const { clientX, clientY } = e;
        if (selectedElement) {

            if (selectedElement.type === "text" && clientX - selectedElement.offsetX === selectedElement.x1 && clientY - selectedElement.offsetY === selectedElement.y1) { // if mouse position hasn't moved - then text can be edited
              setAction("writing");
              return;
            }

            const index = selectedElement.id;
            const { id, type } = elements[index];
            if ((action === "drawing" || action === "resizing") && adjustmentRequired(type)) {
                const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
                updateElement(id, x1, y1, x2, y2, type);
            }
        }
        if (action === "writing") return;

        setAction("none");
        setSelectedElement(null);
    }

    const handleBlur = (e) => {
      const { id, x1, y1, type } = selectedElement;
      setAction("none");
      setSelectedElement(null);
      updateElement(id, x1, y1, null, null, type, {text: e.target.value});
    }


  return (
    <div className="canvas-container" onDragOver={dragOver}>
        <div style={{position: "fixed"}}>
        {/* buttons are fixed so canvas isn't offset, add toolbar here? */}
        <Header />
        {/* <Link to="/"><img src={Codify} className="logo" alt="Codify logo" /></Link> */}
        <h1>Whiteboard</h1>
        <input
            type="radio"
            id="select"
            checked={tool === "select"}
            onChange={() => setTool("select")}
            // className={tool === "select" ? "arrow-cursor" : null}
            />
            <label htmlFor="select">Select</label>
            <input
            type="radio"
            id="line"
            checked={tool === "line"}
            onChange={() => setTool("line")}
            className={tool === "line" ? "shape-cursor" : null}
            />
            <label htmlFor="line">Line</label>
            <input
            type="radio"
            id="pencil"
            checked={tool === "pencil"}
            onChange={() => setTool("pencil")}
            className={tool === "pencil" ? "freehand-cursor" : null}
            />
            <label htmlFor="pencil">Pencil</label>
            <input
            type="radio"
            id="square"
            checked={tool === "square"}
            onChange={() => setTool("square")}
            className={tool === "square" ? "shape-cursor" : null}
            />
            <label htmlFor="square">Square</label>
            <input
            type="radio"
            id="circle"
            disabled={true}
            checked={tool === "circle"}
            onChange={() => setTool("circle")}
            className={tool === "circle" ? "shape-cursor" : null}
            />
            <label htmlFor="circle">Circle</label>
            <input
            type="radio"
            id="text"
            checked={tool === "text"}
            onChange={() => setTool("text")}
            // className={tool === "circle" ? "shape-cursor" : null}
            />
            <label htmlFor="text">Text</label>
            <button
              title="Increase"
              id="increase-thickness"
              onClick={() => {
                setLineWidth(prevState => prevState + 1);
              }}
            >
              +
            </button>
            <button
              title="Decrease"
              id="decrease-thickness"
              onClick={() => {
                setLineWidth(prevState => prevState - 1);
              }}
            >
              -
            </button>
            <button
              title="Sticky"
              id="sticky-notes"
              onClick={() => {
                setShowStickyNote(!showStickyNote);
              }}
            >
              Sticky Note
            </button>
        { showStickyNote ? (
          <form className="sticky-note" onSubmit={addNote}>
            <textArea value={noteInput}
            onChange={e => setNoteInput(e.target.value)}            
            placeholder="Add text..."></textArea>
            <button className="add-note">Add</button>
          </form>
        ) : null }
            <button
              title="White background"
              id="white"
              onClick={() => {
                setBackground("#ffffff");
              }}
              className={background === "#ffffff" ? "#canvas" : null}
            >
              White Background
            </button>
            <button
              title="Lined background"
              id="lined"
              onClick={() => {
                setBackground(Lined);
              }}
              className={background === "lined" ? "lined-background" : null}
            >
              Lined Background
            </button>
            <button
              title="Grid background"
              id="grid"
              onClick={() => {
                setBackground(Grid);
              }}
              className={background === "grid" ? "grid-background" : null}
            >
              Grid Background
            </button>
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

        {action === "writing" ?  (
        <textarea ref={textAreaRef} onBlur={handleBlur} 
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
          background: "transparent"
           }} />) : null }

        {notesState
        .notes
        .map(note => (
          <div className="note"
          draggable="true"
          onDragEnd={dropNote}
          key={note.id}>
            <div className="close" onClick={() => dispatch({ type: "delete_note", payload: note })}>
              <img src={Close} className="close-button" alt="" />
            </div>
            <pre className="text">{note.text}</pre>
          </div>
        ))
        }
        <canvas 
        id="canvas"
        className={background === "lined" ? "lined-background" : null} 
        width={window.innerWidth} 
        height={window.innerHeight}
        style={{  
            backgroundImage: `url(${background})`
          }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}>
            
            Canvas
        </canvas>
    </div>
  )
}