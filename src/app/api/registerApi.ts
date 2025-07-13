// import { School, Organization } from '../../types/types';
// import { publicapi } from '../../lib/fetchClient';

// export const searchSchools = async (keyword: string): Promise<School[]> => {

//   const res = await publicapi.get<School[]>('/schools');
//   return res.data.filter((s) => s.name.includes(keyword));
// };

// export const searchColleges = async (schoolId: number, keyword: string): Promise<Organization[]> => {

//   const res = await publicapi.get<Organization[]>(`/schools/${schoolId}/organizations`);
//   return res.data.filter((c) => c.name.includes(keyword));
// };

// export const searchDepartments = async (collegeId: number, keyword: string): Promise<Organization[]> => {

//   const res = await publicapi.get<Organization[]>(`/organizations/${collegeId}/children`);
//   return res.data.filter((d) => d.name.includes(keyword));
// };