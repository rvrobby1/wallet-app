import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import React, { useState } from 'react'
import './style.scss'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { ThridPartyValidation } from '../../utills/ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { ThirdPartyTransactionAction } from '../../App/Redux/Actions/WalletActions'
import { Link } from 'react-router-dom'

const ThirdPartyTransaction = () => {
  const userId = useSelector((state) => state?.user?.userDetail?.id)
  const [indication, setIndication] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      id: '',
      amount: '',
    },
    validationSchema: ThridPartyValidation,
    onSubmit: (values, { resetForm }) => {
      const PayloadData = {
        notes: `${'ThirdParty'},${values?.id}`,
        amount: values?.amount,
        user_id: userId,
      }
      dispatch(ThirdPartyTransactionAction(PayloadData))
      setIndication(false)
      resetForm({ values: null })
    },
  })
  return (
    <div className="third_party_transaction_main">
      <div className="third_party_transaction_head">
        <div className="third_party_transaction_title">
          <Link to={'/'}>
            <ArrowCircleLeftIcon sx={{ width: '40px', height: '35px' }} />
          </Link>
          <div className="third_party_transaction_subtitle">
            Third Party
          </div>
        </div>
      </div>
      <div className="third_party_transaction_form">

        <div className="third_party_transaction_form_container">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <TextField
              type="name"
              name="id"
              id="standard-required"
              label="Enter Id"
              variant="standard"
              value={formik.values.id}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.id ? (
              <div className="error_text">{formik.errors.id}</div>
            ) : null}

            <TextField
              type="name"
              name="amount"
              id="standard-required"
              label="Enter Amount"
              variant="standard"
              value={formik.values.amount}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {indication && formik.errors.amount ? (
              <div className="error_text">{formik.errors.amount}</div>
            ) : null}
            <div className="third_party_transaction_button_div">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="third_party_transaction_button"
                onClick={() => setIndication(true)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ThirdPartyTransaction
