import React from "react";
import "./index.scss";
import loginButton from "../../assets/img/loginButton.png";
import JoinNow from "../../assets/img/joinnow.png";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiLuggageDepositLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import Header from "../Header/index";
import { Link } from "react-router-dom";
import { useState } from "react";
import Register from "../Register";
import Login from "../Login";
import {
  getCountriesData,
  GetWalletBalance,
} from "../../App/Redux/Actions/WalletActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetUserDetails } from "../../App/Redux/Actions/AuthActions";
import logo from "../../assets/img/insite-vision-logo-svg-vector.svg";
import { BsWhatsapp } from "react-icons/bs";
import Whatsapp from "../Whatsapp";

function NewHomePage() {
  const dispatch = useDispatch();
  const WalletBalance = useSelector(
    (state) => state?.wallet?.wallet_bal?.balance
  );
  const UserToken = localStorage.getItem("UserToken");
  const isAuthenticated =
    UserToken !== "undefined" && UserToken !== null ? true : false;
  const userId =
    UserToken !== "undefined" && UserToken !== null
      ? JSON.parse(UserToken).user_id
      : undefined;

  const data = [
    {
      to: "Party1",
      amount: "+78",
      Date: "02/03/2023",
    },
    {
      to: "Party2",
      amount: "+89",
      Date: "15/02/2023",
    },
    {
      to: "Party3",
      amount: "+97",
      Date: "25/02/2023",
    },
    {
      to: "Party4",
      amount: "+63",
      Date: "28/01/2023",
    },
  ];
  const [openJoinNow, setOpenJoinNow] = useState({ bottom: false });
  const [openLogin, setOpenLogin] = useState({
    bottom: false,
  });
  const toggleJoinNowDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenJoinNow({ ...openJoinNow, [anchor]: open });
  };
  const toggleLoginDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenLogin({ ...openLogin, [anchor]: open });
  };
  useEffect(() => {
    dispatch(getCountriesData());
  }, []);
  return (
    <div className="new-home-page">
      <div className="new-home-page-topdiv">
        {isAuthenticated ? (
          <Header />
        ) : (
          <div className="loginReg_button">
            <img
              className="Joinnow_button"
              src={JoinNow}
              alt="JoinNow"
              onClick={toggleJoinNowDrawer("bottom", true)}
            />
            <img
              className="login_button"
              src={loginButton}
              alt="loginbutton"
              onClick={toggleLoginDrawer("bottom", true)}
            />
          </div>
        )}
        {/* <div className="new-home-page-header">
          <div>
            <div>Hello,</div>
            <div style={{ marginTop: "0.5rem", fontWeight: 700 }}>
              USER USER
            </div>
          </div>
          <div className="new-home-page-header-avatar">
            <RxAvatar />
          </div>
        </div> */}
        <Register
          open={openJoinNow["bottom"]}
          setOpenJoinNow={setOpenJoinNow}
        />
        <Login open={openLogin["bottom"]} setOpenLogin={setOpenLogin} />
        <div className="new-home-page-balance">
          {isAuthenticated ? (
            <>
              <div className="new-home-page-balance-title">Total Balance</div>
              <div className="new-home-page-balance-money">
                {WalletBalance ? WalletBalance : 0}
              </div>
            </>
          ) : (
            <>
              {/* <div className="new-home-page-balance-title">Total Balance</div> */}
              <div className="new-home-page-balance-money">
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    width: "150px",
                    height: "90px",
                    borderRadius: "20px",
                    backgroundColor: "#01b0ff",
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div className="new-home-page-buttons">
          <div className="new-home-page-button-main">
            <Link to={"withdrawal"}>
              <div className="new-home-page-button">
                <BiMoneyWithdraw />
              </div>
            </Link>
            <div className="new-home-page-button-title">WITHDRAW</div>
          </div>
          <div className="new-home-page-button-main">
            <Link to={"deposit"}>
              <div className="new-home-page-button">
                <RiLuggageDepositLine />
              </div>
            </Link>
            <div className="new-home-page-button-title">DEPOSIT</div>
          </div>
          <div className="new-home-page-button-main">
            <Link to={"third-party"}>
              <div className="new-home-page-button">
                <AiOutlineTransaction />
              </div>
            </Link>
            <div className="new-home-page-button-title">THIRD PARTY</div>
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <div className="latest-transaction">
          <div className="latest-transaction-title">
            <div>Latest Transactions</div>

            <Link to={"tabs/reports"}>
              <div style={{ color: "#aca6a6", fontSize: "19px" }}>See All</div>
            </Link>
          </div>
          <div className="latest-transaction-data">
            {data.map((ele, idx) => (
              <div className="latest-transaction-single-data" key={idx}>
                <div>
                  <div className="latest-transaction-date">{ele.Date}</div>
                  <div className="latest-transaction-party">{ele.to}</div>
                </div>
                <div className="latest-transaction-amount">{ele.amount}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Whatsapp />
    </div>
  );
}

export default NewHomePage;
