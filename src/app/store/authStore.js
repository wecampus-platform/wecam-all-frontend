import { create } from 'zustand';
export const useAuthStore = create((set, get) => ({
  accessToken: null,
  email: null,
  role: null,
  auth: false,
  councilList: [],
  ready: false,
  currentCouncilId: null,
  currentCouncilRole: null,
  currentCouncilName: null,
  username: null,
  organizationHierarchyList: [],

  setUserProfile: (profile) => set({
    username: profile.username,
    organizationHierarchyList: profile.organizationHierarchyList ?? [],
  }),


  setAuth: (data) => set({
    accessToken: data.accessToken,
    email: data.email,
    role: data.role,
    auth: data.auth,
    councilList: data.councilList,
    ready: true,
  }),

  clearAuth: () => set({
    accessToken: null,
    email: null,
    role: null,
    auth: false,
    councilList: [],
    ready: true,
    currentCouncilId: null,
    currentCouncilRole: null,
    currentCouncilName: null,
    username: null,
    organizationHierarchyList: [],
  }),

  setCurrentCouncil: (selectedCouncilId) => {
    
    const state = get();
    console.log("현재 councilList:", state.councilList);
    console.log("선택한 councilId:", selectedCouncilId, typeof selectedCouncilId);
    const selected = state.councilList.find(
      (council) => Number(council.id) === selectedCouncilId
    );

    console.log("council 셋 하기 :", selected)

    if (selected) {
      set({
        currentCouncilId: selected.id,
        currentCouncilRole: selected.memberRole,
        currentCouncilName: selected.name,
      });

      localStorage.setItem('currentCouncilId', selected.id.toString());
      localStorage.setItem('currentCouncilRole', selected.memberRole);
      localStorage.setItem('currentCouncilName', selected.name);
    } else {
      console.warn('선택한 councilId가 councilList에 존재하지 않습니다.');
    }
  }
}));
