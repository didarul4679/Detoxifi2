import bgLogin from "../../assets/bg/bgLogin.svg";
import logo from "../../assets/logo/1.svg";
import logo1 from "../../assets/logo/4.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [code, setCode] = useState();
  const [codeError, setCodeError] = useState("");
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  console.log("email", email);

  const navigate = useNavigate();

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const otpValue = form.otp.value;

    const formData = {
      otp: otpValue,
      email,
    };

    console.log("resetting passorde", formData);

    axios
      .post("http://localhost:5000/api/auth/reset-password", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.success) {
          const refreshedJwtToken = res.data.payload.refreshedJwtToken;
          localStorage.setItem("authToken", refreshedJwtToken);

          // Swal.fire({
          //   icon: "success",
          //   title: "OTP Verified",
          //   text: "You have successfully Verified!",
          // });

          navigate("/dashboard");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          console.log("Error in response:", res);
          // Swal.fire({
          //   icon: "error",
          //   title: "Verification Failed",
          //   text: res.data.message || "OTP verification failed.",
          // });
        }
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: "Something went wrong with the OTP verification.",
        // });
      });
  };

   const handleResendCode = async () => {
    console.log(email);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/request-password-reset",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      console.log(data);

      
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleKeyDown = (event, submitFunction) => {
    if (event.key === "Enter") {
      submitFunction();
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative"
      style={{ background: `url(${bgLogin})` }}
    >
      <div className="absolute top-8 hidden md:block left-20 md:left-32">
        <Link to="/">
          <img src={logo1} alt="" className="w-[143px]"/>
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
            <img src={logo} alt="" className="w-[143px]"/>
          </Link>
        </div>
        <div>
          <h2 className="text-[24px] lg:text-[32px] text-white font-PPNeueMontreal400">
            Enter code to continue
          </h2>
          <p className="text-white mb-4 md:text-[20px] font-PPNeueMontreal500">
            We've sent the code to your email
          </p>
          <input
            type="number"
            placeholder="Code"
            className="w-[345px] lg:w-[484px] mb-4 py-2.5 rounded-xl px-4 h-[49px] font-PPNeueMontreal400 placeholder:text-lg placeholder:text-[#3F002A] decoration-none"
            style={{
              background: "rgba(255, 255, 255, 0.32)",
              appearance: "textfield",
              outline: "none",
              border: "none",
            }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, handleCodeSubmit)}
          />
          {codeError && <p className="text-white text-sm">{codeError}</p>}
          <div className="text-center">
            <button
              className="bg-white mt-8 rounded-full py-2 px-12 w-[222px] h-[54px] text-lg text-[#3F002A] font-PPNeueMontreal500"
              onClick={() => {
                navigate("/set-password?otp=" + code + "&email=" + email);
              }}
            >
              Continue
            </button>
          </div>
          <div className="text-center underline text-white mt-3 text-lg font-PPNeueMontreal500 cursor-pointer">
            <p
              onClick={handleResendCode}
            >Resend Code</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
