import React from "react";
import Dialog from "@mui/material/Dialog";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { DealerAction } from "../../App/Redux/Actions/WalletActions";

function BeingPartner({ openPopUp, setOpenPopUp }) {
  const userId = useSelector((state) => state.user?.userDetail?.id);

  const dispatch = useDispatch();
  const BecomeDealet = () => {
    userId != null && dispatch(DealerAction({ id: userId }));
    setOpenPopUp(false);
  };
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
      <div className="close-icon-div-text">Are You Interested to be Dealer</div>

      <div className="code_button_div">
        <button
          type="submit"
          className="code_button"
          onClick={() => BecomeDealet()}
        >
          Yes
        </button>
        <button
          type="submit"
          className="code_button"
          onClick={() => setOpenPopUp(false)}
        >
          No
        </button>
      </div>
    </Dialog>
  );
}

export default BeingPartner;
