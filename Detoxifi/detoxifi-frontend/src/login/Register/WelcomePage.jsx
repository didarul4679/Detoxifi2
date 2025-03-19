import { useEffect, useState } from "react";
import bgLogin from "../../assets/bg/bgLogin.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/1.svg";
import logo1 from "../../assets/logo/4.png";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const paymentToken = localStorage.getItem("paymentToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const userPaymentToken = user?.paymentToken;
    if (!userPaymentToken && !paymentToken) {
      navigate("/login");
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative"
      style={{ background: `url(${bgLogin})` }}
    >
      <div className="absolute top-8 hidden md:block left-20 md:left-32">
        <Link to="/">
          <img src={logo1} alt="" className="w-[143px]" />
        </Link>
      </div>

      <div
        className="w-full py-44 md:w-[884px] h-screen md:h-[450px] flex items-center justify-center relative md:rounded-lg"
        style={{
          background:
            "linear-gradient(180deg, #906DD5 0%, #B88CF5 25%, #FA716A 69%, #BE6DA1 100%)",
          fontFamily: "PP Neue Montreal",
        }}
      >
        <div className="absolute top-8 md:hidden left-8">
          <Link to="/">
            <img src={logo} alt="" className="w-[143px]" />
          </Link>
        </div>

        <div
          className="form-container w-[345px] lg:w-[685px] p-6 rounded-lg"
          style={{ background: "rgba(255, 255, 255, 0.32)" }}
        >
          <h1 className="text-[30px] md:text-[40px] font-Cambon700 text-[#3F002A]">
            Welcome {userName}
          </h1>
          <p className="text-lg md:text-[24px] text-[#3F002A] mt-4 font-PPNeueMontreal400 leading-[30px] md:leading-[40px]">
            You are about to begin the{" "}
            <span className="font-PPNeueMontreal500">
              Stressor Targeting Questionnaire
            </span>
            . It will just take a few minutes and it will identify stressors
            affecting your health. Let’s get started.
          </p>
          <div className="text-center">
            <Link to="/questionnaire">
              <button
                className="bg-white mt-8 rounded-full py-2 text-lg w-[222px] h-[54px] text-[#3F002A] font-PPNeueMontreal500"
                // onClick={handleSubmit}
              >
                Start Questionnaire
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
