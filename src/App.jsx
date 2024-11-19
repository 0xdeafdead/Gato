import React, { useState } from "react";

import GameBoard from "./component/GameBoard";
import Player from "./component/Player";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./component/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayer(log) {
  if (log.length > 0 && log[0].player === "X") {
    return "O";
  }
  return "X";
}

function deriveWinner(gameBoard, playerNames) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[combination[0].row][combination[0].column];
    const secondCell = gameBoard[combination[1].row][combination[1].column];
    const thirdCell = gameBoard[combination[2].row][combination[2].column];
    if (firstCell && firstCell === secondCell && firstCell === thirdCell) {
      return playerNames[firstCell];
    }
  }
  return null;
}

function createGameBoard(log) {
  let gameBoard = initialGameBoard.map((row) => [...row]);

  for (const turn of log) {
    gameBoard[turn.square.rowIndex][turn.square.columnIndex] = turn.player;
  }

  return gameBoard;
}

function App() {
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const [log, setLog] = useState([]);

  const activePlayer = deriveActivePlayer(log);
  const gameBoard = createGameBoard(log);
  const winner = deriveWinner(gameBoard, playerNames);
  let draw = log.length === 9 && !winner;

  function nameChange(symbol, name) {
    setPlayerNames((currentPlayers) => {
      return {
        ...currentPlayers,
        [symbol]: name,
      };
    });
  }

  function handleTurn(rowIndex, columnIndex) {
    setLog((currentLog) => {
      let activePlayer = deriveActivePlayer(currentLog);
      return [
        {
          player: activePlayer,
          square: { rowIndex, columnIndex },
        },
        ...currentLog,
      ];
    });
  }

  function resetGame() {
    setLog([]);
  }

  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={nameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={nameChange}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} rematch={resetGame} />}
        <GameBoard turnHandler={handleTurn} board={gameBoard} />
      </div>
      <Log log={log} />
    </>
  );
}

export default App;
