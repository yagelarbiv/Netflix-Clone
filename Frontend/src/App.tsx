import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <div className="AppBody">
        <main>
          <Router />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
