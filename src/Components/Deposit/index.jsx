import React, { useState } from "react";
import "./style.scss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CoinIcon from "../../assets/img/coins-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { DepositeAmountValidationSchema } from "../../utills/ValidationSchema";
function Deposit() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: DepositeAmountValidationSchema,
    onSubmit: (values) => {
      if (values.amount) {
        navigate(`/choose-payment-method/${values.amount}`);
      }
    },
  });

  return (
    <div className="deposit_main">
      <div className="deposit_head">
        <div className="deposit_title">
          <Link to={"/"}>
            <ArrowCircleLeftIcon sx={{ width: "40px", height: "35px" }} />
          </Link>
          <div className="deposit_subtitle">Deposit</div>
        </div>
      </div>

      <div className="deposit_body">
        <div className="wallet-balance">
          <img src={CoinIcon} alt="coinicon" />
          <div className="wallet-balance-data">
            <div className="wallet-balance-data-title">WALLET BALANCE</div>
            <div className="wallet-balance-data-amount">0</div>
          </div>
        </div>
        <div className="deposit_details">
          <div className="deposit_details-balance">
            Deposit Coins
            <hr />
          </div>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <input
              className="deposit-amount-input"
              type="number"
              name="amount"
              id="standard-required"
              label="Coins"
              variant="standard"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
            {formik.errors.amount ? (
              <div className="error_text">{formik.errors.amount}</div>
            ) : null}
            <div style={{ marginBottom: "1rem", fontSize: "14px" }}>
              {" "}
              *Minimum deposit amount is 10 coins{" "}
            </div>

            <button
              className="deposit-transfer-button"
              type="submit"
              disabled={!formik.isValid}
            >
              Deposit Coins
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
