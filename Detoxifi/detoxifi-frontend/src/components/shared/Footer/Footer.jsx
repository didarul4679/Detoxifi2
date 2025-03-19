import { Link } from "react-router-dom";
import logo from "../../../assets/logo/1.svg";
import x from "../../../assets/bg/x.svg";
import insta from "../../../assets/bg/insta.png";
import fb from "../../../assets/bg/fb.png";
import desktopImage from "../../../assets/bg/desktop.svg";
import mobileImage from "../../../assets/bg/mobile.svg";

const Footer = () => {
  return (
    <div className="relative py-12 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-[#3F002A]">
      <div className="md:hidden mb-8">
        <img src={logo} alt="Logo" className="w-[204px] h-[51px]" />
      </div>
      <div className="flex items-center md:items-start justify-between">
        <div className="hidden md:block mt-4">
          <img src={logo} alt="Logo" className="w-[204px] h-[51px]" />
        </div>
        <div className="font-[Cambon]  text-[#F5F5F5]">
          <h2 className="font-Cambon700 text-[20px] md:text-[24px] leading-[62.4px]">
            Terms And Policies
          </h2>
          <Link to="/terms" className="text-white">
            <p className="font-Cambon400 text-[16px] md:text-[18px] leading-[60px]">
              Terms Of Use
            </p>
          </Link>
          <Link to="/privacy-policy">
            <p className="font-Cambon400 text-[16px] md:text-[18px] leading-[60px]">
              Privacy Policy
            </p>
          </Link>
          <Link to="/cookies-policy">
            <p className="font-Cambon400 text-[16px] md:text-[18px] leading-[60px]">
              Cookies Policy
            </p>
          </Link>
          <Link to="/disclaimer">
            <p className="font-Cambon400 text-[16px] md:text-[18px] leading-[60px]">
              Disclaimer
            </p>
          </Link>
        </div>
        <div className="font-[Cambon] text-[#F5F5F5]">
          <h2 className="font-Cambon700 text-[20px] md:text-[24px] leading-[62.4px]">
            Contact Us
          </h2>
          <p className="font-PPNeueMontreal400 text-[16px] md:text-[18px] leading-[46.8px]">
            support@detoxifi.com
          </p>
          <div className="flex items-center justify-start gap-[16px] mt-[12px]">
            <Link to="https://www.detoxifi.com" target="_blank">
              <img src={x} alt="x" />
            </Link>
            <Link to="https://www.detoxifi.com" target="_blank">
              <img src={insta} alt="insta" className="w-[32px]" />
            </Link>
            <Link to="https://www.detoxifi.com" target="_blank">
              <img src={fb} alt="fb" className="w-[32px]" />
            </Link>
          </div>
        </div>
      </div>
      {/* <img
        src={desktopImage}
        alt="desktopImage"
        className="absolute bottom-0 left-0 hidden md:block"
      />
      <img
        src={mobileImage}
        alt="mobileImage"
        className="absolute bottom-0 left-0 md:hidden"
      /> */}
    </div>
  );
};

export default Footer;
