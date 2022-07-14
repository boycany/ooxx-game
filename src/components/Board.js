import Square from "./Square";
import React from "react";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
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
