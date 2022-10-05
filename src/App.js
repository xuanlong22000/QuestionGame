import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Finally from "./features/test/components/Finally/Finally";
import GameScreen from "./features/test/components/GameScreen/GameScreen";
import Result from "./features/test/components/Result/Result";
import StartGame from "./features/test/components/StartGame/StartGame";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartGame />} />
          <Route path="/gameScreen" element={<GameScreen />} />
          <Route path="/result" element={<Result />} />
          <Route path="/finally" element={<Finally />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
