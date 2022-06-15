const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const config = require("./config/key");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("몽고 연결 성공!"))
  .catch((err) => console.log("몽고 에러 발생!", err));

app.get("/", (req, res) => res.send("서버 연결 성공"));

// 클라이언트에서 분석해서 가져옴(application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// 클라이언트에서 분석해서 가져옴(application/json)
app.use(bodyParser.json());
app.use(cookieParser());

// database에 클라이언트 요청을 받고 저장함
app.post("/api/users/register", (req, res) => {
  // request body는 body-parser로 인해 생성되고 그것을 user에 저장함
  const user = new User(req.body);

  // req.body에서 온 비밀번호 정보를 암호화

  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

// endpoint 'login' 구현
app.post("/api/users/login", (req, res) => {
  // 1. 요청된 이메일을 db에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "등록된 이메일이 아닙니다.",
      });
    }

    // 2. 요청된 이메일이 db에 있다면 비밀번호 체크
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀립니다.",
        });
      }

      // 3. 비밀번호 일치 -> 유저 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰 저장 위치(쿠키, localStorage...)
        // cookieParser 사용
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).send({ success: true });
  });
});

// listen 상태이면 함수 실행
app.listen(port, () => console.log(`포트번호: ${port}`));
