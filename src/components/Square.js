function Square({onClick, value, win}) {
  return (
    <button className="square" onClick={onClick} style={win}>
      {value}
    </button>
  );
}

export default Square;
