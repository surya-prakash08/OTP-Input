import { useEffect, useRef, useState } from "react";

const OtpInput = () => {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const [generateOtp, setGenerateOtp] = useState(null);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [message, setMessage] = useState("");
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
  const generateRandomNumber = () => {
    let generatedNum = Math.ceil(Math.random() * 10000);
    return generatedNum;
  };

  const handleClick = () => {
    setGenerateOtp(generateRandomNumber());
  };

  //   const otpValidation =()=>{
  //     {otp===generateOtp? "Matched" :"did not match"}
  //   }
  //  console.log(generateOtp)
  const handleVarify = () => {
    const currOtp = parseInt(otp.join(""));
    if (currOtp === generateOtp) {
      setMessage("✅ OTP Matched and Verified!");
    } else {
      setMessage("❌ OTP Did Not Match.");
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
        width: "100%",
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
      {message && (
        <div
          style={{
            marginTop: "20px",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {message}
        </div>
      )}

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
        onClick={handleVarify}
      >
        Verify OTP
      </button>

      <div
        style={{
          width: "70px",
          background: "cyan",
          fontWeight: "bold",
          height: "30px",
          border: "1px solid white",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        { generateOtp}
       
      </div>
      {/* <button onClick={handleClick} disabled={generateOtp ? true: false}>Generate Otp</button> */}
      <button
        onClick={handleClick}
        disabled={generateOtp ? true : false}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: generateOtp ? "#9ca3af" : "#10b981", // Gray if disabled, Green if active
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: generateOtp ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "600",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        Generate OTP
      </button>

      <button
  onClick={() => window.location.reload()}
  style={{
    padding: "10px 20px",
    backgroundColor: "#ef4444", // Red-500
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    marginTop: "20px"
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")} // Red-600
  onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")} // Back to red-500
>
  Reset
</button>


      <h3 style={{ margin: "50px", opacity: "20%" }}>
        Made with ❤️ by Surya Prakash
      </h3>
    </div>
  );
};

export default OtpInput;
