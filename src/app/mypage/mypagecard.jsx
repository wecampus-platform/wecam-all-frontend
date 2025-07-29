import { UserProfile } from '../../types/types';
import { useAuthStore } from '@/app/store/authStore';
import { useEffect } from 'react';

export default function MyPageCard({ user }) {

  const setUserProfile = useAuthStore((state) => state.setUserProfile);

  useEffect(() => {
    if (user) {
      setUserProfile(user);
    }
  }, [user, setUserProfile]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full h-full max-w-lg bg-white rounded-lg p-6 text-center flex flex-col justify-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
          <img src="/default-profile.png" alt="프로필" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">{user.username}</h2>
        <div className="text-sm text-gray-600 mb-0.5">{user.organizationHierarchyList?.[0] ?? '소속 없음'}</div>
        <div className="text-sm text-gray-600">
          {user.organizationHierarchyList?.[1] ?? '소속 없음'} | {user.organizationHierarchyList?.[2] ?? '소속 없음'}
        </div>
      </div>
    </div>
  );
}