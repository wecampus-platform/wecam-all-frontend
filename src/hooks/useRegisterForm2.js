import { useEffect, useState } from 'react';
import { getDuplicate } from '../app/register/step2/registerapi2';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;

export function useRegisterForm2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [emailMessage, setEmailMessage] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState('');
  const [checkingPhone, setCheckingPhone] = useState(false);

  const [emailCodeInputEnabled, setEmailCodeInputEnabled] = useState(false);
  const [phoneCodeInputEnabled, setPhoneCodeInputEnabled] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const isPasswordValid = passwordRegex.test(password);
  const isPasswordMatch = password === confirmPassword;
  const isPhoneValid = /^\d{10,11}$/.test(phone);

  const isFormValid =
    email &&
    isEmailValid &&
    password &&
    isPasswordValid &&
    confirmPassword &&
    isPasswordMatch &&
    name &&
    phone &&
    isPhoneValid;

  const handleCheckEmail = async () => {
    if (!isEmailValid) {
      setEmailMessage('※ 이메일 형식이 올바르지 않습니다.');
      return;
    }
    try {
      setCheckingEmail(true);
      const res = await getDuplicate('email', email);
      if (res.result.isDuplicate) {
        setEmailMessage('※ 이미 사용 중인 이메일입니다.');
        setEmailCodeInputEnabled(false);
      } else {
        setEmailMessage('※ 인증코드가 발송되었습니다. 이메일을 확인해주세요.');
        setEmailCodeInputEnabled(true);
      }
    } catch {
      setEmailMessage('※ 이메일 확인 중 오류가 발생했습니다.');
      setEmailCodeInputEnabled(false);
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleCheckPhone = async () => {
    if (!isPhoneValid) {
      setPhoneMessage('※ 전화번호 형식이 올바르지 않습니다.');
      return;
    }
    try {
      setCheckingPhone(true);
      const res = await getDuplicate('phone', phone);
      if (res.result.isDuplicate) {
        setPhoneMessage('※ 이미 가입된 계정이 있습니다.');
        setPhoneCodeInputEnabled(false);
      } else {
        setPhoneMessage('※ 인증번호가 발송되었습니다.');
        setPhoneCodeInputEnabled(true);
      }
    } catch {
      setPhoneMessage('※ 전화번호 확인 중 오류가 발생했습니다.');
      setPhoneCodeInputEnabled(false);
    } finally {
      setCheckingPhone(false);
    }
  };

  return {
    email,
    setEmail,
    isEmailValid,
    password,
    setPassword,
    isPasswordValid,
    confirmPassword,
    setConfirmPassword,
    isPasswordMatch,
    name,
    setName,
    phone,
    setPhone,
    isPhoneValid,
    isFormValid,
    emailMessage,
    handleCheckEmail,
    checkingEmail,
    phoneMessage,
    handleCheckPhone,
    checkingPhone,
    emailCodeInputEnabled,
    phoneCodeInputEnabled,
  };
}
