import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";

export default function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onEmailHandler(e) {
    setEmail(e.currentTarget.value);
  }

  function onPasswordHandler(e) {
    setPassword(e.currentTarget.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert(response.payload.message);
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
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <button>로그인</button>
      </form>
    </div>
  );
}
