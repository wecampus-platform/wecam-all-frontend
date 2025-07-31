'use client';

import { BlueCheckIcon } from '@/components/icons/check-icons';
import { useRegisterForm2 } from '@/hooks/useRegisterForm2';
import { usePresidentRegisterStore } from '@/store/registerStore';

export default function RegisterForm2({ onSubmit }) {
  const { presidentRegisterInfo } = usePresidentRegisterStore();
  const { school, college, department } = presidentRegisterInfo || {};
  const {
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    name, setName,
    phoneNumber, setPhoneNumber,
    isEmailValid, isPasswordValid, isPasswordMatch, isPhoneNumberValid, isFormValid,
    emailMessage, handleCheckEmail, checkingEmail,
    phoneMessage, handleCheckPhoneNumber, checkingPhoneNumber,
    emailCodeInputEnabled, phoneCodeInputEnabled,
  } = useRegisterForm2();
  console.log(presidentRegisterInfo)

  return (
    <div className="w-full relative bg-whitesmoke h-[1330px] overflow-hidden text-left text-xs text-dimgray-100 font-pretendard">
      <div className="absolute top-[160px] left-[calc(50%-129px)] text-4xl font-semibold text-darkslategray text-center">
        대표자 회원정보 입력하기
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isFormValid) return;
          onSubmit({ email, password, name, phoneNumber });
        }}
        className="absolute top-[231px] left-[calc(50%-328px)] w-[656px] flex flex-col gap-[52px]"
      >
        {/* 소속 */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <b>소속</b>
            <div className="rounded-xl bg-white border border-point flex gap-1 px-4 py-3 text-base text-dimgray-200">
              <b>{school ?? '학교명'}</b>
              <b>{college ?? '단과대학'}</b>
              <b>{department ?? '학과'}</b>
            </div>
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <b>아이디(이메일)</b>
              <div className="flex gap-2">
                <div className={`w-[556px] h-[43px] rounded-xl border bg-white flex items-center justify-between px-4 text-base
                  ${isEmailValid ? 'border-point' : 'border-gray2'} focus-within:border-point`}>
                  <input
                    className="flex-1 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="wecampus@wecampus.ac.kr"
                  />
                  {isEmailValid && !checkingEmail && (
                    <BlueCheckIcon width={24} height={24} alt="check" />
                  )}
                </div>
                <button
                  type="button"
                  disabled={checkingEmail || !isEmailValid}
                  onClick={handleCheckEmail}
                  className="w-[92px] h-[43px] flex justify-center items-center cursor-pointer button-small"
                >
                  인증하기
                </button>
              </div>
              {email && !isEmailValid && (
                <p className="text-red-500 text-sm mt-1">※ 이메일 형식이 올바르지 않습니다.</p>
              )}
              {emailMessage && (
                <p className={`text-xs ${emailMessage.includes('인증코드') ? 'text-green-600' : 'text-red-500'}`}>
                  {emailMessage}
                </p>
              )}
            </div>

            {/* 이메일 인증코드 */}
            <div className="flex flex-col gap-2">
              <b>이메일 인증코드</b>
              <div className="w-[656px] h-[43px] rounded-xl bg-white border border-gray2 flex justify-between items-center px-4 text-base text-silver">
                <input
                  // disabled={!emailCodeInputEnabled}
                  className="flex-1 outline-none"
                  placeholder="작성한 이메일로 받은 인증번호를 입력하세요."
                />
                <div className="w-11 font-medium text-dimgray-100">15:00</div>
              </div>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <b>비밀번호</b>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[656px] h-[43px] rounded-xl bg-white border border-gray2 px-4 text-base text-black input-common"
                placeholder="영문/숫자/특수문자 포함 8~20자"
              />
              {!isPasswordValid && password && (
                <p className="text-red-500 text-xs">※ 비밀번호 형식이 올바르지 않습니다.</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <b>비밀번호 확인</b>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-[656px] h-[43px] rounded-xl bg-white border border-gray2 px-4 text-base text-black input-common"
                placeholder="비밀번호를 다시 입력하세요"
              />
              {!isPasswordMatch && confirmPassword && (
                <p className="text-red-500 text-xs">※ 비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>

          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <b>이름</b>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[656px] h-[43px] rounded-xl bg-white border border-gray2 px-4 text-base text-black input-common"
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <b>전화번호</b>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-[556px] h-[43px] rounded-xl bg-white border border-gray2 px-4 text-base text-black input-common"
                  placeholder="전화번호를 입력하세요 (예: 01012345678)"
                />
                <button
                  type="button"
                  disabled={checkingPhoneNumber || !isPhoneNumberValid}
                  onClick={handleCheckPhoneNumber}
                  className="w-[92px] h-[43px] button-small cursor-pointer"
                >
                  중복확인
                </button>
              </div>
              {phoneMessage && (
                <p className={`text-xs ${phoneMessage.includes('인증번호') ? 'text-green-600' : 'text-red-500'}`}>
                  {phoneMessage}
                </p>
              )}
            </div>

            {/* 전화번호 인증번호 */}
            <div className="flex flex-col gap-2">
              <b>전화번호 인증번호</b>
              <input
                type="text"
                // disabled={!phoneCodeInputEnabled}
                maxLength={6}
                className="w-[656px] h-[43px] rounded-xl bg-white border border-gray2 px-4 text-base text-black input-common"
                placeholder="인증번호 6자리를 입력하세요"
              />
            </div>
          </div>
        </div>

        {/* 회원가입 완료 버튼 */}
        <button
          type="submit"
          disabled={!isFormValid}
          className="w-[376px] mx-auto rounded-lg bg-gray2 text-white py-4 text-base font-semibold button-common"
        >
          회원가입 완료하기
        </button>
      </form>

      <div className="absolute top-[1130px] left-0 bg-gainsboro-200 w-full h-[200px]" />
    </div>
  );
}
