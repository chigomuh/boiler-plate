const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// userSchema 모델에 저장하기 전(save)에 콜백 함수 실행
userSchema.pre("save", function (next) {
  // 비밀번호 암호화
  const user = this;

  // 비밀번호 바꿀 시 암호화(조건)
  if (user.isModified("password")) {
    // next() -> save 단계로 돌아가라
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callbackFunc) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callbackFunc(err);
    else {
      callbackFunc(null, isMatch);
    }
  });
};

userSchema.methods.generateToken = function (callbackFunc) {
  const user = this;

  // jsonwebtoken으로 토큰 생성
  // 두개의 파라미터 더해서 토큰을 만듦
  // 2번째 파라미터로 토큰에서 id를 추출함
  // toHexString()은 평문이 아닌 id를 평문으로 고쳐줌
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return callbackFunc(err);
    callbackFunc(null, user);
  });
};

userSchema.statics.findByToken = function (token, callbackFunc) {
  const user = this;

  // 토큰 복호화
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 복호화한 유저 ID 확인
    // 확인된 ID === DB에 저장된 ID와 동일한가
    user.findOne(
      {
        _id: decoded,
        token: token,
      },
      function (err, user) {
        if (err) return callbackFunc(err);
        callbackFunc(null, user);
      }
    );
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
