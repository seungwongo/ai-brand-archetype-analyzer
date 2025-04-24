// src/components/ResultScreen.js
import React from "react";
// import "./ResultScreen.css";

function ResultScreen({ result, onRestart }) {
  if (!result) {
    return <div className="loading">결과를 불러오는 중...</div>;
  }

  return (
    <div className="result-screen">
      <div className="result-container">
        <h2 className="result-title">당신의 브랜드 아키타입</h2>

        <div className="archetype-card">
          <h3 className="archetype-name">{result.archetype}</h3>
          <div className="archetype-description">
            <p>{result.description}</p>
          </div>
        </div>

        <div className="result-details">
          <h3>세부 분석</h3>
          <div className="analysis">
            <p>{result.analysis}</p>
          </div>
        </div>

        <div className="characteristic-section">
          <h3>주요 특성</h3>
          <ul className="characteristics">
            {result.characteristics &&
              result.characteristics.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>

        <div className="recommendation-section">
          <h3>브랜딩 전략 추천</h3>
          <div className="recommendations">
            <p>{result.recommendations}</p>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart}>
          다시 테스트하기
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
