import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateResume from "./components/CreateResume";
import ShowResume from "./components/ShowResume";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateResume />} />
      <Route path="/show-resume" element={<ShowResume />} />
    </Routes>
  );
}

export default App;
