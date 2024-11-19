import React, { useState } from "react";

export default function GameBoard({ turnHandler, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <ol key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <li key={cellIndex}>
              <button
                key={cellIndex}
                onClick={() => turnHandler(rowIndex, cellIndex)}
                disabled={cell !== null}
              >
                {cell}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
}
