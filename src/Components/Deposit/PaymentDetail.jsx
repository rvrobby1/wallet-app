import React, { useState, useEffect } from 'react'
import './style.scss'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useSelector } from 'react-redux'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  GetHawalaList,
  GetDepositDetail,
  RequestDeposite,
} from '../../App/Redux/Actions/WalletActions'
import { useDispatch } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp'
import { toast } from 'react-toastify'
import DepositHawala from './DepositHawala'
import ReferalCodeDialog from '../ReferralPopup/ReferralPopup'
const PaymentDetail = ({ isBackground, paymentInfo }) => {
  const dispatch = useDispatch()
  const [FrontSidefile, setFrontSidefile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [openPopUp, setOpenPopUp] = useState(true)
  const [ReferralCode, setReferralCode] = useState('')
  const depositDetail = useSelector((state) => state?.deposit?.Deposit_detail)
  const UserToken = localStorage.getItem('UserToken')
  const userId =
    UserToken !== 'undefined' && UserToken !== null
      ? JSON.parse(UserToken).user_id
      : undefined
  const amount = window.location.pathname.split('/')[2]
  useEffect(() => {
    dispatch(GetDepositDetail())
    dispatch(GetHawalaList())
  }, [])
  const onFileUploadChange = async (e) => {
    const fileInput = e.target
    if (!fileInput.files) {
      await alert('No file was chosen', 'error')
      return
    }
    if (!fileInput.files || fileInput.files.length === 0) {
      await alert('Files list is empty', 'error')
      return
    }
    const file = fileInput.files[0]
    if (!file.type.startsWith('image')) {
      await alert('Please select a valide image', 'error')
      return
    }
    setFrontSidefile(file)
    setPreviewUrl(URL.createObjectURL(file))
    e.currentTarget.type = 'text'
    e.currentTarget.type = 'file'
  }

  const onClick = React.useCallback(({ target: { innerText } }) => {
    console.log(`Clicked on "${innerText}"!`)
  }, [])
  const onCopy = React.useCallback(() => {
    toast('Coiped to Clipboard!')
  }, [])
  const SubmitDepositReq = () => {
    const PayloadData = {
      notes: paymentInfo,
      amount: amount,
      image: previewUrl,
      user_id: userId,
      refer_code: ReferralCode,
    }
    dispatch(RequestDeposite(PayloadData))
    setPreviewUrl(null)
  }

  return (
    <>
      {isBackground === 'Banktransfer' ||
      isBackground === 'Paytm' ||
      isBackground === 'GooglePay' ||
      isBackground === 'phone_pe' ||
      isBackground === 'UPI' ||
      isBackground === 'Other' ? (
        <div className="Payment_detail">
          <div className="Payment_detail_title">
            Make your payment on the details below
          </div>

          {isBackground === 'Banktransfer' && (
            <>
              <div className="person_deatils">
                <div className="person_name">Bank Name </div>
                <div className="person_data">
                  {depositDetail?.bank_name}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.bank_name}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">Account Holder Name </div>
                <div className="person_data">
                  {depositDetail?.account_holder_name}{' '}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.account_holder_name}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">Account Number</div>
                <div className="person_data">
                  {depositDetail?.account_number}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.account_number}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">IFSC</div>
                <div className="person_data">
                  {depositDetail?.ifsc_code}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.ifsc_code}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}
          {isBackground === 'Paytm' && (
            <>
              <div className="person_deatils">
                <div className="person_name">Person Name</div>
                <div className="person_data">
                  {depositDetail?.paytm_name}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.paytm_name}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">Paytm Id</div>
                <div className="person_data">
                  {depositDetail?.paytm_link}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.paytm_link}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}
          {isBackground === 'GooglePay' && (
            <>
              <div className="person_deatils">
                <div className="person_name">Google Pay Name</div>
                <div className="person_data">
                  {depositDetail?.gpay_name}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.gpay_name}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">Google Pay Id</div>
                <div className="person_data">
                  {depositDetail?.gpay_link}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.gpay_link}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}
          {isBackground === 'phone_pe' && (
            <>
              <div className="person_deatils">
                <div className="person_name">Phone Pay Name</div>
                <div className="person_data">
                  {depositDetail?.phonepay_name}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.phonepay_name}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        // marginLeft: '0.2rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">Phone Pay Id</div>
                <div className="person_data">
                  {depositDetail?.phonepay_link}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.phonepay_link}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}

          {isBackground === 'UPI' && (
            <>
              <div className="person_deatils">
                <div className="person_name">UPI Name</div>
                <div className="person_data">
                  {depositDetail?.bhim_name}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.bhim_name}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">UPI Id</div>
                <div className="person_data">
                  {depositDetail?.bhim_link}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.bhim_link}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}

          {isBackground === 'Other' && (
            <>
              <div className="person_deatils">
                <div className="person_name">Name</div>
                <div className="person_data">
                  {depositDetail?.other_name}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.other_name}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
              <div className="person_deatils">
                <div className="person_name">Id</div>
                <div className="person_data">
                  {depositDetail?.other_link}
                  <CopyToClipboard
                    onCopy={onCopy}
                    options={{ message: 'Whoa!' }}
                    text={depositDetail?.other_link}
                  >
                    <ContentCopySharpIcon
                      onClick={onClick}
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '0.5rem',
                      }}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            </>
          )}
          <div className="file_main">
            <div className=" border rounded-lg mt-3">
              <form onSubmit={(e) => e.preventDefault()}>
                {previewUrl ? (
                  <>
                    <div className="deposit_close_icon">
                      <HighlightOffIcon
                        onClick={() => {
                          setFrontSidefile(null)
                          setPreviewUrl(null)
                        }}
                      />
                    </div>
                    <img
                      alt="file uploader preview"
                      src={previewUrl}
                      width={441}
                      height={250}
                      layout="responsive"
                      className="Person_preview_img"
                    />
                    <div className="upload_button_div">
                      <button
                        type="submit"
                        // disabled={!formik.isValid}
                        className="deposit_button"
                        onClick={() => SubmitDepositReq()}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="file_label">
                      <span>
                        <ControlPointIcon />
                      </span>
                      <input
                        className="file_input"
                        name="file"
                        type="file"
                        onChange={onFileUploadChange}
                      />
                    </label>
                    <p className="clickfile">
                      {' '}
                      Click here to upload payment screenshot.
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : null}
      {isBackground === 'Hawala' && <DepositHawala />}
      <ReferalCodeDialog
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        ReferralCode={ReferralCode}
        setReferralCode={setReferralCode}
      />
    </>
  )
}

export default PaymentDetail
