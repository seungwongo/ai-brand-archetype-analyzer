// src/components/QuestionScreen.js
import React, { useState } from "react";
// import "./QuestionScreen.css";

const questions = [
  {
    id: 1,
    text: "당신의 브랜드는 어떤 가치를 가장 중요하게 생각하나요?",
    options: [
      { value: "a", text: "자유와 창의성" },
      { value: "b", text: "안정성과 신뢰성" },
      { value: "c", text: "혁신과 도전" },
      { value: "d", text: "전통과 전문성" },
      { value: "e", text: "사회적 책임과 윤리" },
    ],
  },
  {
    id: 2,
    text: "당신의 브랜드가 고객에게 주고 싶은 주요 감정은 무엇인가요?",
    options: [
      { value: "a", text: "흥분과 열정" },
      { value: "b", text: "안정감과 편안함" },
      { value: "c", text: "성취감과 권위" },
      { value: "d", text: "소속감과 연결" },
      { value: "e", text: "희망과 영감" },
    ],
  },
  {
    id: 3,
    text: "당신의 브랜드가 해결하려는 주요 문제는 무엇인가요?",
    options: [
      { value: "a", text: "일상의 스트레스와 지루함" },
      { value: "b", text: "불확실성과 위험" },
      { value: "c", text: "비효율성과 불편함" },
      { value: "d", text: "단절과 외로움" },
      { value: "e", text: "불평등과 사회적 이슈" },
    ],
  },
  {
    id: 4,
    text: "당신의 브랜드가 추구하는 이미지는 무엇인가요?",
    options: [
      { value: "a", text: "대담하고 독특한" },
      { value: "b", text: "고급스럽고 세련된" },
      { value: "c", text: "친근하고 접근하기 쉬운" },
      { value: "d", text: "전문적이고 신뢰할 수 있는" },
      { value: "e", text: "현대적이고 혁신적인" },
    ],
  },
  {
    id: 5,
    text: "당신의 브랜드가 고객과 소통하는 방식은 어떤가요?",
    options: [
      { value: "a", text: "감성적이고 개인적인" },
      { value: "b", text: "전문적이고 정보적인" },
      { value: "c", text: "유머러스하고 캐주얼한" },
      { value: "d", text: "영감을 주고 동기부여하는" },
      { value: "e", text: "명확하고 간결한" },
    ],
  },
  {
    id: 6,
    text: "당신의 브랜드가 가진 가장 큰 강점은 무엇인가요?",
    options: [
      { value: "a", text: "창의성과 독창성" },
      { value: "b", text: "신뢰성과 일관성" },
      { value: "c", text: "적응성과 유연성" },
      { value: "d", text: "전문성과 권위" },
      { value: "e", text: "공감과 이해력" },
    ],
  },
  {
    id: 7,
    text: "당신의 브랜드가 목표로 하는 고객층은 어떤 사람들인가요?",
    options: [
      { value: "a", text: "모험을 즐기는 개척자들" },
      { value: "b", text: "안정과 품질을 중시하는 사람들" },
      { value: "c", text: "트렌드에 민감한 얼리어답터" },
      { value: "d", text: "가치와 의미를 중요시하는 사람들" },
      { value: "e", text: "효율성과 실용성을 추구하는 사람들" },
    ],
  },
  {
    id: 8,
    text: "당신의 브랜드가 세상에서 차지하는 위치는 어디인가요?",
    options: [
      { value: "a", text: "새로운 트렌드를 만드는 선도자" },
      { value: "b", text: "업계의 표준을 정하는 권위자" },
      { value: "c", text: "사람들의 일상을 함께하는 친구" },
      { value: "d", text: "변화와 혁신을 이끄는 혁명가" },
      { value: "e", text: "삶의 질을 높이는 조력자" },
    ],
  },
  {
    id: 9,
    text: "당신의 브랜드가 지향하는 미래는 어떤 모습인가요?",
    options: [
      { value: "a", text: "모두가 즐겁고 행복한 세상" },
      { value: "b", text: "더 효율적이고 스마트한 세상" },
      { value: "c", text: "더 공정하고 평등한 세상" },
      { value: "d", text: "전통과 혁신이 공존하는 세상" },
      { value: "e", text: "자유롭고 창의적인 표현이 존중받는 세상" },
    ],
  },
  {
    id: 10,
    text: "당신의 브랜드가 가장 중요하게 생각하는 성공의 기준은 무엇인가요?",
    options: [
      { value: "a", text: "고객의 만족과 충성도" },
      { value: "b", text: "혁신과 창의적인 돌파구" },
      { value: "c", text: "사회적 영향력과 변화" },
      { value: "d", text: "안정적인 성장과 수익" },
      { value: "e", text: "업계 내 평판과 인정" },
    ],
  },
];

function QuestionScreen({ onSubmit, isLoading }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // 모든 질문에 답변했는지 확인
    if (Object.keys(answers).length < questions.length) {
      setError("모든 질문에 답변해주세요.");
      return;
    }

    onSubmit(answers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="question-screen">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="question-counter">
        질문 {currentQuestionIndex + 1} / {questions.length}
      </p>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.text}</h2>

        <div className="options-container">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              className={`option-button ${
                answers[currentQuestion.id] === option.value ? "selected" : ""
              }`}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && (
          <button
            className="nav-button prev"
            onClick={handlePrevious}
            disabled={isLoading}
          >
            이전
          </button>
        )}

        {currentQuestionIndex === questions.length - 1 && (
          <button
            className="nav-button submit"
            onClick={handleSubmit}
            disabled={
              isLoading || Object.keys(answers).length < questions.length
            }
          >
            {isLoading ? "분석 중..." : "결과 보기"}
          </button>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default QuestionScreen;
