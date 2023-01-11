import ColorBoard from "./components/ColorBoard";
import SimonContextProvider from "./components/context/SimonContext";
import Header from "./components/Header";

function App() {
  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <SimonContextProvider>
        <Header />
        <ColorBoard />
      </SimonContextProvider>
    </div>
  );
}

export default App;
