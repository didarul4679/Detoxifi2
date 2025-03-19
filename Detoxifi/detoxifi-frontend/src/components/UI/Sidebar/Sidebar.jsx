import logo from "../../../assets/logo/1.svg";
import { useEffect, useState } from "react";
import SidebarItems from "./SidebarItems";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeContext";

const Sidebar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #9571D9 0%, #B88CF5 25%, #FA716A 69%, #BA6CA4 100%)",
      }}
      className="rounded-xl relative p-6 md:h-[130vh] lg:h-[120vh]   xl:h-[97vh] 2xl:h-[98vh]"
    >
      <div className="lg:max-w-[290px] xl:max-w-[330px] top-0 left-0 z-10 overflow-y-auto transition-all">
        <img src={logo} alt="logo" className="w-[120px] h-[30px]" />
        <div>
          <SidebarItems />
        </div>

        <div
          onClick={toggleDarkMode}
          className={`flex items-center justify-between xl:mt-0 lg:mr-0 md:mt-4 md:mr-4 px-5 py-4 h-[62px] rounded-[43px] cursor-pointer transition-colors duration-300 absolute xl:bottom-10 2xl:bottom-20 lg:w-[245px]  2xl:w-[280px] transparent ${
            isDarkMode ? "bg-[#3f002a59]" : "bg-white"
          }`}
          style={{ background: "rgba(255, 255, 255, 0.33)" }}
        >
          <span className="mr-2 text-sm text-[#3F002A] font-PPNeueMontreal500 dark:text-gray-200">
            Toggle Dark Mode
          </span>
          <div
            className={`relative w-12 h-6 p-1 rounded-full transition-colors duration-300 ${
              isDarkMode ? "bg-white" : "bg-[#3F002A59]"
            }`}
          >
            <div
              className={`absolute w-4 h-4 rounded-full bg-black transition-transform duration-300 ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
