'use client';

import { clientapi } from '@/lib/fetchClient';

/**
 * 신입생(합격증명서) 인증 요청
 * @param {File} file
 */
export const requestFreshmanAffiliation = async (file) => {
    if (!file) throw new Error('파일이 없습니다.');

    const formData = new FormData();
    formData.append('file', file);

    return await clientapi('/user/affiliation/freshman', {
        method: 'POST',
        body: formData,
    });
};

/**
 * 재학생(재학증명서) 인증 요청
 * @param {File} file
 */
export const requestCurrentStudentAffiliation = async (file) => {
    if (!file) throw new Error('파일이 없습니다.');

    const formData = new FormData();
    formData.append('file', file);

    const data = await clientapi('/user/affiliation/currentStudent', {
        method: 'POST',
        body: formData,
    });

    const result = data.json();
    console.log(result);
    if (!result.ok) {
      return false;
    }
    else {
        return true;
    }
};


