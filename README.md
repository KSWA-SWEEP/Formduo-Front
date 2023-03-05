
# Form Duo📜


## 📖  Intro

### 설문조사 서비스 **폼듀** 프론트엔드 프로젝트
**2022. 08 ~ 2022. 12**


<br/>

## 🚩 Demo

### 🎞 Video

<br/>

### 🖥 Screenshots
![image](https://user-images.githubusercontent.com/64126621/222957731-b31ef973-ffde-4244-93cf-c120f288ad62.png)
![image](https://user-images.githubusercontent.com/64126621/222957738-c06227a9-75fb-473a-95b7-6e342c3c91f9.png)
![image](https://user-images.githubusercontent.com/64126621/222957743-f8360fa5-2cc9-43c7-8895-9e3929622d27.png)
![image](https://user-images.githubusercontent.com/64126621/222957748-36fb6529-c085-48f7-8666-227421c92a27.png)
![image](https://user-images.githubusercontent.com/64126621/222957751-77d9776b-f4d7-4675-b341-4ff8f2f7e72e.png)
![image](https://user-images.githubusercontent.com/64126621/222957753-2addef34-6331-429c-81ee-69047baf379a.png)
![image](https://user-images.githubusercontent.com/64126621/222957761-cf3e86f2-f474-44ef-aa1c-4b261b8f247e.png)
![image](https://user-images.githubusercontent.com/64126621/222957763-57683a6e-b430-4644-b039-2fdb37bb94c2.png)
![image](https://user-images.githubusercontent.com/64126621/222957773-6d54fdd7-efd9-448c-ba1a-4ca9319b7c97.png)
![image](https://user-images.githubusercontent.com/64126621/222957777-6b68cb29-aeb2-4886-bde0-2d7a9777b2ce.png)
![image](https://user-images.githubusercontent.com/64126621/222957786-77360864-9725-4246-b78a-1df8b45d5b19.png)
![image](https://user-images.githubusercontent.com/64126621/222957790-19e5ddc5-2f71-40b4-969f-8d3315c3d3e8.png)
![image](https://user-images.githubusercontent.com/64126621/222957806-6ecf6fa8-4dfd-4942-8b4f-f69fefdc8632.png)
![image](https://user-images.githubusercontent.com/64126621/222957814-8f2434b6-a46e-46e5-9a82-37b9f42b1a11.png)
![image](https://user-images.githubusercontent.com/64126621/222957830-4a49d953-9c43-4009-9da5-391e9a87db54.png)
![image](https://user-images.githubusercontent.com/64126621/222957840-d141257a-6872-4923-b48b-4e13df413a62.png)

<br/>

## 🚀 Quick Start

### 🖇 Git clone

```bash
git clone https://github.com/KSWA-SWEEP/Formduo-Front.git
```

### 📥 Install dependencies

```bash
cd Formduo-Front
npm install
```

### ⚙ Set environment variables

프로젝트 루트 경로에 환경 변수 파일 설정

⇒ 기본적으로 env 파일 만들어서 설정해주면 되며, `.env.local` 등 환경에 맞는 파일 추가하여 환경에 따른 변수 설정 가능

📋 *.env*

```yaml
# BE (Spring Cloud Gateway) url
NEXT_PUBLIC_API_URL=${Backend url}

# FE 도메인
NEXT_PUBLIC_BASE_URL=${domain url}
```

### 🛫 run app

```bash
# development 환경 실행 시
npm run dev

# production 환경 실행 시
npm run build
npm start
```


<br/>

## 🛠 Skills

### **Languages**

- JavaScript
- CSS

### **Dependencies**

*📋 package.json*

```json
...

"dependencies": {
    // Next.js - 13 버전 사용
    "next": "12.3.1", 
    // React - 18 버전 사용
    "react": "18.2.0",]
    "react-dom": "18.2.0",

    // 📄 UI    
    "@tailwindcss/forms": "^0.5.3",
    // Tailwind Component Library - modal, popup 등 사용
    "@headlessui/react": "^1.7.3",
    "@heroicons/react": "^2.0.12",
    "@mui/material": "^5.10.9",
    "@mui/styled-engine-sc": "^5.10.6",
    // 설문 분석 차트를 그리기 위한 Library
    "@nivo/bar": "^0.80.0",
    "@nivo/core": "^0.80.0",
    "@nivo/pie": "^0.80.0",

    // 📄 기타 기능
    // Datepicker Library
    "react-datepicker": "^4.8.0",
    // 설문 결과 csv 파일 생성을 위한 Library
    "react-csv": "^2.2.2",
    // 음성 설문 기능을 위한 음성 녹음 및 재생 Library
    "react-audio-player": "^0.17.0",
    // 전역 상태 관리를 위한 Library
    "recoil": "^0.7.6",
    // 설문 공유 QR Code 생성을 위한 Library
    "qrcode.react": "^3.1.0",
    // 회원 가입 메일 인증을 위한 Library
    "emailjs-com": "^3.2.0",
    // 환경 변수를 위한 Library
    "dotenv": "^16.0.3",
    "dotenv-webpack": "^8.0.1",
    // API 호출을 위한 Library
    "axios": "^1.1.3",
    // 쿠키 조회 및 수정을 위한 Library
    "cookies": "^0.8.0",
    "cookies-next": "^2.1.1",
    
    // 📄 Test
    // 단위 테스트를 위한 Library
    "jest": "^29.2.2",

}

...
```

<br/>

## 🗂 Directory

```markup
📙 jaksim31-front
    ├─ 📁 pages
    │  ├─ about
    │  │  └─ formduo.js
    │  ├─ account
    │  │  ├─ changePw.js
    │  │  ├─ myPage.js
    │  │  ├─ signIn.js
    │  │  └─ signUp.js
    │  ├─ api
    │  │  ├─ auth
    │  │  │  ├─ changePw.js
    │  │  │  ├─ isMember.js
    │  │  │  ├─ login.js
    │  │  │  ├─ logout.js
    │  │  │  ├─ members.js
    │  │  │  ├─ reissue.js
    │  │  │  └─ signup.js
    │  │  ├─ response
    │  │  │  ├─ all
    │  │  │  │  └─ [svyId].js
    │  │  │  ├─ conv
    │  │  │  ├─ conv.js
    │  │  │  ├─ create.js
    │  │  │  └─ [id].js
    │  │  └─ survey
    │  │     ├─ qbox.js
    │  │     ├─ surveys
    │  │     │  ├─ type.js
    │  │     │  └─ [id].js
    │  │     └─ surveys.js
    │  ├─ auth
    │  │  └─ singUp.js
    │  ├─ index.js
    │  ├─ survey
    │  │  ├─ create
    │  │  │  ├─ basic.js
    │  │  │  ├─ duo.js
    │  │  │  ├─ emotion.js
    │  │  │  ├─ finish.js
    │  │  │  └─ [surveyId].js
    │  │  ├─ emotion
    │  │  │  └─ [convId].js
    │  │  ├─ list
    │  │  │  └─ mySurvey.js
    │  │  ├─ modify
    │  │  │  └─ [modifyid].js
    │  │  ├─ preview
    │  │  │  ├─ basic.js
    │  │  │  ├─ duo.js
    │  │  │  └─ emotion.js
    │  │  ├─ result
    │  │  │  ├─ list.js
    │  │  │  └─ [surveyId].js
    │  │  ├─ share
    │  │  │  ├─ basic.js
    │  │  │  ├─ finish.js
    │  │  │  └─ [surveyId].js
    │  │  ├─ share.js
    │  │  └─ tutorial.js
    │  ├─ _app.js
    │  └─ _error.js
    │
    ├─ ✨ components
    │  ├─ common
    │  │  ├─ Footer.js
    │  │  ├─ Header.js
    │  │  ├─ Layout.js
    │  │  ├─ LazyShow.js
    │  │  ├─ Loading.js
    │  │  └─ Modal.js
    │  ├─ func
    │  │  └─ checkAccessToken.js
    │  └─ ui
    │     ├─ about
    │     │  └─ AboutFormDuo.js
    │     ├─ account
    │     │  ├─ FindUserEmail.js
    │     │  └─ UserInfo.js
    │     ├─ icon
    │     │  ├─ CustomizeSvg.js
    │     │  ├─ SurveySvg.js
    │     │  └─ TalkSvg.js
    │     ├─ MainContent.js
    │     ├─ MainPage.js
    │     ├─ PageTitle.js
    │     ├─ survey
    │     │  ├─ BasicSurveyCreate.js
    │     │  ├─ DuoSurveyCreate.js
    │     │  ├─ emotion
    │     │  │  ├─ Conversation.js
    │     │  │  ├─ Error.js
    │     │  │  └─ PieChart.js
    │     │  ├─ EmotionSurveyCreate.js
    │     │  ├─ input
    │     │  │  ├─ ContentItem.js
    │     │  │  ├─ ContentList.js
    │     │  │  ├─ QboxQuestion.js
    │     │  │  ├─ Question.js
    │     │  │  └─ Respond.js
    │     │  ├─ Qbox.js
    │     │  ├─ result
    │     │  │  ├─ chart
    │     │  │  │  ├─ BarChart.js
    │     │  │  │  ├─ RadarChart.js
    │     │  │  │  ├─ Slider.js
    │     │  │  │  ├─ SubjectiveChart.js
    │     │  │  │  └─ SubjectiveList.js
    │     │  │  ├─ ResponseTable.js
    │     │  │  ├─ SurveyAnalysis.js
    │     │  │  └─ SurveyResults.js
    │     │  ├─ show
    │     │  │  ├─ Checkbox.js
    │     │  │  ├─ Date.js
    │     │  │  ├─ Dropbox.js
    │     │  │  ├─ File.js
    │     │  │  ├─ Objective.js
    │     │  │  ├─ Rating.js
    │     │  │  ├─ ShowQuestionList.js
    │     │  │  ├─ ShowQuestionListItem.js
    │     │  │  ├─ Subjective.js
    │     │  │  ├─ Video.js
    │     │  │  └─ Voice.js
    │     │  ├─ SurveyGridList.js
    │     │  ├─ SurveyModify.js
    │     │  ├─ SurveyPreview.js
    │     │  ├─ SurveyResponse.js
    │     │  ├─ SurveyTableList.js
    │     │  ├─ SurveyTitleInput.js
    │     │  ├─ SurveyTitleShow.js
    │     │  └─ TutorialContent.js
    │     └─ temp
    │        ├─ Features.js
    │        ├─ Logo.js
    │        └─ Product.js
    │  
    ├─ 🧩 atoms
    │  ├─ accToken.js
    │  ├─ glbSvyContents.js
    │  ├─ refToken.js
    │  └─ subjAns.js
    │  
    ├─ 📦 public
    │  ├─ favicon.ico
    │  ├─ img
    │  │  ├─ black.png
    │  │  ├─ black@2x.png
    │  │  ├─ black@3x.png
    │  │  ├─ blue-yellow.png
    │  │  ├─ blue-yellow@2x.png
    │  │  ├─ blue-yellow@3x.png
    │  │  ├─ blue.png
    │  │  ├─ blue@2x.png
    │  │  ├─ blue@3x.png
    │  │  ├─ gray.png
    │  │  ├─ gray@2x.png
    │  │  ├─ gray@3x.png
    │  │  ├─ icon.png
    │  │  ├─ icon@2x.png
    │  │  ├─ icon@3x.png
    │  │  ├─ mainImage.jpg
    │  │  ├─ mixed.png
    │  │  ├─ mixed@2x.png
    │  │  ├─ mixed@3x.png
    │  │  ├─ survey.jpg
    │  │  ├─ svyThumbnail01.png
    │  │  ├─ svyThumbnail02.png
    │  │  ├─ svyThumbnail1.png
    │  │  ├─ svyThumbnail2.png
    │  │  ├─ tutorial
    │  │  │  ├─ AnalyzeChart.png
    │  │  │  ├─ create-buttons.png
    │  │  │  ├─ create-duo-add.png
    │  │  │  ├─ create-duo.png
    │  │  │  ├─ create-objective.png
    │  │  │  ├─ create-question-types.png
    │  │  │  ├─ create-subjective.png
    │  │  │  ├─ list-analyze.png
    │  │  │  ├─ list-share.png
    │  │  │  ├─ list-svy.png
    │  │  │  ├─ list.png
    │  │  │  ├─ menu.png
    │  │  │  ├─ preview.png
    │  │  │  ├─ save-child-popup-date.png
    │  │  │  ├─ save-child-popup.png
    │  │  │  └─ save-parent-popup.png
    │  │  ├─ userBasicImg.png
    │  │  ├─ white.png
    │  │  ├─ white@2x.png
    │  │  ├─ white@3x.png
    │  │  ├─ yellow-blue.png
    │  │  ├─ yellow-blue@2x.png
    │  │  ├─ yellow-blue@3x.png
    │  │  ├─ yellow.png
    │  │  ├─ yellow@2x.png
    │  │  └─ yellow@3x.png
    │  ├─ robots.txt
    │  ├─ sitemap-0.xml
    │  └─ sitemap.xml
    │  
    ├─ 📊 tests
    │  ├─ header.test.js
    │  ├─ login.test.js
    │  ├─ share.test.js
    │  ├─ signIn.test.js
    │  └─ surveyTitleShow.test.js
    │
    ├─ 🎨 styles
    │  ├─ globals.css
    │  └─ Home.module.css
    │
    ├─ 🔩 scripts
    │  └─ deploy.sh
    │
    ├─ 🧶 lib
    │  └─ gtag.js
    │
    ├─ 📖 README.md
    ├─ 🐳 Dockerfile
    ├─ 🤵🏻 Jenkinsfile
    ├─ .env
    ├─ package.json
    ├─ jest.config.js
    ├─ next.config.js
    ├─ sitemap.config.js
    └─ tailwind.config.js
```


<br/>


## ⚖ License
<img width="926" alt="image" src="https://user-images.githubusercontent.com/64126621/222958847-375b78c6-e1b2-4e2a-9c06-3c2e67c4b463.png">

         
<br/>   

## 🔥 Features

### 🎤 음성 설문 (Duo Survey)

- **음성 녹음**
  <br/>
  폼듀는 새로운 형식의 설문인 **음성 설문** 기능을 제공합니다. `react-audio-player` 라이브러리를 사용하여 음성 녹음 및 재생 기능을 구현하였으며, 음성 녹음을 완료하면 본인이 답변한 응답을 다시 확인해볼 수 있습니다.
  ![image](https://user-images.githubusercontent.com/64126621/222958945-47bdf1be-3a6d-477f-b3bf-b0dc865a424c.png)
  개인정보 보호를 위해 첫 음성 설문 참여 시 팝업을 통해 권한을 요청합니다.
  ![image](https://user-images.githubusercontent.com/64126621/222959049-b956cf12-02da-4f2f-9b55-f832ac20f7f0.png)

<br/>

- **Q Box**
  <br/>
  간편하고 빠른 설문 제작을 위해 폼듀는 Q-Box 기능을 제공합니다. Q-Box에서는 사용자들이 자주 하는 질문 및 사용자가 이전 설문에서 만들었던 질문 목록을 확인할 수 있으며, 설문에 바로 추가한 후 보기 및 질문을 자유롭게 수정할 수 있습니다.
  ![image](https://user-images.githubusercontent.com/64126621/222959127-c5993fb0-f2da-4525-b9a5-8b20b42339d5.png)
  ![image](https://user-images.githubusercontent.com/64126621/222959145-2381bf20-eab5-4ad6-b4d2-081fb8082ad9.png)
  ![image](https://user-images.githubusercontent.com/64126621/222959130-4e53c761-be70-4b83-a694-276531b13048.png)
  ![image](https://user-images.githubusercontent.com/64126621/222959136-e7199425-2072-41b6-909d-277bd9b21dfe.png)
    
