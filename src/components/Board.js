import Square from "./Square";
import React from "react";

class Board extends React.Component {
  renderSquare(i) {
    const { lines, squares, onClick } = this.props
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i}
        win={lines && lines.includes(i) ? { backgroundColor: "yellow" } : {}}
      />
    );
  }

  render() {
    const rowNum = 3
    const squaNum = 3

    let board = []

    for(let i = 0; i < rowNum; i++){
      let row = []
      for(let j = 0; j < squaNum; j++){
        row.push(this.renderSquare(i * rowNum + j))
      }
      board.push(<div className="board-row" key={i}>{row}</div>)
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}

export default Board;
