// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const OpenAI = require("openai");

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

// OpenAI 인스턴스 생성
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 브랜드 아키타입 분석 API 엔드포인트
app.post("/api/analyze", async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ error: "답변이 제공되지 않았습니다." });
    }

    // 질문과 답변 데이터 준비
    const questionsData = [
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

    // 사용자의 답변을 텍스트로 변환
    const userResponses = [];

    for (let i = 1; i <= 10; i++) {
      const answer = answers[i];
      if (answer) {
        const question = questionsData.find((q) => q.id === i);
        const selectedOption = question.options.find(
          (opt) => opt.value === answer
        );

        userResponses.push({
          question: question.text,
          answer: selectedOption.text,
        });
      }
    }

    // OpenAI API에 전달할 프롬프트 구성
    const prompt = `
다음은 브랜드 아키타입을 분석하기 위한 질문과 답변입니다:

${userResponses
  .map((item) => `질문: ${item.question}\n답변: ${item.answer}`)
  .join("\n\n")}

위 답변을 바탕으로 가장 적합한 브랜드 아키타입과 그 이유를 제공해주세요. 
아키타입으로는 다음 12가지 중 하나를 선택해 주세요: 
1. 영웅(Hero) 
2. 현자(Sage) 
3. 탐험가(Explorer) 
4. 반항아(Rebel) 
5. 마법사(Magician) 
6. 창조자(Creator) 
7. 보호자(Caregiver) 
8. 통치자(Ruler) 
9. 순수함(Innocent) 
10. 익살꾼(Jester) 
11. 평범한 사람(Everyman) 
12. 연인(Lover)

답변 형식은 다음과 같이 JSON 포맷으로 제공해주세요:
{
  "archetype": "아키타입 이름",
  "description": "아키타입에 대한 간략한 설명",
  "analysis": "답변을 바탕으로 이 아키타입이 적합한 이유에 대한 분석",
  "characteristics": ["주요 특성 1", "주요 특성 2", "주요 특성 3", "주요 특성 4", "주요 특성 5"],
  "recommendations": "이 아키타입을 바탕으로 한 브랜딩 전략 추천"
}
JSON 형식만 제공해주세요.
    `;

    // OpenAI API 호출
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });

    // API 응답에서 결과 추출
    const result = JSON.parse(response.output[0].content[0].text);

    res.json(result);
  } catch (error) {
    console.error("GPT API 호출 중 오류 발생:", error);
    res.status(500).json({
      error: "브랜드 아키타입 분석 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
});

// React 앱으로 라우트
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
