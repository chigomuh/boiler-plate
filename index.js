const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://chigomuh:s2s3qwer@cluster0.r15z0.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("몽고 연결 성공!"))
  .catch((err) => console.log("몽고 에러 발생!", err));

app.get("/", (req, res) => res.send("Hello World, 하이요"));

// listen 상태이면 함수 실행
app.listen(port, () => console.log(`이 앱은 포트번호 ${port}에서 동작합니다.`));
