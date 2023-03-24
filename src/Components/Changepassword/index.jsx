import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import './style.scss'
import { InputAdornment, Select } from '@mui/material'
import { IconButton } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { ChangePasswordValidationSchema } from '../../utills/ValidationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { ChangePassword } from '../../App/Redux/Actions/AuthActions'

function Confrimpassword({ setOpen, open }) {
  const dispatch = useDispatch()
  const [indication, setIndication] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordType, setPasswordType] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ConfirmPasswordType, setConfirmPasswordType] = useState('password');
  const user_id = useSelector((state) => state?.user?.userDetail?.id)

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    onSubmit: (values, { resetForm }) => {
      const payload = {
        id: user_id,
        password: values.password,
        confirm_password: values.confirm_password,
      }
      dispatch(ChangePassword(payload))
      resetForm({ values: null })
      setOpen(false)
    },
    validationSchema: ChangePasswordValidationSchema,
  })
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      setShowPassword(!showPassword)
      return
    }
    setPasswordType('password')
    setShowPassword(!showPassword)
  }
  const toggleConfrimPassword = () => {
    if (ConfirmPasswordType === 'password') {
      setConfirmPasswordType('text')
      setShowConfirmPassword(!showConfirmPassword)
      return
    }
    setConfirmPasswordType('password')
    setShowConfirmPassword(!showConfirmPassword)
  }
  return (
    <Dialog open={open} className="forgot-password">
      <div className="close-icon-div">
        <HighlightOffIcon
          onClick={() => {
            setOpen(false)
            formik.resetForm()
          }}
        />
      </div>
      <div className="forgot-password-title">
        Enter details & Craete new password..
      </div>
      <form
        className="forgot-password-form"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
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
                    <VisibilityIcon sx={{ color: 'white' }} />
                  ) : (
                    <VisibilityOffIcon sx={{ color: 'white' }} />
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
          type={ConfirmPasswordType}
          name="confirm_password"
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
                  onClick={toggleConfrimPassword}
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon sx={{ color: 'white' }} />
                  ) : (
                    <VisibilityOffIcon sx={{ color: 'white' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {indication && formik.errors.password ? (
          <div className="error_text">{formik.errors.password}</div>
        ) : null}
        <div className="forgot-password-form-button-div">
          <button type="submit" onClick={() => setIndication(true)}>
            Submit
          </button>
        </div>
      </form>
    </Dialog>
  )
}

export default Confrimpassword
