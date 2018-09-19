import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
  var squareStyle = {
    backgroundColor: 'white'
  }

  // For Bonus 5 (highlight winning squares)
  // put win propery in square component in board class. This is saying if win is true,
  // highlight the background color
  if (props.win) {
    squareStyle = {
      backgroundColor: '#FFFACD'
    }
  }
  

    return (
      <button className="square" style={squareStyle} onClick={props.onClick}>
        {props.value}
      </button>
    );

}

class Board extends React.Component {

  renderSquare(i) {

    // For Bonus 5 (highlight winning squares)
    // added win property here to check the winnerSquares function 
    // winnerSquares function has the square positions of the winning tiles
    // this checks if the current sqaure value is within the array of winning positons
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        win={this.props.winnerSquares.includes(i) ? true : false}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      isToggleOn: true,
    };

    this.handleClickButton = this.handleClickButton.bind(this);
    this.reverseOrder = this.reverseOrder.bind(this);
    
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  
  // For Bonus 4 (toggle order of moves ascending or descending)
  // setting state to true if we want to reverse order to make it descending
  // the function is called when you click the ascending/descending button
  // when creating the moves to display on the page, we say that if the button is clicked,
  // and therefore this function returns true, then show the moves reversed, so in descending order 
  
  handleClickButton() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    this.reverseOrder()
  }
  
  
  reverseOrder() {
    if (this.state.isToggleOn == true) {
      this.setState({
        reverse: true
      });
    }
    else {
      this.setState({
        reverse: false
      });
    }
    
  }


  

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const winnerSquares = calculateWinnerSquares(current.squares); 

    let moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';

      // For Bonus 2 (Bold currently selected item in move list)
      // Have the step you're on in history show as bolded
      // compare what move it is in the history to the step number in state, 
      // if they match, then return bolded

      if (move == this.state.stepNumber) {
        return (
          <li key={move}>
            <strong><a href="#" onClick={() => this.jumpTo(move)}>{desc}</a></strong>
          </li>
        );
      }
      else {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
          </li>
        );
      } 

    });

   // For Bonus 4 (toggle order of moves ascending or descending)
   // setting the moves to display as reversed
    if (this.state.reverse == true) {
      moves = moves.reverse()
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    // For Bonus 5 (highlight winning squares)
    // added winnerSquares as a property on Board comonent within game. 
    // This calls the winnerSqaure function so winnerSquares prop will be the array of winning positions
    
    // For Bonus 4 (toggle order of moves ascending or descending)
    // Calling the reverseOrder function so that when you click the button it calls the function
    
    return (
      <div className="game">
        <div className="board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerSquares={winnerSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={this.handleClickButton}>Ascending/ Descending</button>
        </div>
      </div>
    );
  }
}

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// For Bonus 5 (highlight winning squares)
// function to grab squares to grab the winning sqaures
// will return the array with the position of winning squares. E.g. [3,4,5]

function calculateWinnerSquares(squares) {
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
      return lines[i];
    }
  }
  return [];
}







// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
