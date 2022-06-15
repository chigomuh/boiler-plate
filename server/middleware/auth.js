const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리(client <-> server) 토큰

  // 1. 쿠키에서 토큰 가져오기(클라이언트)
  let token = req.cookies.x_auth;

  // 2. 토큰 복호화 -> 유저 찾기(ID)
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });

  // 3-1. 유저가 있다면 인증 성공

  // 3-2. 유저가 없다면 인증 실패
};

module.exports = { auth };
