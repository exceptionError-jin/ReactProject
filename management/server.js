const express = require('express'); // Express 프레임워크를 가져옴
const cors = require('cors'); // CORS 모듈을 가져옴

const app = express(); // Express 애플리케이션 생성
const port = process.env.PORT || 5000; // 포트 설정

app.use(cors()); // CORS 미들웨어를 Express 애플리케이션에 적용

app.get('/api/customers', (req, res) => {
  const customers = [ // customers 배열 생성
    {
      id: 1,
      name: "김진",
      image: "https://picsum.photos/id/1/64/64",
      birthday: "980216",
      gender: "남",
      job: "무직(로또 당첨 예정)"
    },
    {
      id: 2,
      name: "진",
      image: "https://picsum.photos/id/2/64/64",
      birthday: "980211",
      gender: "여",
      job: "맥도날드 대표"
    },
    {
      id: 3,
      name: "김",
      image: "https://picsum.photos/id/3/64/64",
      birthday: "980212",
      gender: "남",
      job: "아마존 대표"
    }
  ];

  res.json(customers); // customers 배열을 JSON 형식으로 응답
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`); // 서버가 실행되었음을 터미널에 출력
});
