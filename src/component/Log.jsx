export default function Log({ log }) {
  return (
    <ol id="log">
      {log.map((turn, index) => (
        <li key={index}>
          Player {turn.player} played at row {turn.square.rowIndex}, column{" "}
          {turn.square.columnIndex}
        </li>
      ))}
    </ol>
  );
}
