import Board from "./Board";
import React from "react";

function calculateWinner(squares) {
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
    // console.log("squares[a] :>> ", squares[a]);
    // console.log("squares[b] :>> ", squares[b]);
    // console.log("squares[c] :>> ", squares[c]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    //「回到過去」的某個時刻，並且作了一個跟過去不一樣的新動作，
    // 這將會刪除從那一刻起所有屬於「未來」，但現在已不再正確的歷史 
    // 所以我們使用 this.state.slice(0, this.state.stepNumber + 1 ) 來代表每次 render 後的正確歷史
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    //如果勝負已經揭曉，或者某一格已被填入X或O，就忽略這次點擊
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // console.log("squares :>> ", squares);
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move)=>{
      console.log('step :>> ', step);
      const desc = move ? "Go to move #" + move : "Go to game start"
      return (
        // 歷史紀錄的索引值並不會被重新排序、刪除或插入，所以可以直接當作 key 值
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })


    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
