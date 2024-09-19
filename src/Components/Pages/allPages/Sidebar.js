import React from "react";
import style from "./sidebar.module.css";
import SidebarNav from "./SidebarNav";
import SearchUser from "./SearchUsers";


function Sidebar() {
  return (
    <div className={style.sidebar}>
     
          <SidebarNav />
          <SearchUser />
     
    </div>
  );
}

export default Sidebar;
