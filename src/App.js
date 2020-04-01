import React, { useState, useEffect } from 'react';
import './App.css';
import styled from "styled-components";


function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [hasWinner, setHasWinner] = useState(false);

  const WINNING_COMBOS = [
    [0, 1, 2], // 1st row
    [3, 4, 5], // 2nd row
    [6, 7, 8], // 3rd row
    [0, 3, 6], // 1st column
    [1, 4, 7], // 2nd column
    [2, 5, 8], // 3rd column
    [0, 4, 8], // Diagonal
    [2, 4, 6] // Diagonal
  ];

  // const setCurrentPlayer = () => {
  //   currentPlayer = "X" ? "O" : "X"
  // }

  const handleClick = (e) => {
    if (hasWinner === false) {
      const boardCopy = [...board];
      let index = e.target.id
      if (boardCopy[index] === "") {
        boardCopy[index] = currentPlayer;
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setBoard(boardCopy);
      }
    }
  };

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setHasWinner(false);
    setWinner("");
  }

  const StyledGenDiv = styled.div`
    // background-color: rgba(224, 255, 255, 0.87);
    background-color: rgba(255, 255, 255, 0.87);
    // background-image: url(https://s3-eu-west-1.amazonaws.com/images.linnlive.com/088a95d76368918abeed07e2548bca7d/d876665e-3194-4ba8-8bda-104700f411e7.jpg);
    border: 10px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    height: 660px;
    width: 650px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  const StyledBigDiv = styled.div`
    border: 5px solid #6e5773;
    border-radius: 10px;
    width: 380px;
    height: 380px;
    padding: 5px;
    background-color: #ffbaba;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `

  const StyledDiv = styled.div`
    background-color: white;
    border: 3px solid #6e5773;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    width: 110px;
    height: 110px;
    margin: 5px;
    font-size: 2em;
    &:hover {
      background-color: #6e5773;
      border: 3px solid white;
      color: white;
    }
  `

  useEffect(() => {
    WINNING_COMBOS.forEach(combo => {
      let joined = combo.map(i => {
        return board[i];
      });
      console.log(joined);
      if (joined.join("") === "XXX") {
        setWinner("X");
        setHasWinner(true);
      } else if (joined.join("") === "OOO") {
        setWinner("O");
        setHasWinner(true);
      } else if (
        joined.join("") !== "XXX" &&
        joined.join("") !== "OOO" &&
        board.join("").length === 9
      ) {
        setWinner("Draw");
      }
    })
  }, [board]);

  return (
    <div className="App" style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundImage: "url(https://wallpaperplay.com/walls/full/0/8/6/49639.jpg)"
    }}>
      <StyledGenDiv>
        <div className="playTitle">
          <span>melissa's</span>
        </div>
        {/* <hr className="horiLine"></hr> */}
        <h1 style={{
          textAlign: "center", lineHeight: "40px", margin: "0px 0px 25px 0px"
        }}>TIC TAC TOE</h1>
        <StyledBigDiv>
          {
            board.map((value, index) => {
              return (
                <StyledDiv key={index} id={index} onClick={handleClick}>{value}</StyledDiv>
              )
            })
          }
        </StyledBigDiv>
        <div className="currentPlayerMsg">
          CURRENT PLAYER IS: {currentPlayer}
        </div>
        <div className="winnerMsg">
          {winner ? (winner === 'Draw' ? 'boo its a draw' : `yay winner is ${winner}!`) : ''}
          {/* {winner === "Draw" ? "boo its a draw" : (("X" || "O") ? `yay winner is ${winner}!` : " ")} */}
        </div>
        <button className="resetBtn" onClick={resetGame}>
          Reset Game
        </button>
      </StyledGenDiv>
    </div >
  );
};

export default App;
