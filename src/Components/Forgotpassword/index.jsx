import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import "./index.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { ForgotPasswordValidationSchema } from "../../utills/ValidationSchema";
import { useDispatch } from "react-redux";
import {Forgetpassword} from '../../App/Redux/Actions/AuthActions'

function ForgotPassword({ setOpenForgotPassPopup, openForgotPassPopup }) {
  const dispatch = useDispatch();
  const [indication, setIndication] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(Forgetpassword(values));
      resetForm({ values: null });
    },
    validationSchema: ForgotPasswordValidationSchema,
  });
  return (
    <Dialog open={openForgotPassPopup} className="forgot-password">
      <div className="close-icon-div">
        <HighlightOffIcon
          onClick={() => {
            setOpenForgotPassPopup(false);
            formik.resetForm();
          }}
        />
      </div>
      <div className="forgot-password-title">
        Enter details and generate new password...
      </div>
      <form
        className="forgot-password-form"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <TextField
          type="email"
          id="standard-required"
          label="Email Id"
          variant="standard"
          name="email"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {indication && formik.errors.email ? (
          <div className="error_text">{formik.errors.email}</div>
        ) : null}

        <TextField
          type="text"
          label="Password"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          id="password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {indication && formik.errors.password ? (
          <div className="error_text">{formik.errors.password}</div>
        ) : null}
        <TextField
          type="text"
          name="confirm_password"
          id="standard-required"
          label="Confirm Password"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {indication && formik.errors.confirm_password ? (
          <div className="error_text">{formik.errors.confirm_password}</div>
        ) : null}
        <div className="forgot-password-form-button-div">
          <button type="submit" onClick={() => setIndication(true)}>
            Submit
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default ForgotPassword;
