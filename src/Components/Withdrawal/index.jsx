import React, { useState } from 'react'
import './index.scss'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import CoinIcon from '../../assets/img/coins-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { withdraweAmountValidationSchema } from '../../utills/ValidationSchema'
import { useSelector } from 'react-redux'
function Withdrawal() {
  const navigate = useNavigate()
  const WalletBalance = useSelector(
    (state) => state?.wallet?.wallet_bal?.balance,
  )
  const formik = useFormik({
    initialValues: {
      withdraw_amount: "",
    },
    validationSchema: withdraweAmountValidationSchema,
    onSubmit: (values) => {
      if (values.withdraw_amount) {
        navigate(`/bank-details/${values.withdraw_amount}`);
      }
    },
  });

  return (
    <div className="withdraw_main">
      <div className="withdraw_head">
        <div className="withdraw_title">
          <Link to={"/"}>
            <ArrowCircleLeftIcon sx={{ width: "40px", height: "35px" }} />
          </Link>
          <div className="withdraw_subtitle">Withdraw</div>
        </div>
      </div>

      <div className="withdraw_body">
        <div className="wallet-balance">
          <img src={CoinIcon} alt="coinicon" />
          <div className="wallet-balance-data">
            <div className="wallet-balance-data-title">WALLET BALANCE</div>
            <div className="wallet-balance-data-amount">{WalletBalance}</div>
          </div>
        </div>
        <div className="withdraw_details">
          <div className="withdraw_details-balance">
            Withdraw Coins
            <hr />
          </div>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <input
              className="withdraw-amount-input"
              type="number"
              name="withdraw_amount"
              id="standard-required"
              label="Coins"
              variant="standard"
              value={formik.values.withdraw_amount}
              onChange={formik.handleChange}
              placeholder="Enter here"
            />
            {formik.errors.withdraw_amount ? (
              <div className="error_text">{formik.errors.withdraw_amount}</div>
            ) : null}
            <div style={{ marginBottom: "1rem", fontSize: "14px" }}>
              {" "}
              *Minimum withdraw amount is 10 coins{" "}
            </div>

            <button
              className="withdraw-transfer-button"
              type="submit"
              disabled={!formik.isValid}
            >
              withdraw Conis
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;
