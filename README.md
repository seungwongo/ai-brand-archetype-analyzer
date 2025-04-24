# 브랜드 아키타입 테스트 웹 애플리케이션 설치 가이드

이 문서는 브랜드 아키타입 테스트 웹 애플리케이션을 설치하고 실행하는 방법을 안내합니다.

## 기본 요구사항

- Node.js (v14 이상)
- npm (v6 이상)
- OpenAI API 키

## 설치 단계

### 1. 프로젝트 복제

```bash
git clone <your-repository-url>
cd brand-archetype-analyzer
```

### 2. 백엔드 설정

1. 루트 디렉토리에서 필요한 패키지 설치:

```bash
npm install
```

2. `.env` 파일 설정:

루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가합니다.

```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

OpenAI API 키를 발급받아 `your_openai_api_key_here` 부분을 실제 API 키로 교체하세요.

### 3. 프론트엔드 설정

1. 클라이언트 디렉토리로 이동하여 필요한 패키지 설치:

```bash
cd client
npm install
```

2. 루트 디렉토리로 돌아가기:

```bash
cd ..
```

## 애플리케이션 실행

### 개발 모드 실행

1. 백엔드 서버 실행:

```bash
npm run dev
```

2. 새 터미널 창에서 프론트엔드 클라이언트 실행:

```bash
npm run client
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 사용할 수 있습니다.

### 프로덕션 빌드

1. 프론트엔드 빌드:

```bash
npm run build-client
```

2. 전체 애플리케이션 실행:

```bash
npm start
```

이제 브라우저에서 `http://localhost:5000`으로 접속하여 애플리케이션을 사용할 수 있습니다.

## 프로젝트 구조

```
brand-archetype-analyzer/
├── server.js                # 백엔드 서버 진입점
├── package.json             # 백엔드 패키지 설정
├── .env                     # 환경 변수 설정
└── client/                  # 프론트엔드 디렉토리
    ├── public/              # 정적 파일
    ├── src/                 # 소스 코드
    │   ├── App.js           # 메인 애플리케이션 컴포넌트
    │   ├── App.css          # 메인 스타일시트
    │   ├── components/      # React 컴포넌트
    │   │   ├── QuestionScreen.js
    │   │   ├── QuestionScreen.css
    │   │   ├── ResultScreen.js
    │   │   └── ResultScreen.css
    │   ├── index.js         # React 진입점
    │   └── index.css        # 글로벌 스타일시트
    └── package.json         # 프론트엔드 패키지 설정
```

## 배포

이 애플리케이션은 Heroku와 같은 클라우드 플랫폼에 쉽게 배포할 수 있습니다.

Heroku에 배포하려면:

1. Heroku CLI 설치 및 로그인
2. 프로젝트 루트 디렉토리에서 다음 명령 실행:

```bash
heroku create
git push heroku main
```

3. 환경 변수 설정:

```bash
heroku config:set OPENAI_API_KEY=your_openai_api_key_here
```

4. 애플리케이션 열기:

```bash
heroku open
```

## 문제 해결

- **CORS 오류**: 프론트엔드와 백엔드 간의 통신 문제가 발생할 경우, 백엔드에 CORS 미들웨어를 추가하세요.
- **API 키 오류**: OpenAI API 키가 올바르게 설정되었는지 확인하세요.
- **서버 연결 오류**: 프론트엔드의 `package.json`에 설정된 proxy가 백엔드 서버 주소와 일치하는지 확인하세요.
