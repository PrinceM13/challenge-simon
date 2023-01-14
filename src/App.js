import ColorBoard from "./components/ColorBoard";
import SimonContextProvider from "./components/context/SimonContext";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <SimonContextProvider>
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="d-flex flex-column justify-content-center">
          <Header />
          <ColorBoard />
          <Footer />
        </div>
      </div>
    </SimonContextProvider>
  );
}

export default App;
