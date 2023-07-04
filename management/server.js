const fs = require('fs'); //파일에 접근할수 있게해줌(DB)
const express = require('express'); // Express 프레임워크를 가져옴
const cors = require('cors'); // cors 모듈을 가져옴
const bodyParser = require('body-parser');

const app = express(); // Express 애플리케이션 생성
const port = process.env.PORT || 5000; // 포트 설정

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.urlencoded({ extended: true }))

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

app.use(cors()); // cors 미들웨어를 Express 애플리케이션에 적용

const multer = require('multer');
const upload = multer({dest: './upload'});


app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0", 
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload')); //이미지 업로드

app.post('/api/customers', upload.single('image'), (req, res) => { //DB에 값 추가
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, 
      (err, rows, fields) => {
          res.send(rows);
      }
  );
});

app.delete('/api/customers/:id', (req, res) => { //값 삭제
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
          res.send(rows);
      }
  )
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
