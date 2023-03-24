import React from "react";
import Dialog from "@mui/material/Dialog";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./ReferralPopup.scss";

function ReferalCodeDialog({
  openPopUp,
  setOpenPopUp,
  ReferralCode,
  setReferralCode,
}) {
  return (
    <Dialog
      onClose={() => setOpenPopUp(false)}
      open={openPopUp}
      className="referral-popup"
    >
      <div className="close-icon-div">
        <HighlightOffIcon onClick={() => setOpenPopUp(false)} />
      </div>
      <div className="close-icon-div"></div>
      <div className="close-icon-div-text">Do You Have Any Referral Code</div>
      <input
        type="text"
        placeholder="Referral Code"
        value={ReferralCode}
        onChange={(e) => setReferralCode(e.target.value)}
      />
      <div className="code_button_div">
        <button
          type="submit"
          className="code_button"
          onClick={() => setOpenPopUp(false)}
        >
          Submit
        </button>
        <button
          type="submit"
          className="code_button"
          onClick={() => setOpenPopUp(false)}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  );
}

export default ReferalCodeDialog;
