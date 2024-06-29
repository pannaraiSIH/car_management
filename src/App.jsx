import "./App.css";
import CreatePage from "./components/CreatePage";
import HomePage from "./components/HomePage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/create/:id" element={<CreatePage />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
