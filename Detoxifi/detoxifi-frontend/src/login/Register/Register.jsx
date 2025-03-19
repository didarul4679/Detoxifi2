import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgLogin from "../../assets/bg/bgLogin.svg";
import hide from "../../assets/bg/hide.svg";
import open from "../../assets/bg/open.svg";
import logo from "../../assets/logo/1.svg";
import logo1 from "../../assets/logo/4.png";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      validatePassword(value);
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

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

    // Update errors
    setErrors((prevErrors) => ({ ...prevErrors, password: errorMessage }));
  };

  const validatePage = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (page === 1 && !formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (page === 2) {
      if (!formData.email) {
        newErrors.email = "Email is required";
        valid = false;
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
    } else if (page === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required";
        valid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
        valid = false;
      } else if (
        !/[a-zA-Z]/.test(formData.password) ||
        !/[0-9]/.test(formData.password)
      ) {
        newErrors.password = "Password must include both letters and numbers";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validatePage()) {
      if (page === 2) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/check-email",
            {
              email: formData.email,
            }
          );

          if (response.data.exists) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email is already registered",
            }));
          } else {
            setPage(page + 1);
          }
        } catch (error) {
          console.error("Error checking email:", error);
        }
      } else if (page < 3) {
        setPage(page + 1);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            formData
          );
          console.log("Registration successful:", response.data);
          const { user, token } = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          setSuccessMessage("User successfully registered!");
          navigate("/checkout");
        } catch (error) {
          console.error("Registration failed:", error);
        }
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

        <div className="form-container">
          {page === 1 && (
            <div>
              <h2 className="text-[24px] lg:text-[32px] text-white mb-4 font-PPNeueMontreal400">
                Enter your name to continue
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-[345px] lg:w-[484px] py-2.5 rounded-xl px-4 h-[54px] font-PPNeueMontreal400 placeholder:text-lg placeholder:text-[#3F002A]"
                style={{ background: "rgba(255, 255, 255, 0.32)" }}
                value={formData.name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
              />
              {errors.name && (
                <p className="text-white text-sm mt-2">{errors.name}</p>
              )}
            </div>
          )}
          {page === 2 && (
            <div>
              <h2 className="text-[24px] lg:text-[32px] text-white mb-4 font-PPNeueMontreal400">
                Enter your email to continue
              </h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-[345px] lg:w-[484px] py-2.5 rounded-xl px-4 h-[54px] font-PPNeueMontreal400 placeholder:text-lg placeholder:text-[#3F002A]"
                style={{ background: "rgba(255, 255, 255, 0.32)" }}
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
              />
              {errors.email && (
                <p className="text-white text-sm mt-2">{errors.email}</p>
              )}
            </div>
          )}
          {page === 3 && (
            <div>
              <h2 className="text-[24px] lg:text-[32px] text-white mb-4 font-PPNeueMontreal400">
                Choose a password to continue
              </h2>
              <div className="relative w-[345px] lg:w-[484px]">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full py-2.5 rounded-xl px-4 h-[54px] font-PPNeueMontreal400 placeholder:text-lg placeholder:text-[#3F002A]"
                  style={{ background: "rgba(255, 255, 255, 0.32)" }}
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3F002A]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <img src={hide} /> : <img src={open} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-white text-sm mt-2">{errors.password}</p>
              )}
            </div>
          )}
          {apiError && (
            <p className="text-white mb-2">
              {formData.email} {apiError}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 mb-2">{successMessage}</p>
          )}
          {/* <p className="mt-2 font-PPNeueMontreal500">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-lg font-[600] text-[#3F002A] ">Login</span>
            </Link>
          </p> */}
          <div className="text-center">
            <button
              className="bg-white mt-8 rounded-full py-2 px-12 w-[222px] h-[54px] text-lg font-PPNeueMontreal500 text-[#3F002A]"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
