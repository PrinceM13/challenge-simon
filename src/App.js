function App() {
  return (
    <div className="container">
      <h1 className="text-primary">matching game</h1>
      <div className="btn-group">
        <button className="btn btn-m btn-outline-success">Start <i class="fa-regular fa-circle-play"></i></button>
        <button className="btn btn-m btn-outline-secondary">Pause <i class="fa-regular fa-circle-pause"></i></button>
        <button className="btn btn-m btn-outline-danger">Stop <i class="fa-regular fa-circle-stop"></i></button>
      </div>
    </div>
  );
}

export default App;
