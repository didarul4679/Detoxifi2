import React from "react";
import { NavLink } from "react-router-dom";

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "text-[#3F002A] font-PPNeueMontreal500 bg-white border py-2 md:py-3 px-4 h-[42px] md:h-[49px] leading-[24px] rounded-full z-[12]"
          : "text-white font-PPNeueMontreal400 border py-3 px-4 h-[49px] leading-[24px] rounded-full"
      }
    >
      <div className="flex items-center gap-4"> {children}</div>
    </NavLink>
  );
};

export default ActiveLink;
