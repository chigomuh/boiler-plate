const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const config = require("./config/key");

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("몽고 연결 성공!"))
  .catch((err) => console.log("몽고 에러 발생!", err));

app.get("/", (req, res) => res.send("node.js와 express를 활용한 서버 구축"));

// listen 상태이면 함수 실행
app.listen(port, () => console.log(`이 앱은 포트번호 ${port}에서 동작합니다.`));
