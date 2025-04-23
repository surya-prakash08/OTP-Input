import { useEffect, useRef, useState } from "react";

const OtpInput = () => {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, OTP_LENGTH);
  }, []);

  const handleChange = (getCurrentInputIndex, getCurrentInputValue) => {
    if (getCurrentInputValue.length > 1) {
      getCurrentInputValue = getCurrentInputValue.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[getCurrentInputIndex] = getCurrentInputValue;
    setOtp(newOtp);
    if (getCurrentInputValue && getCurrentInputIndex < OTP_LENGTH - 1) {
      inputRefs.current[getCurrentInputIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        justifyContent: "center",
        backgroundColor: "lightgray",
        alignItems: "center",
        minHeight: "100vh",
        width:'100%'
      }}
    >
      <h1>OTP Input</h1>
      <div
        style={{
          display: "flex",
          marginTop: "28px",
          justifyContent: "center",
          gap: "8px",
          fontSize: "12px",
        }}
      >
        {otp.map((digit, index) => {
          return (
            <input
              type="text"
              key={index}
              inputMode="numeric"
              maxLength={1}
              value={digit}
              autoFocus={index === 0}
              style={{ width: "32px", height: "32px", textAlign: "center" }}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
            />
          );
        })}
      </div>
      <button
        style={{
          width: "500px",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4f46e5", // Indigo-600
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")} // Indigo-700 on hover
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")} // Back to original on mouse out
        disabled={otp.some((digit) => digit === "")}
      >
        Verify
      </button>


      <h3 style={{margin:"50px", opacity:"20%"}}>Made with ❤️ by Surya Prakash</h3>
    </div>
  );
};

export default OtpInput;
