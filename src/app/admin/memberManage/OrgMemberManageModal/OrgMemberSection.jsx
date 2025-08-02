import AffiliationList, {
  AffiliationListProps,
} from "@/app/admin/memberManage/components/AffiliationList";

export default function OrgMemberSection({ label, membersList }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <p className="text-[#ABAEB4]">{label}</p>
      {membersList.map((affiliation) => (
        <AffiliationList
          key={affiliation.name}
          imgSrc={affiliation.imgSrc}
          name={affiliation.name}
          studentId={affiliation.studentId}
          major={affiliation.major}
          department={affiliation.department}
          joinDate={affiliation.joinDate}
        />
      ))}
    </div>
  );
}
