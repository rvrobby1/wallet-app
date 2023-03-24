import React from "react";
import { Routes, Route } from "react-router-dom";
import OfferPage from "../Components/Offer";
import ReferAndEarn from "../Components/PrivacyAndTearm/ReferAndEarn";
import Profile from "../Components/Profile";
import WithdrawalDetail from "../Components/WithdrawalDetail/index";
import PrivateRoute from "./PrivateRoute";
import Withdrawal from "../Components/Withdrawal";
import Deposit from "../Components/Deposit";
import DepositPayment from "../Components/Deposit/DepositPayment";
import NewHomePage from "../Components/NewHomePage";
import Passbook from "../Components/Passbook";
import { useEffect } from "react";
import ThirdPartyTransaction from "./../Components/3rdPartyTransaction/index";
import Whatsapp from "../Components/Whatsapp";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<NewHomePage />} />
      <Route
        path="tabs/offers"
        exact
        element={
          <PrivateRoute>
            <OfferPage />
            <Whatsapp />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
            <Whatsapp />
          </PrivateRoute>
        }
      />
      <Route
        path="bank-details/:coins"
        element={
          <PrivateRoute>
            <WithdrawalDetail />
            <Whatsapp />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="withdrawal"
        element={
          <PrivateRoute>
            <Withdrawal />
            <Whatsapp />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="refer-and-earn"
        element={
          <PrivateRoute>
            <ReferAndEarn />
            <Whatsapp />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="deposit"
        element={
          <PrivateRoute>
            <Deposit />
            <Whatsapp />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="choose-payment-method/:coins"
        element={
          <PrivateRoute>
            <DepositPayment />
            <Whatsapp />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="tabs/reports"
        element={
          <PrivateRoute>
            <Passbook />
            <Whatsapp />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="third-party"
        element={
          <PrivateRoute>
            <ThirdPartyTransaction />
            <Whatsapp />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
