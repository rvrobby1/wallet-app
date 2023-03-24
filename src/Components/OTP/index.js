import React from "react";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { emptyUser } from "../../App/Redux/Actions/AuthActions";
import { useState } from "react";
import { useEffect } from "react";
import { sendOtp, verifyOtp } from "../../App/Redux/Actions/AuthActions";
import OtpInput from "react18-input-otp";
import "./index.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Otp({ setOpenJoinNow }) {
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.data?.data?.data);

  const otpVarificationStatus = useSelector(
    (state) => state?.user?.otpVerification?.data?.ok
  );

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  useEffect(() => {
    otpVarificationStatus && setOpen(false);
    if (user) {
      setOpen(true);

      const paylaod = {
        email: user[0]?.email,
      };
      dispatch(sendOtp(paylaod));
    } else {
      setOpen(false);
    }
  }, [user, otpVarificationStatus]);

  return (
    <Dialog open={open} className="otp-input">
      <div className="close-icon-div">
        <HighlightOffIcon onClick={() => setOpen(false)} />
      </div>
      <div className="otp-input-title">
        Enter the OTP sent to your email id..
      </div>

      <OtpInput
        className="otp-input-field"
        value={otp}
        onChange={handleChange}
        numInputs={6}
      />
      <button
        onClick={() => {
          dispatch(
            verifyOtp({
              id: user[0]?.id,
              otp: Number(otp),
            })
          );

          dispatch(emptyUser());
          setOpenJoinNow("bottom", false);
        }}
      >
        Confirm OTP
      </button>
    </Dialog>
  );
}

export default Otp;
