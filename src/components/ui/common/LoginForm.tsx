// components/ui/common/LoginForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/ui/common/FormInput";
import React from "react";

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  autoLogin: boolean;
  onAutoLoginChange: (value: boolean) => void;
  onSubmit: () => void;
};

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  autoLogin,
  onAutoLoginChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="min-h-screen bg-gray-1 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-10 py-12">
        <h1 className="text-2xl font-semibold text-center mb-10">로그인</h1>

        <FormInput
          label="이메일"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <FormInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="auto-login"
              checked={autoLogin}
              onCheckedChange={(checked) => onAutoLoginChange(Boolean(checked))}
            />
            <Label htmlFor="auto-login" className="text-sm text-gray-600">
              자동로그인
            </Label>
          </div>
          <Button variant="link" className="text-sm text-gray-600 p-0 h-auto">
            비밀번호를 잊으셨나요?
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="bg-point text-white py-3 rounded-md"
            onClick={onSubmit}
          >
            로그인
          </Button>
          <Button
            variant="outline"
            className="border border-point text-point py-3 rounded-md"
          >
            회원가입
          </Button>
        </div>
      </div>

      <footer className="mt-20 w-full h-[200px] bg-[#d9d9d9]" />
    </div>
  );
}