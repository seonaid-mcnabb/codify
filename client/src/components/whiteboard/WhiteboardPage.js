import React from 'react';
import Whiteboard from './Whiteboard2';
import "./Whiteboard.css";


export default function WhiteboardPage() {
  return (
    <div>
      <div className='header'>
        <h1>Whiteboard</h1>
      </div>
      <div className='canvas-section'>
        <Whiteboard />
      </div>
    </div>
  )
}
