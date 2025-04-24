// src/App.js
import React, { useState } from "react";
import "./App.css";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("question");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitAnswers = async (answers) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();
      setResult(data);
      setCurrentScreen("result");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("답변을 제출하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentScreen("question");
    setResult(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>브랜드 아키타입 테스트</h1>
      </header>
      <main>
        {currentScreen === "question" && (
          <QuestionScreen
            onSubmit={handleSubmitAnswers}
            isLoading={isLoading}
          />
        )}
        {currentScreen === "result" && (
          <ResultScreen result={result} onRestart={handleRestart} />
        )}
      </main>
      <footer>
        <p>© 2025 브랜드 아키타입 테스트</p>
      </footer>
    </div>
  );
}

export default App;
