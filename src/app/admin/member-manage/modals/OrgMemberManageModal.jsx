import CloseIcon from "@/components/icons/CloseIcon";

export default function OrgMemberManageModal({
  onClose,
  title,
  icon,
  children,
}) {
  return (
    <section
      onClick={onClose}
      className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
    >
      <div
        className=" relative bg-[#F5F7FA] w-3/4 max-h-3/4 h-fit px-[56px] py-[64px] flex flex-col gap-[36px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex  justify-start items-center gap-2">
          {typeof title === 'string' ? (
            <p className="text-black text-3xl font-bold">{title}</p>
          ) : (
            title
          )}
          {icon}
        </div>
        {children}
      </div>
      <div
        className=" absolute top-1/8 right-1/10 cursor-pointer"
        onClick={onClose}
      >
        <CloseIcon />
      </div>
    </section>
  );
}
