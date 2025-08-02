import { useState } from "react";

export default function useToggleMenu() {
  const [toggleMemberActionMenu, setToggleMemberActionMenu] = useState(false);
  const openMemberActionMenu = (e) => {
    e.stopPropagation();
    setToggleMemberActionMenu(true);
  };
  const closeMemberActionMenu = () => {
    setToggleMemberActionMenu(false);
  };

  const [toggleMoveDepartment, setToggleMoveDepartment] = useState(false);

  const openMoveDepartment = () => {
    closeMemberActionMenu();
    setToggleMoveDepartment(true);
  };
  const closeMoveDepartment = () => {
    setToggleMoveDepartment(false);
  };

  return {
    toggleMemberActionMenu,
    openMemberActionMenu,
    closeMemberActionMenu,

    toggleMoveDepartment,
    openMoveDepartment,
    closeMoveDepartment,
  };
}
