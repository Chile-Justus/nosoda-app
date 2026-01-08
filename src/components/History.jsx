export default function History({ history }) {
  return (
    <div className="history">
      <h3>History</h3>
      <ul>
        {history.map((date, index) => (
          <li key={index} style={{ "--i": index }}>
            {date}
          </li>
        ))}
      </ul>
    </div>
  );
}
