import { useEffect, useState } from "react";
import bgLogin from "../../assets/bg/bgLogin.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/1.svg";
import logo1 from "../../assets/logo/4.png";
import arrow from "../../assets/logo/arrow.png";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for all questions
  const [currentSubIndex, setCurrentSubIndex] = useState(0); // Current index for sub-questions
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  console.log("questions", allQuestions);
  // console.log("parentQuestions", parentQuestions);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const paymentToken = localStorage.getItem("paymentToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const userPaymentToken = user?.paymentToken;
    if (!userPaymentToken && !paymentToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getAllQuestions = async () => {
      setLoading(true);
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

          const order = [
            36, 24, 37, 12, 18, 27, 25, 23, 8, 21, 16, 30, 10, 4, 20, 3, 31, 26,
            33, 32, 35, 19, 29, 28, 34, 17, 13, 9, 0, 7, 6, 1, 15, 22, 2, 14, 5,
            11,
          ];

          // Sort the questions based on the defined order
          const reorderedData = order.map((index) => data[index]);

          console.log("question data", reorderedData);
          setAllQuestions(reorderedData);
          setResponses(reorderedData); // Initialize responses with fetched data
        } else {
          console.log("error to get response");
        }
      } catch (error) {
        console.log("error fetching problem", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    getAllQuestions();
  }, []);

  const handleResponse = (response) => {
    setCurrentResponse(response); // Store the current response temporarily
  };

  const handleNext = async () => {
    if (currentResponse === null) return; // Ensure a response is selected before proceeding

    const updatedResponses = [...responses];
    const currentQuestionData =
      updatedResponses[currentIndex].questions[currentSubIndex];

    currentQuestionData.ans = currentResponse;
    setResponses(updatedResponses);

    try {
      await fetch(
        `http://localhost:5000/api/problems/update/${updatedResponses[currentIndex]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questions: updatedResponses[currentIndex]?.questions,
          }),
        }
      );
    } catch (error) {
      console.error("Error during API call:", error);
    }

    setCurrentResponse(null); // Reset the response state for the next question

    if (currentSubIndex < responses[currentIndex].questions.length - 1) {
      setCurrentSubIndex((prev) => prev + 1);
    } else if (currentIndex < responses.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSubIndex(0);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (currentResponse === null) return;

    const updatedResponses = [...responses];
    const currentQuestionData =
      updatedResponses[currentIndex].questions[currentSubIndex];

    currentQuestionData.ans = currentResponse;
    setResponses(updatedResponses);

    try {
      await fetch(
        `http://localhost:5000/api/problems/update/${updatedResponses[currentIndex]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questions: updatedResponses[currentIndex]?.questions,
          }),
        }
      );
      localStorage.setItem("questionnaireCompleted", true);
    } catch (error) {
      console.error("Error during final API call:", error);
    }

    console.log("Final Responses:", updatedResponses);
    navigate("/dashboard/stressors", {
      state: { from: "/questionnaire" },
    });
  };

  const isLastQuestion =
    currentIndex === responses.length - 1 &&
    currentSubIndex === responses[currentIndex].questions.length - 1;

  // if (loading) {
  //   return <div>Loading questions...</div>; // Show loading message
  // }

  const currentQuestion =
    responses[currentIndex]?.questions[currentSubIndex]?.qus;

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
        className="w-full py-44 md:w-[884px] h-screen md:h-[450px] flex flex-col items-center justify-center relative md:rounded-lg"
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
          className="form-container w-[345px] lg:w-[635px] px-3 py-4 md:p-6 rounded-lg"
          style={{ background: "rgba(255, 255, 255, 0.32)" }}
        >
          {loading ? (
            <div>
              <p className="text-lg mb-4 text-[#3F002A] font-Cambon500">
                Question{" "}
                <span className="font-Cambon700">
                  {responses
                    .slice(0, currentIndex)
                    .reduce((sum, item) => sum + item.questions.length, 0) +
                    currentSubIndex +
                    1}
                </span>{" "}
                of <span className="font-Cambon700">46</span>
              </p>
              <h2 className="text-[24px] lg:text-[32px] md:text-center font-PPNeueMontreal400">
                Do you have any silver amalgam fillings?
              </h2>
            </div>
          ) : (
            <div>
              <p className="text-lg mb-4 text-[#3F002A] font-Cambon500">
                Question{" "}
                <span className="font-Cambon700">
                  {/* {currentQuestionIndex + 1} */}
                  {/* {currentIndex + 1} */}
                  {responses
                    .slice(0, currentIndex)
                    .reduce((sum, item) => sum + item.questions.length, 0) +
                    currentSubIndex +
                    1}
                </span>{" "}
                of{" "}
                <span className="font-Cambon700">
                  {/* {allQuestions.length} */}
                  {/* {responses.length} */}
                  {responses.reduce(
                    (sum, item) => sum + item.questions.length,
                    0
                  )}
                </span>
              </p>
              <h2 className="text-[24px] lg:text-[32px] md:text-center font-PPNeueMontreal400">
                {/* {allQuestions[currentQuestionIndex].qus} */}
                {currentQuestion}
              </h2>
            </div>
          )}
          <div className="flex items-center gap-5 justify-center mt-8">
            <button
              className={`border border-[#3F002A] rounded-full w-full md:w-[146px] h-[40px] md:h-[54px] px-10 py-1.5 md:text-[18px] font-PPNeueMontreal500 ${
                currentResponse === true
                  ? "bg-[#3F002A] text-white"
                  : "text-[#3F002A]"
              }`}
              onClick={() => handleResponse(true)}
            >
              Yes
            </button>
            <button
              className={`border border-[#3F002A] rounded-full w-full md:w-[146px] h-[40px] md:h-[54px] px-10 py-1.5 md:text-[18px] font-PPNeueMontreal500 ${
                currentResponse === false
                  ? "bg-[#3F002A] text-white"
                  : "text-[#3F002A]"
              }`}
              onClick={() => handleResponse(false)}
            >
              No
            </button>
          </div>
        </div>
        <div className="ml-[48%] md:ml-[450px]">
          {isLastQuestion ? (
            <button
              className="bg-white text-[#3F002A] font-PPNeueMontreal500 mt-8 rounded-full w-[146px] md:w-[179px] h-[54px] text-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-white text-[#3F002A] font-PPNeueMontreal500 mt-8 rounded-full w-[146px] md:w-[179px] h-[54px] text-lg"
              onClick={handleNext}
            >
              <div className="flex items-center justify-center gap-2">
                Next
                <img src={arrow} alt="arrow" className="w-[21px] h-[16px]" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
