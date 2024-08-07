import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <div className="AppBody">
        <ToastContainer position="bottom-center" limit={1} />
        <main>
          <Router />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
