import { useContext, useEffect, useRef, useState } from "react";
import bgLogin from "../../assets/bg/bgLogin.svg";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/logo/1.svg";
import logo2 from "../../assets/logo/4.png";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import hide from "../../assets/bg/hide.svg";
import open from "../../assets/bg/open.svg";

const Login = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailSubmit = () => {
    if (email) {
      setEmailError(""); // Clear any previous error
      setStep("password");
    } else {
      setEmailError("");
    }
    console.log(email);
  };

  const handlePasswordSubmit = async () => {
    if (password) {
      try {
        // use axios
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );

        const data = res.data;

        console.log("data", data);

        if (data && data.token) {
          login(data.user, data.token); // Use the context's login function

          // {
          //   data?.user?.paymentToken
          //     ? navigate("/dashboard/stressors")
          //     : navigate("/checkout");
          // }
          data?.user?.paymentToken
            ? navigate("/dashboard/stressors")
            : navigate("/checkout");

          // if (data?.user?.paymentToken) {
          //   navigate("/dashboard/stressors");
          // } else {
          //   navigate("/checkout");
          // }
        } else {
          throw new Error("Invalid login response.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoginError("Login failed. Please check your credentials.");
        console.log(loginError);
      }
    } else {
      setPasswordError("Please enter your password.");
    }
  };

  const handleKeyDown = (event, submitFunction) => {
    if (event.key === "Enter") {
      submitFunction();
    }
  };

  const forgotPassword = async (email) => {
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

      if (!data?.message) {
        Swal.fire(data.errors?.message || "Something went wrong!");
        // console.log(data.errors.message);
      } else {
        // Swal.fire(
        //   data?.message || "reset password link sent to the given email"
        // );

        navigate("/reset-password?email=" + email);
      }
    } catch (error) {
      Swal.fire("Something went wrong");
    }
  };

  const handleForgetPassword = () => {
    forgotPassword(email);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative"
      style={{ background: `url(${bgLogin})` }}
    >
      <div className="absolute top-8 hidden md:block left-20 md:left-32">
        <Link to="/">
          <img src={logo2} alt="" className="w-[143px]" />
        </Link>
      </div>
      <div className="z-[100] absolute top-8 md:hidden left-8 md:left-32">
        <Link to="/">
          <img src={logo1} alt="" className="w-[143px]" />
        </Link>
      </div>
      <div
        className="w-full py-44 md:w-[884px] h-screen md:h-[450px] flex items-center justify-center relative md:rounded-lg"
        style={{
          background:
            "linear-gradient(180deg, #906DD5 0%, #B88CF5 25%, #FA716A 69%, #BE6DA1 100%)",
        }}
      >
        <div className=" p-6 mx-auto ">
          {step === "email" && (
            <div>
              <h2 className="text-[24px] lg:text-[32px] text-white mb-6 font-PPNeueMontreal400">
                Enter your email to continue
              </h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-[345px] lg:w-[484px] py-2.5 rounded-xl px-4 h-[54px] font-PPNeueMontreal400 placeholder:text-lg placeholder:text-[#3F002A] "
                style={{ background: "rgba(255, 255, 255, 0.32)" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleEmailSubmit)}
                required
              />
              {emailError && (
                <p className="text-white text-sm mt-2">{emailError}</p>
              )}

              <p className="mt-2 font-PPNeueMontreal500">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="text-lg font-[600] text-[#3F002A] ">
                    SignUp
                  </span>
                </Link>
              </p>

              <button
                onClick={handleEmailSubmit}
                className="bg-white px-12 py-3 rounded-full font-[600] text-[#3F002A] block mt-8 mx-auto"
              >
                Continue
              </button>
            </div>
          )}
          {step === "password" && (
            <div>
              <h2 className="text-[24px] lg:text-[32px] text-white mb-6 font-PPNeueMontreal400">
                Enter your password to continue
              </h2>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-[345px] lg:w-[484px] py-2.5 rounded-xl px-4 h-[54px] font-PPNeueMontreal400 placeholder:text-lg placeholder:text-[#3F002A]"
                  style={{ background: "rgba(255, 255, 255, 0.32)" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handlePasswordSubmit)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-[16px] right-4 text-[#3F002A]"
                >
                  {showPassword ? <img src={hide} /> : <img src={open} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-white text-sm mt-2">{passwordError}</p>
              )}
              {loginError && (
                <p className="text-white text-sm mt-2">{loginError}</p>
              )}

              <div className="flex justify-between items-center w-full text-white mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded-lg"
                  />
                  <span>Keep me signed in</span>
                </label>
                <p
                  onClick={handleForgetPassword}
                  className=" hover:underline text-black cursor-pointer"
                >
                  Forgot password?
                </p>
              </div>

              <p className="mt-2">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="text-lg font-[600] text-[#3F002A] ">
                    SignUp
                  </span>
                </Link>
              </p>

              <button
                onClick={handlePasswordSubmit}
                className="bg-white px-12 py-3 rounded-full font-[600] text-[#3F002A] block mt-8 mx-auto"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
