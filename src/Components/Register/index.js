import React, { useState } from "react";
import "./index.scss";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import { useFormik } from "formik";
import { InputAdornment, IconButton, Select } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { RegistationValidationSchema } from "../../utills/ValidationSchema";
import { useDispatch } from "react-redux";
import { registrationClick } from "../../App/Redux/Actions/AuthActions";
import Otp from "../OTP/index";

function Register({ open, setOpenJoinNow }) {
  const dispatch = useDispatch();

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [indication, setIndication] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const countries = useSelector((state) => state?.country?.countries?.data);
  const [selectCountry, setSelectCountry] = useState({
    country: 101,
    country_code: 91,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country_code: 91,
      phone: "",
      password: "",
      confirmPassword: "",
      country: 101,
    },
    onSubmit: (values, { resetForm }) => {
      const payload = {
        name: values.name,
        email: values.email,
        country_code: values.country_code,
        phone: values.phone,
        password: values.password,
        country: values.country,
      };
      if (payload) {
        dispatch(registrationClick(payload));
      }
      resetForm({ values: null });

      setIndication(false);
    },
    validationSchema: RegistationValidationSchema,
  });

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowPassword(!showPassword);
      return;
    }
    setPasswordType("password");
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      setShowConfirmPassword(!showConfirmPassword);
      return;
    }
    setConfirmPasswordType("password");
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Drawer anchor={"bottom"} open={open} className="joinNowFrom">
      <div className="yellow_strip"></div>
      <div className="closing">
        <div
          className="closing_button"
          onClick={() => {
            setOpenJoinNow("bottom", false);
            setIndication(false);
          }}
        >
          <HighlightOffSharpIcon />
        </div>
      </div>
      <div className="register_form">
        <div className="register_form_title">REGISTER</div>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="form_container">
            <TextField
              type="name"
              id="standard-required"
              label="Name"
              name="name"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {indication && formik.errors.name ? (
              <div className="error_text">{formik.errors.name}</div>
            ) : null}
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
          </div>
          <div className="mobile-number-label">Mobile Number</div>
          <div className="mobile-number">
            <div className="country-input">
              <Select
                id="country-input"
                label="Select Country"
                variant="standard"
                name="country_code"
                renderValue={() => selectCountry.country_code}
                value={formik.values.country_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {countries?.map((ele, index) => (
                  <MenuItem
                    value={ele.phonecode}
                    key={index}
                    onClick={() => {
                      formik.values.country = ele.id;
                      setSelectCountry({
                        country: ele.id,
                        country_code: ele.phonecode,
                      });
                    }}
                  >
                    {ele.name}
                  </MenuItem>
                ))}
              </Select>

              {indication && formik.errors.country ? (
                <div className="error_text">{formik.errors.country}</div>
              ) : null}
            </div>
            <div className="number-input">
              <TextField
                type="number"
                id="number-input"
                variant="standard"
                name="phone"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {indication && formik.errors.phone ? (
                <div className="error_text">{formik.errors.phone}</div>
              ) : null}
            </div>
          </div>
          <div className="form_container">
            <TextField
              type={passwordType}
              name="password"
              id="standard-required"
              label="Password"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon sx={{ color: "white" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {indication && formik.errors.password ? (
              <div className="error_text">{formik.errors.password}</div>
            ) : null}
            <TextField
              type={confirmPasswordType}
              name="confirmPassword"
              id="standard-required"
              label="Confirm Password"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon sx={{ color: "white" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {indication && formik.errors.confirmPassword ? (
              <div className="error_text">{formik.errors.confirmPassword}</div>
            ) : null}

            {/* <div className="acceptance">
              <input type="checkbox" />
              <div>I've read and accept the </div>
            </div> */}
            <div className="button_div">
              <button
                className="loginbutton"
                type="submit"
                onClick={() => setIndication(true)}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
      <Otp setOpenJoinNow={setOpenJoinNow} />
    </Drawer>
  );
}

export default Register;
