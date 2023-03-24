import React, { useEffect, useState } from "react";
import "./style.scss";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useFormik } from "formik";
import { HawalaTransferValidationSchema } from "../../utills/ValidationSchema";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import {
  GetHawalaList,
  WithDrawRequest,
} from "../../App/Redux/Actions/WalletActions";
function HawalaTransfer({ HawalaiFormOpen, setHawalaiFormOpen }) {
  const UserToken = localStorage.getItem("UserToken");
  const userId =
    UserToken !== "undefined" && UserToken !== null
      ? JSON.parse(UserToken).user_id
      : undefined;
  const hawalaList = useSelector((state) => state?.hawala?.hawalalist_data);
  const amount = window.location.pathname.split("/")[2];
  const [indication, setIndication] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      hawala_value: "",
      // AccountNumber: "",
      fullName: "",
      phoneNumber: null,
      city: "",
    },
    validationSchema: HawalaTransferValidationSchema,
    onSubmit: (values, { resetForm }) => {
      // console.log(values, "values");
      const PayloadData = {
        notes: `${"HawalaTransfer"},${values?.hawala_value},${
          values?.fullName
        },${values?.phoneNumber},${values?.city}`,
        amount: amount,
        user_id: userId,
      };
      dispatch(WithDrawRequest(PayloadData));
      setHawalaiFormOpen(false);
      setIndication(false);
      resetForm({ values: null });
    },
  });
  useEffect(() => {
    dispatch(GetHawalaList());
  }, []);
  return (
    <Drawer anchor={"bottom"} open={HawalaiFormOpen} className="joinNowFrom">
      <div className="yellow_strip"></div>
      <div className="closing">
        <div
          className="closing_button"
          onClick={() => {
            setHawalaiFormOpen(false);
            setIndication(false);
          }}
        >
          <HighlightOffSharpIcon />
        </div>
      </div>

      <div className="withdrawal_form">
        <div className="withdrawal_form_title">
          <h3>Add New Hawala</h3>
        </div>
        <p className="withdrawal_subtitle"></p>
        <div className="withdrawal_form_container">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <TextField
              className="withdrawal_select"
              select
              variant="standard"
              id="hawala_value"
              name="hawala_value"
              value={formik.values.hawala_value}
              onChange={formik.handleChange}
              label="Select Hawala"
              onBlur={() => {
                formik.handleBlur({ target: { name: "hawala_value" } });
              }}
              SelectProps={{
                IconComponent: () => <KeyboardArrowDownIcon />,
              }}
            >
              {hawalaList !== null &&
                hawalaList.map((item, index) => (
                  <MenuItem value={item.name} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
            </TextField>

            {indication && formik.errors.hawala_value ? (
              <div className="error_text">{formik.errors.hawala_value}</div>
            ) : null}

            {/* <TextField
              type="name"
              name="AccountNumber"
              id="standard-required"
              label="Account Number"
              variant="standard"
              value={formik.values.AccountNumber}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.AccountNumber ? (
              <div className="error_text">{formik.errors.AccountNumber}</div>
            ) : null} */}

            <TextField
              type="name"
              name="fullName"
              id="standard-required"
              label="Full Name"
              variant="standard"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.fullName ? (
              <div className="error_text">{formik.errors.fullName}</div>
            ) : null}

            <TextField
              type="number"
              name="phoneNumber"
              id="standard-required"
              label="Phone Number"
              variant="standard"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.phoneNumber ? (
              <div className="error_text">{formik.errors.phoneNumber}</div>
            ) : null}

            <TextField
              type="text"
              name="city"
              id="standard-required"
              label="City"
              variant="standard"
              value={formik.values.city}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.city ? (
              <div className="error_text">{formik.errors.city}</div>
            ) : null}

            <div className="withdrawal_button_div">
              <button
                type="submit"
                disabled={!formik.isValid}
                onClick={() => setIndication(true)}
                className="withdrawal_button"
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
export default HawalaTransfer;
