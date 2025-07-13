// import { useCallback } from 'react';
// import Image from "next/image";


// const Component1 = () => {

//   const onTextClick = useCallback(() => {
//     // Add your code here
//   }, []);

//   return (
//     <div className="w-full relative bg-whitesmoke h-[1080px] overflow-hidden text-center text-5xl text-darkslategray font-pretendard">
//       <div className="absolute top-[160px] left-[calc(50%_-_83px)] font-semibold">회원가입</div>
//       <div className="absolute top-[880px] left-[0px] bg-gainsboro-200 w-[1920px] h-[200px]" />
//       <div className="absolute top-[253px] left-[calc(50%_-_328px)] w-[656px] flex flex-col items-center justify-start gap-7 text-left text-base text-silver">
//         <div className="self-stretch flex flex-col items-center justify-start gap-5">
//           <div className="self-stretch flex flex-col items-start justify-start gap-3">
//             <div className="self-stretch rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] flex flex-row items-center justify-between py-3 px-4 gap-0">
//               <div className="relative">학교 이름을 입력하세요.</div>
//               <Image className="w-6 relative h-6 overflow-hidden shrink-0" width={24} height={24} sizes="100vw" alt="" src="icon/search.svg" />
//             </div>
//             <div className="self-stretch rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] flex flex-row items-center justify-between py-3 px-4 gap-0">
//               <div className="relative">단과대학 이름을 입력하세요.</div>
//               <Image className="w-6 relative h-6 overflow-hidden shrink-0" width={24} height={24} sizes="100vw" alt="" src="icon/search.svg" />
//             </div>
//             <div className="self-stretch rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] flex flex-row items-center justify-between py-3 px-4 gap-0">
//               <div className="relative">학부/학과/전공 이름을 입력하세요.</div>
//               <Image className="w-6 relative h-6 overflow-hidden shrink-0" width={24} height={24} sizes="100vw" alt="" src="icon/search.svg" />
//             </div>
//             <div className="w-[656px] rounded-xl bg-white border-gainsboro-100 border-solid border-[1px] box-border h-12 flex flex-row items-center justify-between py-3 px-4 gap-0">
//               <div className="relative">입학년도를 선택해주세요.</div>
//               <Image className="w-6 relative h-6 overflow-hidden shrink-0" width={24} height={24} sizes="100vw" alt="" src="icon/arrowDown.svg" />
//             </div>
//           </div>
//           <div className="rounded-lg bg-silver flex flex-row items-center justify-center py-3 px-4 text-center text-white">
//             <div className="relative font-semibold">학과 정보 입력 완료하기</div>
//           </div>
//         </div>
//         <div className="w-[568px] flex flex-col items-center justify-start gap-3 text-xl text-dimgray">
//           <div className="self-stretch flex flex-row items-center justify-start gap-1.5">
//             <div className="relative">* 본인의 학과가 없을 시, 학생회에 위캠</div>
//             <div className="flex flex-row items-center justify-start text-dodgerblue">
//               <b className="relative cursor-pointer" onClick={onTextClick}>워크스페이스 개설</b>
//               <div className="relative text-dimgray">을 문의하세요!</div>
//             </div>
//           </div>
//           <div className="flex flex-row items-center justify-start gap-1 text-base text-silver">
//             <div className="relative">이미 계정이 있으신가요?</div>
//             <div className="relative [text-decoration:underline] font-semibold">로그인</div>
//           </div>
//         </div>
//       </div>
//     </div>);
// };

// export default Component1;
