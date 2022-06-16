import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onEmailHandler(e) {
    setEmail(e.currentTarget.value);
  }

  function onNameHandler(e) {
    setName(e.currentTarget.value);
  }

  function onPasswordHandler(e) {
    setPassword(e.currentTarget.value);
  }

  function onConfirmPasswordHandler(e) {
    setConfirmPassword(e.currentTarget.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인의 값이 같지 않습니다.");
    }

    const body = {
      email: email,
      name: name,
      password: password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("회원가입 규칙을 준수해주세요.");
      }
    });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHandler}
      >
        <label>이메일</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>이름</label>
        <input type="text" value={name} onChange={onNameHandler} />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
