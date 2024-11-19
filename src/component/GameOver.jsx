export default function GameOver({ winner, rematch }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} wins!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button onClick={rematch}>Play Again</button>
      </p>
    </div>
  );
}
