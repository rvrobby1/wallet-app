import {
  UserRegistrationApi,
  SendOtpApi,
  GetUserDetailApi,
  VerifyOtpApi,
  UserLoginApi,
  ForgetPasswordApi,
  ChangePasswordApi,
} from "../../api/authApi";
import { call, all, takeEvery, put } from "redux-saga/effects";
import * as actionType from "../Actions/actionsType";
import { toast } from "react-toastify";
function* userRegistration(payload) {
  const { registratedData } = payload;
  const regData = yield call(UserRegistrationApi, registratedData);

  if (regData?.data.ok === true) {
    yield put({
      type: actionType.USER_REGISTRATION_SUCCESS,
      regData,
    });
  } else {
    yield put({
      type: actionType.USER_REGISTRATION_FAIL,
      regErrData: regData,
    });
    toast(regData.data.message);
  }
}
function* userLogin(payload) {
  const { loggedData } = payload;

  const loginData = yield call(UserLoginApi, loggedData);
  if (loginData?.data.login === true) {
    localStorage.setItem("UserToken", JSON.stringify(loginData?.data?.data[0]));
    toast("Login Succesfull !");
    yield put({
      type: actionType.USER_LOGIN_SUCCESS,
      loginData,
    });
  } else {
    toast(loginData.data.message);
    yield put({
      type: actionType.USER_LOGIN_FAIL,
      loginErrData: loginData,
    });
  }
}
function* sendOtp(payload) {
  const { otp } = payload;
  const otpData = yield call(SendOtpApi, otp);
  if (otpData.data.ok === true) {
    toast("Otp Send Successfully");
  } else {
    toast(otpData.data.message);
  }
}

function* verifyOtp(payload) {
  const { otpData } = payload;
  const otpResp = yield call(VerifyOtpApi, otpData);
  if (otpResp?.data.ok === true) {
    yield put({
      type: actionType.VERIFY_OTP_SUCCESS,
      otpResp,
    });
    toast("Successfully Register !");
  } else {
    yield put({
      type: actionType.VERIFY_OTP_FAIL,
      otpRespErr: otpResp,
    });
    toast(otpResp.data.message);
  }
}
function* GetUserDetailsSaga(payload) {
  const { userdetailData } = payload;
  const userDetails = yield call(GetUserDetailApi, userdetailData);
  const data = userDetails?.data.data;
  if (userDetails?.status === 200) {
    yield put({
      type: actionType.GET_USER_DETAILS_SUCCESS,
      data,
    });
  } else {
    yield put({
      type: actionType.GET_USER_DETAILS_FAIL,
      ErrData: data,
    });
  }
}

function* forgetPassword(payload) {
  const { changepassDetails } = payload;
  const ForgotPassDetail = yield call(ForgetPasswordApi, changepassDetails);
}
function* chnagePasswordSaga(payload) {
  const { changepassDetails } = payload;
  const changepassRes = yield call(ChangePasswordApi, changepassDetails);
  if (changepassRes.data.ok == true) {
    yield put({
      type: actionType.CHANGE_PASSWORD_SUCCESS,
    });
    toast("Your password Change Succesfully!");
  }
}

function* AuthSaga() {
  yield all([takeEvery(actionType.USER_REGISTRATION, userRegistration)]);
  yield all([takeEvery(actionType.USER_LOGIN, userLogin)]);
  yield all([takeEvery(actionType.SEND_OTP, sendOtp)]);
  yield all([takeEvery(actionType.VERIFY_OTP, verifyOtp)]);
  yield all([takeEvery(actionType.GET_USER_DETAILS, GetUserDetailsSaga)]);
  yield all([takeEvery(actionType.FORGET_PASSWORD, forgetPassword)]);
  yield all([takeEvery(actionType.CHANGE_PASSWORD, chnagePasswordSaga)]);
}
export default AuthSaga;
