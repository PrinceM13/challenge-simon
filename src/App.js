import ColorBoard from "./components/ColorBoard";
import Header from "./components/Header";

function App() {
  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <Header />
      <ColorBoard />
    </div>
  );
}

export default App;
