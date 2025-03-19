import { useContext, useEffect, useState } from "react";
import retake from "../../../assets/icons/q2.png";
import Logout from "../../../assets/icons/l2.png";
import LogoutWhite from "../../../assets/icons/l1.png";
import { AuthContext } from "../../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDarkMode } from "../../../contexts/DarkMode/DarkModeContext.jsx";

const TopNavbar = () => {
  const [isTargeted, setIsTargeted] = useState(true);
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const [allQuestions, setAllQuestions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

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

  const handleUpdateIsCompleted = async () => {
    // setIsLoading(true);
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
    // finally {
    //   setIsLoading(false);
    // }
  };

  // if (loading) {
  //   return <div className="mt-24">Loading Problems...</div>;

  // }

  return (
    <div
      className={`py-3 px-2 z-40  fixed top-0 lg:w-[calc(100%-360px)] ${
        isDarkMode ? "bg-[#3F002A]" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between ">
        <div
          onClick={toggleOption}
          className="flex items-center justify-between w-[290px] p-1 rounded-full bg-gray-200 cursor-pointer transition-colors duration-300"
        >
          <div
            onClick={() => navigate("/dashboard/stressors")}
            className={`flex items-center justify-center w-1/2 py-1 h-[49px] rounded-full transition-all duration-300 ${
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
            className={`flex items-center justify-center w-1/2 py-1 h-[49px] rounded-full transition-all duration-300 ${
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

        <div className="flex items-center gap-5">
          <div
            onClick={handleUpdateIsCompleted}
            className="flex items-center cursor-pointer gap-2 bg-white py-2 px-4 h-[49px] rounded-full font-[500] text-white font-PPNeueMontreal500"
            style={{
              background:
                "linear-gradient(90deg, #9973DB 0%, #BC86E1 30.5%, #D581BB 72.5%, #F07681 100%)",
            }}
          >
            <img src={retake} alt="retake" className="w-[18px] mb-[2px]"/>
            <p>Retake Questionnaire</p>
          </div>

          <div className="border h-8"></div>
          <div className="flex right-8 items-center gap-4 md:gap-1">
            <button
              onClick={handleLogout}
              className={`flex items-center justify-center font-PPNeueMontreal500 ${
                isDarkMode ? "text-white" : "text-[#3F002A]"
              }`}
            >
              Log Out
              <img
                src={isDarkMode ? LogoutWhite : Logout}
                alt="Logout"
                className={`w-[65px]  p-3 ${isDarkMode ? "" : "border-[#3F002A]"}`}
              />
            </button>
          </div>
        </div>
      </div>
      {/* {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#2B2B2B] bg-opacity-90 z-50">
          <div className="bg-[#1E1E1E] p-6 rounded-lg text-center shadow-2xl">
            <p className="text-xl font-bold text-white mb-4">
              Updating questions, please wait...
            </p>
            <div className="loader border-t-4 border-b-4 border-purple-500 w-12 h-12 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TopNavbar;
