'use client';
import { DefaultModal } from './defaultModal';
import { useState } from 'react';

export function OrganizationModal({ onClose }) {
  const [step, setStep] = useState("default");

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg p-8 w-[1000px] max-w-full">
        {step === "default" && <DefaultModal onSelectStep={setStep} onClose={onClose} />}
        {step === "certificate" && <CertificateModal onBack={() => setStep("default")} />}
        {step === "admission" && <AdmissionModal onBack={() => setStep("default")} />}
        {step === "code" && <CodeModal onBack={() => setStep("default")} />}
      </div>
    </div>
  );
}


