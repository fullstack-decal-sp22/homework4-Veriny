import React , {useState} from "react";
import './styles/Board.css';
import Square from "./Square";
import e from "express";

function Board() {

    const status = 'Next player: X';
    const [board, setBoard] = useState(Array.apply(null, Array(9)));
    const [currPlayer, setCurrPlayer] = useState("X");
    const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [1, 4, 7], [0, 3, 6], [2, 5, 8],[0, 4, 8]]; // Every way to win

    //Check for a winner
    function queryWinner() {
      for (let i = 0; i  < wins.length; i++) {
        const [first, second, third] = wins[i];
        const player = board[first]; // Grab the player we are checking for a victory
        if (player != null && board[second] === player && board[third] === player) {
            return player;
        }
      }
      return null;
    }


    // Handle click events
    function onClick(i) {
        const temp = board.slice() // copies the board
        if (!queryWinner && temp[i] != null) { // do if there's no winner currently and there's nothing in the square
            temp[i] = currPlayer; // Set the player
            setBoard(temp); // And update board
            //Then update who's turn it is
            if (currPlayer == "X") {
              setCurrPlayer("O");
              return;
            }
            setCurrPlayer("X");
        }
    }

    // Render squares
    function renderSquare(pr) {
      return <Square value={board[pr]} onClick={() => onClick(pr)}/>;
    }

    //Check for a winner before rerendering the board
    const winner = queryWinner();
    if (winner != null) {
      status = winner + " has won the game."
    } else {
      status = currPlayer + "'s turn to move."
    }

    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
        </div>
    )
}

export default Board;