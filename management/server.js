const fs = require('fs'); //파일에 접근할수 있게해줌(DB)
const express = require('express'); // Express 프레임워크를 가져옴
const cors = require('cors'); // CORS 모듈을 가져옴

const app = express(); // Express 애플리케이션 생성
const port = process.env.PORT || 5000; // 포트 설정

const data = fs.readFileSync('./database.json'); //DB값 가져오기
const conf = JSON.parse(data); //json으로 변환
const mysql = require('mysql'); //mysql라이브러리

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
}); //DB값 연동
connection.connect; //연결

app.use(cors()); // CORS 미들웨어를 Express 애플리케이션에 적용

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER", 
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`); // 서버가 실행되었음을 터미널에 출력
});
