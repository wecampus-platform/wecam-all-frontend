'use client';
import { DefaultModal } from './defaultModal';
import { useState } from 'react';

export function OrganizationModal() {
    const [step, setStep] = useState("default");
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[600px] max-w-full">
                {step === "default" && <DefaultModal onSelectStep={setStep} />}
                {step === "certificate" && <CertificateModal onBack={() => setStep("default")} />}
                {step === "admission" && <AdmissionModal onBack={() => setStep("default")} />}
                {step === "code" && <CodeModal onBack={() => setStep("default")} />}
            </div>
        </div>
    );

}

