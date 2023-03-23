import React, { useState } from "react";
import "./index.scss";
import TextField from "@mui/material/TextField";
import { InputAdornment, Select } from "@mui/material";
import { IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Drawer from "@mui/material/Drawer";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import ForgotPassword from "../Forgotpassword";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginValidationSchema } from "../../utills/ValidationSchema";
import { loginClick, LoginStatus } from "../../App/Redux/Actions/AuthActions";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
function Login({ open, setOpenLogin }) {
  const dispatch = useDispatch();
  const [selectCountry, setSelectCountry] = useState({
    country: 101,
    country_code: 91,
  });
  const [indication, setIndication] = useState(false);
  const [openForgotPassPopup, setOpenForgotPassPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const countries = useSelector((state) => state?.country?.countries?.data);
  const token = useSelector(
    (state) => state?.user?.loginData?.data?.data[0]?.token
  );

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
      country_code: 91,
    },
    onSubmit: (values) => {
      dispatch(
        loginClick({
          phone: values.phone,
          password: values.password,
        })
      );
      setIndication(false);
    },
    validationSchema: loginValidationSchema,
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
  useEffect(() => {
    if (token !== undefined) {
      dispatch(LoginStatus(true));
      navigate("/");
      setOpenLogin("bottom", false);
    } else {
      dispatch(LoginStatus(false));
    }
  }, [token]);
  return (
    <Drawer anchor={"bottom"} open={open} className="joinNowFrom">
      <div className="yellow_strip"></div>
      <div className="closing">
        <div
          className="closing_button"
          onClick={() => {
            setOpenLogin("bottom", false);
            setIndication(false);
          }}
        >
          <HighlightOffSharpIcon />
        </div>
      </div>

      <div className="register_form">
        <div className="register_form_title">Login</div>

        <div className="form_container">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="login-mobile-number-label">Phone Number</div>
            <div className="login-mobile-number">
              <div className="country-input">
                <Select
                  id="country-input"
                  select
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

            <div className="forgot_password">
              <p onClick={() => setOpenForgotPassPopup(true)}>
                {" "}
                ForgotPassword?
              </p>
            </div>
            <div className="button_div">
              <button
                className="loginbutton"
                type="submit"
                onClick={() => setIndication(true)}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
      <ForgotPassword
        openForgotPassPopup={openForgotPassPopup}
        setOpenForgotPassPopup={setOpenForgotPassPopup}
      />
    </Drawer>
  );
}

export default Login;
