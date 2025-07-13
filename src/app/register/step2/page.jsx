'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { registerUser } from '../../api/register2Api';

export default function RegisterPage2() {
  const router = useRouter();
  const {
    email, setEmail, isEmailValid, emailCodeInputEnabled,
    password, setPassword, isPasswordValid,
    confirmPassword, setConfirmPassword, isPasswordMatch,
    name, setName,
    phone, setPhone, isPhoneValid, phoneCodeInputEnabled,
    isFormValid,
    emailMessage, handleCheckEmail, checkingEmail,
    phoneMessage, handleCheckPhone, checkingPhone,
  } = useRegisterForm();

  const school = JSON.parse(localStorage.getItem('registerInfo') || '{}').school;
  const college = JSON.parse(localStorage.getItem('registerInfo') || '{}').college;
  const department = JSON.parse(localStorage.getItem('registerInfo') || '{}').department;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    if (!school || !college || !department) {
      alert('소속 정보를 다시 선택해주세요.');
      return;
    }
    const data = {
      email,
      password,
      name,
      phone,
      schoolId: school.id,
      collegeId: college.id,
      departmentId: department.id,
    };
    try {
      await registerUser(data);
      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    } catch (err) {
      alert('회원가입 중 문제가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="w-full relative bg-whitesmoke h-[1330px] overflow-hidden text-center text-4xl text-darkslategray font-pretendard">
      <form onSubmit={handleSubmit} className="absolute top-[160px] left-[calc(50%_-_328px)] w-[656px] flex flex-col items-center justify-start gap-7">
        <div className="self-stretch relative font-semibold">회원정보 입력하기</div>
        <div className="self-stretch flex flex-col items-center justify-start gap-[52px] text-left text-xs text-dimgray-100">
          <div className="self-stretch flex flex-col items-start justify-start gap-8">
            <div className="self-stretch flex flex-col items-start justify-start gap-2">
              <b className="self-stretch relative">소속</b>
              <div className="self-stretch rounded-xl bg-white border-dodgerblue border-solid border-[1px] flex flex-row items-center justify-start py-3 px-4 gap-1 text-base text-dimgray-200">
                <b className="relative">{school?.name ?? ''}</b>
                <b className="relative">{college?.name ?? ''}</b>
                <b className="relative">{department?.name ?? ''}</b>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-3">
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <b className="self-stretch relative">아이디(이메일)</b>
                <div className="self-stretch flex flex-row items-center justify-start gap-2 text-base text-silver">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="아이디로 이용할 이메일을 입력해주세요."
                    className="w-[556px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-[43px] px-4"
                  />
                  <button
                    type="button"
                    onClick={handleCheckEmail}
                    disabled={checkingEmail || !isEmailValid}
                    className="w-[92px] rounded-lg bg-white border-silver border-solid border-[1px] box-border h-[43px] flex items-center justify-center"
                  >
                    중복확인
                  </button>
                </div>
                {email && !isEmailValid && (
                  <p className="text-red-500 text-sm mt-1">※ 이메일 형식이 올바르지 않습니다.</p>
                )}
                {emailMessage && (
                  <p className={`text-sm mt-1 ${emailMessage.includes('인증코드') ? 'text-green-600' : 'text-red-500'}`}>
                    {emailMessage}
                  </p>
                )}
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <b className="self-stretch relative">이메일 인증코드</b>
                <input type="text" disabled={!emailCodeInputEnabled} placeholder="작성한 이메일로 받은 인증번호를 입력하세요." className="w-[656px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-[43px] px-4" />
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-3">
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <b className="self-stretch relative">비밀번호</b>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="영문/숫자/특수문자를 모두 포함하여 8 ~ 20자를 입력하세요."
                  className="w-[656px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-[43px] px-4"
                />
                {!isPasswordValid && password && (
                  <p className="text-red-500 text-sm mt-1">※ 영문/숫자/특수문자 모두 포함 8~20자</p>
                )}
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <b className="self-stretch relative">비밀번호 확인</b>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 한번 입력하세요."
                  className="w-[656px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-[43px] px-4"
                />
                {!isPasswordMatch && confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">※ 비밀번호가 일치하지 않습니다.</p>
                )}
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-2">
              <b className="self-stretch relative">이름</b>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요."
                className="w-[656px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-[43px] px-4"
              />
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-3">
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <b className="self-stretch relative">전화번호</b>
                <div className="w-[656px] flex flex-row items-center justify-start gap-2 text-base text-silver">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="전화번호를 입력하세요(예시: 01012345678)"
                    className="w-[556px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-[43px] px-4"
                  />
                  <button
                    type="button"
                    onClick={handleCheckPhone}
                    disabled={checkingPhone || !isPhoneValid}
                    className="w-[92px] rounded-lg bg-white border-silver border-solid border-[1px] box-border h-[43px] flex items-center justify-center"
                  >
                    중복확인
                  </button>
                </div>
                {phoneMessage && (
                  <p className={`text-sm mt-1 ${phoneMessage.includes('인증번호') ? 'text-green-600' : 'text-red-500'}`}>
                    {phoneMessage}
                  </p>
                )}
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-2">
                <b className="self-stretch relative">전화번호 인증번호</b>
                <input type="text" disabled={!phoneCodeInputEnabled} placeholder="인증번호 6자리를 입력하세요." className="w-[656px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-[43px] px-4" maxLength={6} />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-[376px] rounded-lg bg-silver flex flex-row items-center justify-center py-4 px-0 box-border text-center text-base text-white font-semibold"
            disabled={!isFormValid}
          >
            회원가입 완료하기
          </button>
        </div>
      </form>
      <div className="absolute top-[1130px] left-[0px] bg-gainsboro-200 w-[1920px] h-[200px]" />
    </div>
  );
}
