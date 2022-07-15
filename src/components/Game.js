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
      // console.log(lines[i])
      return {
        winner: squares[a],
        lines: lines[i]
      };
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
          coordinate: {
            x: 0,
            y: 0
          }
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

    //準備塞入新的陣列
    const squares = current.squares.slice();

    //計算座標
    const x = i % 3 + 1
    const y = Math.floor(i / 3) + 1

    //如果勝負已經揭曉，或者某一格已被填入X或O，就忽略這次點擊
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
          coordinate: {
            x: x,
            y: y
          }
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    
    })
   
  }

  render() {
    // console.log('this.state :>> ', this.state);

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // 渲染出歷史紀錄
    const moves = history.map((step, move)=>{
      // console.log('step :>> ', step);
      const desc = move ? "Go to move # " + move + " ": "Go to game start"
      const { x, y } =  this.state.history[move].coordinate;

      return (
        // 歷史紀錄的索引值並不會被重新排序、刪除或插入，所以可以直接當作 key 值
        <li key={move}>
          <button 
            onClick={()=> this.jumpTo(move)} 
            className={ this.state.stepNumber === move ? "step-now": ""}
          >
            {desc}
            <span>
            { "(" + x + "," + y + ")"}
            </span>
          </button> 

        </li>
      )
    })

    //確認是否有贏家
    let lines;
    let status;
    if (winner) {
      status = "Winner: " + winner.winner;
      lines = winner.lines
    } else if (!current.squares.includes(null)){
      status = "This game ended in a tie."
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    // console.log('winner :>> ', winner);
    // console.log('lines :>> ', lines);
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={current.squares}
            lines={lines}
          />
        </div>
        <div className="game-info">
          <div className="result">{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
