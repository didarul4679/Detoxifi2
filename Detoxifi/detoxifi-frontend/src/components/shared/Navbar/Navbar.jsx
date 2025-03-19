import { Link, NavLink } from "react-router-dom";
import Logo1 from "../../../assets/logo/1.svg";
import logo from "../../../assets/logo/2.svg";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nav, setNav] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      setNav("bg-white px-4 py-2 rounded-b-md shadow-sm mt-[0px]");
    } else {
      setNav("");
    }
  });

  return (
    <nav
      className={`w-full px-[20px] flex items-center justify-between fixed md:left-[50%] md:-translate-x-[50%] top-0 z-[1000] py-9 px-6 md:px-12 lg:px-24  ${nav} ${
        !nav && " bg-transparent "
      }`}
    >
      <Link to={"/"}>
        <img src={nav ? logo : Logo1} alt="logo" className="w-[143px] h-[55px]" style={{transition: "all 0.3s easeInOut"}}/>
      </Link>

      
      <Link to={"/login"} className=" md:flex">
        <button
          className={`border-2  rounded-full px-10 py-2 font-PPNeueMontreal500 text-[18px] ${nav? "border-black text-black" : "border-white text-white"}`}
        >
            Login
        </button>
        
      </Link>
      
    </nav>
  );
};

export default Navbar;
