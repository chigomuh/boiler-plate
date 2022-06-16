import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios.get("/api/users/auth").then((response) => {
      setIsLogin(response.data.isAuth);
    });
  }, []);

  function onClickLoginHandler() {
    navigator("/login");
  }

  function onClickLogoutHandler() {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        setIsLogin(false);
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
      시작 페이지
      <button
        style={{
          display: isLogin ? "none" : "block",
        }}
        onClick={onClickLoginHandler}
      >
        로그인
      </button>
      <button
        style={{
          display: isLogin ? "block" : "none",
        }}
        onClick={onClickLogoutHandler}
      >
        로그아웃
      </button>
    </div>
  );
}
