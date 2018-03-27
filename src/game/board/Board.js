import React from 'react'
import Square from './square/Square'
import './Board.css'

class Board extends React.Component {
  renderSquare(i) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const lastMove = this.props.lastMove;
    const isCurrentlySelected = col === lastMove.col && row === lastMove.row;
    const isWinningSquare = this.props.winningLine && this.props.winningLine.includes(i)
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isSelected={!isWinningSquare && isCurrentlySelected}
        winningSquare={isWinningSquare}
        gameOverDraw={this.props.gameOverDraw}
      />
    );
  }

  render() {

    let content=[];
    let i = 0;
    for (let row = 0; row < 3; row++) {
      const rowContent=[];
      for(let col = 0; col < 3; col++) {
        rowContent.push(this.renderSquare(i));
        i++;
      }
      content.push(<div className="board-row">{rowContent}</div>);
    }

    return (
      <div className="board">
        {content}
      </div>
    );
  }
}

export default Board;