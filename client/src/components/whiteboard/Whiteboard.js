import React from 'react';
import '../whiteboard/whiteboard.css';
import Drawing from './drawingtool';
import Pencil from './penciltool';

export default function Whiteboard() {
  return (
    <div>
      <Drawing />
    </div>
  )
}
