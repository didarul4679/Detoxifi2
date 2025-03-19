import { FaArrowRight, FaBars } from "react-icons/fa";
import arrowRight from "../../../assets/icons/arrowRightBtn.svg";
import retake from "../../../assets/icons/q1.png";
import logOut from "../../../assets/icons/l1.png";
import logo from "../../../assets/logo/2.svg";
import { useContext, useEffect, useState } from "react";
import SidebarItems from "./SidebarItems";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeContext";

const ResponsiveSidebar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const [isTargeted, setIsTargeted] = useState(true);

  const [allQuestions, setAllQuestions] = useState([]);

  const token = localStorage.getItem("token");

  const toggleOption = () => {
    setIsTargeted((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getAllQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/problems/get-problems",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();

        console.log("question data from nav", data);
        setAllQuestions(data);

        // console.log("filtered question", filtered);
      } else {
        console.log("error to get response");
      }
    } catch (error) {
      console.log("error fetching problem", error);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [mobileMenuOpen]);

  const handleUpdateIsCompleted = async () => {
    navigate("/welcome");
    try {
      const batchSize = 10;
      for (let i = 0; i < allQuestions.length; i += batchSize) {
        const batch = allQuestions.slice(i, i + batchSize);

        console.log("batch", batch);

        await Promise.all(
          batch.map((question) => {
            const updatedQuestions = question.questions.map((q) => ({
              ...q,
              ans: false,
            }));
            return axios.put(
              `http://localhost:5000/api/problems/update/${question._id}`,
              { isCompleted: false, questions: updatedQuestions },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          })
        );

        console.log("question batch", allQuestions);
      }

      console.log("updated is complete successful");
    } catch (error) {
      console.log("Error updating questions:", error);
    }
  };

  return (
    <div className=" fixed top-0 left-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between px-6 pt-6 bg-white ">
        <img src={logo} alt="" className="w-[143px]" />
        <button
          className="text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FaArrowRight className="text-white text-2xl" />
          ) : (
            <FaBars className="text-[#3F002A] text-2xl" />
          )}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-[293px] bg-white shadow-lg z-[150] transition-transform duration-300 transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, #9571D9 0%, #B88CF5 25%, #FA716A 69%, #BA6CA4 100%)",
        }}
      >
        <div className="flex flex-col items-center justify-center relative">
          <button
            className="absolute top-0 right-4 text-2xl text-[#F47108]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={arrowRight}
              alt="arrow"
              className="mt-[10px] ml-[10px] text-white"
            />
          </button>

          <div className="w-full px-6 mt-8">
            <SidebarItems />
          </div>

          <div
            onClick={handleUpdateIsCompleted}
            className="absolute -bottom-16 flex items-center gap-2 bg-white text-[#3F002A] font-PPNeueMontreal500 py-2 px-4 h-[42px] md:h-[49px] rounded-full w-[82%]"
          >
            <img src={retake} alt="retake" className="w-[20px]" />
            <p>Retake Questionnaire</p>
          </div>

          <div
            onClick={toggleDarkMode}
            className={`flex items-center justify-between xl:mt-0 lg:mr-0 md:mt-4 md:mr-4 px-5 py-4 h-[42px] rounded-[43px] cursor-pointer transition-colors duration-300 absolute bottom-[-26%] xl:bottom-10 2xl:bottom-20 w-[82%] lg:w-[245px]  2xl:w-[280px] transparent ${
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

          <div
            className="absolute -bottom-[40%] flex right-8 items-center gap-2 text-white"
            onClick={handleLogout}
          >
            <p>Log Out</p>
            <img src={logOut} alt="Logout" className=" h-[49px]" />
          </div>
        </div>
      </div>
      <div className="ml-[24px] pt-4 pb-4 md:hidden">
        <div
          onClick={toggleOption}
          className="flex items-center justify-between w-[250px] p-1 rounded-full bg-gray-200 cursor-pointer transition-colors duration-300"
        >
          <div
            onClick={() => navigate("/dashboard/stressors")}
            className={`flex items-center justify-center w-1/2 py-1 h-[42px] rounded-full transition-all duration-300 ${
              isTargeted ? "bg-white shadow-md" : "bg-transparent"
            }`}
          >
            <span
              className={`text-lg ${
                isTargeted
                  ? "text-[#3F002A] font-PPNeueMontreal500"
                  : "text-[#3F002A] font-PPNeueMontreal400"
              }`}
            >
              Targeted
            </span>
          </div>
          <div
            onClick={() => navigate("/dashboard/stressors/explore")}
            className={`flex items-center justify-center w-1/2 py-1 h-[42px] rounded-full transition-all duration-300 ${
              !isTargeted ? "bg-white shadow-md" : "bg-transparent"
            }`}
          >
            <span
              className={`text-lg ${
                !isTargeted
                  ? "text-[#3F002A] font-PPNeueMontreal500"
                  : "text-[#3F002A] font-PPNeueMontreal400"
              }`}
            >
              Explore
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
