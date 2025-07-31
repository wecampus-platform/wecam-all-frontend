'use client';
import { DefaultModal } from './defaultModal';
import { CertificateModal } from './certificateModal';
import { AdmissionModal } from './admissionModal';
import { CodeModal } from './codeModal';
import { useState } from 'react';
import { XIcon } from '@/app/components/icons/check-icons';

export function OrganizationModal({ onClose }) {
  const [step, setStep] = useState("default");

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-8 w-[1000px] max-w-full">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <button onClick={onClose} className="flex ml-auto">
            <XIcon />
          </button>
          <div className="w-full relative text-2xl font-semibold font-pretendard text-center">
            소속 인증 하기
          </div>
          {step === "default" && <DefaultModal onSelectStep={setStep} onClose={onClose} />}
          {step === "certificate" && <CertificateModal onBack={() => setStep("default")} />}
          {step === "admission" && <AdmissionModal onBack={() => setStep("default")} />}
          {step === "code" && <CodeModal onBack={() => setStep("default")} />}
        </div>
      </div>
    </div>

  );
}


