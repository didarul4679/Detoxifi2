/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgLogin from "../../assets/bg/bgLogin.svg";
import logo2 from "../../assets/logo/1.svg";
import logo1 from "../../assets/logo/4.png";


const stripePromise = loadStripe(
  "pk_test_51PmF6FIR1dQbKMRJ28xNPIbFCxHC65QFFomrafKSTy5zGQoGqVFFwGO2USlidniImkfu0Gqy0VmHy6zxl8vJNiTe00ubMN0Mdw"
);

const Checkout = () => {
  const [isTargeted, setIsTargeted] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isPaid) {
  //     navigate("/welcome");
  //   }
  // }, [isPaid, navigate]);

  const toggleOption = () => {
    setIsTargeted((prev) => !prev);
  };
  const token = localStorage.getItem("token");

  const handleStripePayment = async (stripe, elements, e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (!error) {
      const response = await fetch(
        "http://localhost:5000/api/payments/stripe_payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: 97,
          }),
        }
      );
      const paymentResponse = await response.json();

      if (paymentResponse.success) {
        localStorage.setItem("paymentToken", paymentResponse.paymentToken);
        setIsPaid(true);
        console.log(paymentResponse);
        // navigate('/dashboard/stressors')
      } else console.error("Stripe payment failed");
    } else {
      console.error("Stripe error:", error);
    }
  };

  const handlePayPalPayment = (orderID, details) => {
    fetch("http://localhost:5000/api/payments/complete_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderID,
        payer: details.payer,
        purchase_units: details.purchase_units,
      }),
    })
      .then((response) => response.json())
      .then((paymentResponse) => {
        if (paymentResponse.success) {
          localStorage.setItem("paymentToken", paymentResponse.paymentToken);
          setIsPaid(true);
          console.log(paymentResponse);
        } else {
          console.error("PayPal payment failed");
        }
      })
      .catch((err) => console.error("Payment saving failed", err));
  };

  useEffect(() => {
    if (isPaid) {
      navigate("/welcome");
    }
  }, [isPaid, navigate]);

  const openCenteredWindow = (url, name, width, height) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      name,
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
        "AY4-4ViZiDaH3AoOdjv15Q6wxLThUMIvTBw-4gDwhQWxqv3S7Kj2Bfu6HNLjehleVwQFq_SjCr_qdzc2",
      }}
    >
      <div
        className="flex items-center justify-center min-h-screen w-full relative"
        style={{
          background: `url(${bgLogin}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute top-8 hidden md:block left-20 md:left-32">
          <Link to="/">
            <img src={logo1} alt="Logo" className="w-[143px]" />
          </Link>
        </div>
        <div className="absolute top-8 md:hidden left-4">
          <Link to="/">
            <img src={logo2} alt="Logo" className="w-[143px]" />
          </Link>
        </div>

        <div
          className="pt-[100px] md:pt-4 flex flex-col items-center justify-center w-full md:w-[884px] lg:my-24 md:rounded-lg p-6"
          style={{
            background:
              "linear-gradient(180deg, #906DD5 0%, #B88CF5 25%, #FA716A 69%, #BE6DA1 100%)",
            fontFamily: "PP Neue Montreal",
          }}
        >
          <h2 className="mr-[72%] lg:mr-[370px] text-[24px] lg:text-[40px] text-white mb-3 font-PPNeueMontreal500">
            Checkout
          </h2>

          <div
            className="w-full md:w-[440px] lg:w-[540px] px-5 py-3 rounded-lg text-[#3F002A] mb-6"
            style={{ background: "rgba(255, 255, 255, 0.32)" }}
          >
            <h1 className="text-[32px] lg:text-[42px] font-Cambon700 leading-[49px]">
              Detoxifi.com
            </h1>
            <h2 className="text-[22px] lg:text-[32px] font-PPNeueMontreal500 mt-2">
              $97 USD— One-Time Payment
            </h2>
            <p className="font-PPNeueMontreal400 mt-2">
              Get lifetime access, including the stressor-targeting
              questionnaire, a personalized dashboard, a library of stressor
              cards with actionable steps, and all future core updates to the
              platform.
            </p>
          </div>

          <div
            onClick={toggleOption}
            className="flex items-center justify-between w-[260px] p-1 rounded-full bg-gray-200 cursor-pointer transition-colors duration-300 mb-6"
          >
            <div
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
                Credit Card
              </span>
            </div>
            <div
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
                PayPal
              </span>
            </div>
          </div>

          {/* <p className="flex items-center justify-center max-w-[520px] text-white font-PPNeueMontreal500 text-sm md:text-lg lg:text-[20px] my-5 text-left">
            By clicking "Pay Now," you confirm that you have read and agree to
            our terms of use, privacy policy, cookies policy, and disclaimer.
          </p> */}
          {!isTargeted && (
            <p className="max-w-[520px] font-PPNeueMontreal500 text-sm md:text-lg lg:text-[20px] my-5 text-white">
              By clicking "Pay with PayPal", you confirm that you have read and
              agree to our{" "}
              <span
                onClick={() =>
                  openCenteredWindow("/terms", "termsWindow", 800, 600)
                }
                className="underline cursor-pointer"
              >
                terms of use,
              </span>{" "}
              <span
                onClick={() =>
                  openCenteredWindow(
                    "/privacy-policy",
                    "privacyWindow",
                    1200,
                    600
                  )
                }
                className="underline cursor-pointer"
              >
                privacy policy,
              </span>{" "}
              <span
                onClick={() =>
                  openCenteredWindow(
                    "/cookies-policy",
                    "cookiesWindow",
                    1200,
                    600
                  )
                }
                className="underline cursor-pointer"
              >
                cookies policy,
              </span>{" "}
              and{" "}
              <span
                onClick={() =>
                  openCenteredWindow(
                    "/disclaimer",
                    "disclaimerWindow",
                    1200,
                    600
                  )
                }
                className="underline cursor-pointer"
              >
                disclaimer
              </span>
              .
            </p>
          )}

          {isTargeted ? (
            <Elements stripe={stripePromise}>
              <StripeForm handleStripePayment={handleStripePayment} />
            </Elements>
          ) : (
            <div className="w-[222px] pb-[340px] md:pb-[190px]">
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "silver",
                  label: "pay",
                  shape: "pill",
                  width: 222,
                  height: 54,
                }}
                fundingSource="paypal"
                funding={{
                  disallowed: [
                    window.paypal.FUNDING.PAYLATER,
                    window.paypal.FUNDING.CARD,
                  ],
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{ amount: { value: "97.00" } }],
                    application_context: {
                      shipping_preference: "NO_SHIPPING",
                    },
                  });
                }}
                onApprove={async (data, actions) => {
                  return await actions.order.capture().then((details) => {
                    handlePayPalPayment(data.orderID, details);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal payment error:", err);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

const StripeForm = ({ handleStripePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not properly loaded. Please try again.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      setErrorMessage(error.message); // Set the error message
    } else {
      handleStripePayment(stripe, elements, e);
    }
  };

  const openCenteredWindow = (url, name, width, height) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      name,
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <form
      className="md:w-[440px] pb-28 md:py-0 lg:w-[540px] flex flex-col items-center"
      // onSubmit={(e) => handleStripePayment(stripe, elements, e)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Name on Card"
        className="w-full py-3 rounded-xl mb-4 font-PPNeueMontreal400 text-[#3F002A] placeholder-[#3F002A] bg-gradient-to-b from-[#E68B8B] to-[#F0A3A3] px-4"
      />
      {errorMessage && errorMessage.includes("Name") && (
        <p className="text-green-800 text-sm ">{errorMessage}</p>
      )}
      <div className="w-full py-3 rounded-xl mb-4 text-[#3F002A] placeholder-[#3F002A] bg-gradient-to-b from-[#E68B8B] to-[#F0A3A3] px-4">
        <CardNumberElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                fontWeight: "300",
                color: "#3F002A",
                "::placeholder": {
                  color: "#3F002A",
                },
              },
            },
          }}
        />
      </div>
      {/* {errorMessage && errorMessage.includes("number") && (
        <p className="text-green-800 text-sm ">{errorMessage}</p>
      )} */}
      <div className="flex gap-4 w-full">
        <div className="w-1/2 py-3 rounded-xl mb-4 text-[#3F002A] placeholder-[#3F002A] bg-gradient-to-b from-[#E68B8B] to-[#F0A3A3] px-4">
          <CardExpiryElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  fontWeight: "300",
                  color: "#3F002A",
                  "::placeholder": {
                    color: "#3F002A",
                  },
                },
              },
            }}
          />
        </div>
        {errorMessage && errorMessage.includes("expiry") && (
          <p className="text-green-800 text-sm">{errorMessage}</p>
        )}
        <div className="w-1/2 py-3 rounded-xl mb-4 text-[#3F002A] placeholder-[#3F002A] bg-gradient-to-b from-[#E68B8B] to-[#F0A3A3] px-4">
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  fontWeight: "300",
                  color: "#3F002A",
                  "::placeholder": {
                    color: "#3F002A",
                  },
                },
              },
            }}
          />
        </div>
        {errorMessage && errorMessage.includes("CVC") && (
          <p className="text-green-800 text-sm  text-left  w-full">
            {errorMessage}
          </p>
        )}
      </div>

      {errorMessage && (
        <p className="text-green-800 text-sm text-left  w-full">
          {errorMessage}
        </p>
      )}
      <p className="max-w-[520px] font-PPNeueMontreal500 text-sm md:text-lg lg:text-[20px] my-5 text-white">
        By clicking "Pay Now", you confirm that you have read and agree to our{" "}
        <span
          onClick={() => openCenteredWindow("/terms", "termsWindow", 800, 600)}
          className="underline cursor-pointer"
        >
          terms of use,
        </span>{" "}
        <span
          onClick={() =>
            openCenteredWindow("/privacy-policy", "privacyWindow", 1200, 600)
          }
          className="underline cursor-pointer"
        >
          privacy policy,
        </span>{" "}
        <span
          onClick={() =>
            openCenteredWindow("/cookies-policy", "cookiesWindow", 1200, 600)
          }
          className="underline cursor-pointer"
        >
          cookies policy,
        </span>{" "}
        and{" "}
        <span
          onClick={() =>
            openCenteredWindow("/disclaimer", "disclaimerWindow", 1200, 600)
          }
          className="underline cursor-pointer"
        >
          disclaimer
        </span>
        .
      </p>

      <button
        type="submit"
        className="bg-white mt-5 rounded-full py-2 px-12 w-[222px] h-[54px] text-lg text-[#3F002A] font-PPNeueMontreal500"
      >
        Pay Now
      </button>
    </form>
  );
};

export default Checkout;
