import React, { useState } from "react";
import "./index.scss";
import loginButton from "../../assets/img/loginButton.png";
import JoinNow from "../../assets/img/joinnow.png";
import Poster from "../../assets/img/banner-06792F54-BB30-4D3E-8EEB-9565ED4B1C92.jpeg";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import Drawer from "@mui/material/Drawer";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import Register from "../Register";
import Login from "../Login";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Header from "../Header";
import { Link } from "react-router-dom";
function HomeDashboard({ isLoggedin }) {
  const [openJoinNow, setOpenJoinNow] = useState({
    bottom: false,
  });
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

  return (
    <div className="loginReg_container">
      <div className="loginReg_top">
        {isLoggedin ? (
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
        <div className="deposit_withdraw">
          <div className="deposit">
            <div className="deposit_title">DEPOSIT</div>
            <Link to={"deposit"}>
              <KeyboardDoubleArrowUpOutlinedIcon sx={{ color: "white" }} />
            </Link>
          </div>
          <div className="deposit_withdraw_login"></div>
          <div className="withdraw">
            <div className="withdraw_title">WITHDRAW</div>
            <KeyboardDoubleArrowDownOutlinedIcon sx={{ color: "white" }} />
          </div>
        </div>
      </div>

      <Register
        open={openJoinNow["bottom"]}
        toggleJoinNowDrawer={toggleJoinNowDrawer}
      />
      <Login open={openLogin["bottom"]} toggleLoginDrawer={toggleLoginDrawer} />

      <div className="loginReg_bottom">
        <img src={Poster} alt="poster" />
        {/* <div className="create_button">
          <AddCircleIcon sx={{ marginRight: "5px" }} />
          <div>Create</div>
        </div>
        <div className="myids_data">
          <div className="myids_data_top">
            <div>My IDs</div>
            <button>View All</button>
          </div>
          <div className="myids_data_body">
            <div>image</div>
            <div>
              <div>link</div>
              <div>iD</div>
              <div>pwd</div>
              <div>Balance</div>
              <div>change password on first login </div>
            </div>
          </div>
          <div className="myids_data_buttons">
            <div className="myids_data_button">
              <ArrowUpwardIcon sx={{ color: "green" }} />
              <div>DEPOSIT</div>
            </div>
            <div className="myids_data_button">
              <ArrowDownwardIcon sx={{ color: "red" }} />
              <div>WITHDRAW</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default HomeDashboard;
