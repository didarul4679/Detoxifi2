import bgLogin from "../../assets/bg/bgLogin.svg";
import logo from "../../assets/logo/logo1.svg";
import logo1 from "../../assets/logo/logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import hide from "../../assets/bg/hide.svg";
import open from "../../assets/bg/open.svg";

const SetPassword = () => {
  const [newPassword, setNewPasswrod] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [retypePasswordError, setRetypePasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1((prev) => !prev);
  };

  //  get otp from url

  const params = new URLSearchParams(window.location.search);
  const otp = params.get("otp");
  const email = params.get("email");

  const validatePassword = (password) => {
    const minLength = 6;
    const hasNumber = /\d/;
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;

    let errorMessage = "";
    if (password.length < minLength) {
      errorMessage = "Password must be at least 6 characters long.";
    } else if (!hasNumber.test(password)) {
      errorMessage = "Password must include at least one number.";
    } else if (!hasLowercase.test(password)) {
      errorMessage = "Password must include at least one lowercase letter (a).";
    } else if (!hasUppercase.test(password)) {
      errorMessage = "Password must include at least one uppercase letter (A).";
    }

    // Return the error message
    return errorMessage;
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!otp) {
      navigate("/reset-password");
    }

    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      isValid = false;
    } else {
      setPasswordError(""); // Clear any previous errors
    }

    if (!retypeNewPassword) {
      setRetypeNewPassword("Please re-enter your password");
      isValid = false;
    } else if (newPassword !== retypeNewPassword) {
      setRetypePasswordError("Passwords did not match");
      isValid = false;
    } else {
      setRetypePasswordError("");
    }

    if (isValid) {
      setPasswordError("");
      setRetypePasswordError("");
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/reset-password",
          {
            email: email,
            resetCode: otp?.toString(),
            newPassword: newPassword,
          }
        );
        const data = res.data;

        if (data && data.message == "Password reset successfully") {
          navigate("/login");
        } else {
          navigate("/reset-password");
        }
      } catch (error) {
        console.error("Error during login:", error);
        navigate("/login");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative"
      style={{ background: `url(${bgLogin})` }}
    >
      <div className="absolute top-8 hidden md:block left-20 md:left-32">
        <Link to="/">
          <img src={logo1} alt="" />
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
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-[24px] lg:text-[32px] text-white font-PPNeueMontreal400">
            Enter new password
          </h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className="w-[345px] lg:w-[484px] py-2.5 rounded-xl px-4 h-[54px] font-PPNeueMontreal400 placeholder:text-[placeholder:text-lg placeholder:text-[#3F002A] placeholder:text-lg"
              style={{
                background: "rgba(255, 255, 255, 0.32)",
                outline: "none",
                border: "none",
              }}
              value={newPassword}
              onChange={(e) => setNewPasswrod(e.target.value)}
              onKeyDown={(e) => handleKeyDown(handleKeyDown)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[16px] right-4 text-[#3F002A]"
            >
              {showPassword ? <img src={hide} /> : <img src={open} />}
            </button>
          </div>
          {passwordError && <p className=" text-sm mt-2">{passwordError}</p>}
          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Re-enter password"
              className="w-[345px] lg:w-[484px] py-2.5 rounded-xl px-4 h-[54px] font-PPNeueMontreal400 placeholder:text-[placeholder:text-lg placeholder:text-[#3F002A] placeholder:text-lg"
              style={{
                background: "rgba(255, 255, 255, 0.32)",
                outline: "none",
                border: "none",
              }}
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(handleKeyDown)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility1}
              className="absolute top-[16px] right-4 text-[#3F002A]"
            >
              {showPassword1 ? <img src={hide} /> : <img src={open} />}
            </button>
          </div>
          {retypePasswordError && (
            <p className=" text-sm mt-2">{retypePasswordError}</p>
          )}

          <div className="text-center">
            <button
              className="bg-white mt-8 rounded-full py-2 px-12 text-lg w-[222px] h-[54px] text-[#3F002A] font-PPNeueMontreal500"
              onClick={handleSubmit}
            >
              Save and login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
