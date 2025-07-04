// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import LoginForm from "@/components/ui/common/LoginForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const { accessToken, refreshToken, role, email: userEmail } = response.data;
  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("role", role);
      if (autoLogin) {
        localStorage.setItem("autoLogin", "true");
      }
  
      router.push("/dashboard");
    } catch (error) {
      alert("로그인에 실패했습니다.");
    }
  };
  

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      autoLogin={autoLogin}
      onAutoLoginChange={setAutoLogin}
      onSubmit={handleLogin}
    />
  );
}