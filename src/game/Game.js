import React from 'react';
import Board from './board/Board'
import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: {col: null, row: null}
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const col = i % 3;
    const row = Math.floor(i / 3);
    
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        move: {col: col, row: row}
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    const history = this.state.history;
    this.setState({
      history: step ? history.slice(step) : [{
        squares: Array(9).fill(null),
        move: {col: null, row: null}
      }],
      stepNumber: step,
      xIsNext: !step ? !step : (step % 2) !== 0
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ?
        'Back to move #' + move + ` (${step.move.col}, ${step.move.row})` :
        'Reset game';
      return (
        <button key={move} className="time-travel" onClick={() => this.jumpTo(move)}>{desc}</button>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <h1>{status}</h1>
        <div className="game-board">
          <Board
            squares={current.squares}
            lastMove={current.move}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          {moves}
        </div>
      </div>
    );
  }
}

export default Game;