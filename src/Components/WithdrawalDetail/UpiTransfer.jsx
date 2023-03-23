import React, { useState } from "react";
import "./style.scss";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useFormik } from "formik";
import { UpiTransferValidationSchema } from "../../utills/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { WithDrawRequest } from "../../App/Redux/Actions/WalletActions";
function UpiTransfer({ UpiFormOpen, setUpiFormOpen }) {
  const userId = useSelector((state) => state?.user?.userDetail?.id);
  const amount = window.location.pathname.split("/")[2];
  const [indication, setIndication] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      upiId: "",
    },
    validationSchema: UpiTransferValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const PayloadData = {
        notes: `${"UPI"},${values.name},${values.upiId}`,
        amount: amount,
        user_id: userId,
      };
      dispatch(WithDrawRequest(PayloadData));
      setUpiFormOpen(false);
      setIndication(false);
      resetForm({ values: null });
    },
  });
  return (
    <Drawer anchor={"bottom"} open={UpiFormOpen} className="joinNowFrom">
      <div className="yellow_strip"></div>
      <div className="closing">
        <div
          className="closing_button"
          onClick={() => {
            setUpiFormOpen(false);
            setIndication(false);
          }}
        >
          <HighlightOffSharpIcon />
        </div>
      </div>

      <div className="withdrawal_form">
        <div className="withdrawal_form_title">
          <h3>Add New UPI Id</h3>
        </div>
        <p className="withdrawal_subtitle"></p>
        <div className="withdrawal_form_container">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <TextField
              type="name"
              name="name"
              id="standard-required"
              label="Name"
              variant="standard"
              value={formik.values.name}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.name ? (
              <div className="error_text">{formik.errors.name}</div>
            ) : null}

            <TextField
              type="name"
              name="upiId"
              id="standard-required"
              label="UPI Id"
              variant="standard"
              value={formik.values.upiId}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.upiId ? (
              <div className="error_text">{formik.errors.upiId}</div>
            ) : null}
            <div className="withdrawal_button_div">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="withdrawal_button"
                onClick={() => setIndication(true)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Drawer>
  );
}

export default UpiTransfer;
