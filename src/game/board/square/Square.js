import React from 'react';
import './Square.css';

function Square(props) {
  const className = 'square'  
                    + (props.isSelected ? ' selected' : '') 
                    + (props.winningSquare ? ' winning' : '')
                    + (props.gameOverDraw ? ' draw' : '');
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;