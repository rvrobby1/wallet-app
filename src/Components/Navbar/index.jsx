import Drawer from "@mui/material/Drawer";
import "./index.scss";
// import Navlogo from "../../assets/img/Navlogo.jpg";
import Divider from "@mui/material/Divider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoginStatus } from "../../App/Redux/Actions/AuthActions";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import BeingPartner from "../Register/BeingPartner";
import { GetUserDetails } from "../../App/Redux/Actions/AuthActions";

function Navbar({ open, setOpen }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user?.userDetail);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [clear, setClear] = useState(false);
  const UserToken = localStorage.getItem("UserToken");

  const list1 = [
    {
      name: "Profile",
      link: "profile",
      icon: <PersonOutlineIcon />,
    },
    {
      name: "PassBook",
      link: "tabs/reports",
      icon: <PersonAddAlt1Icon />,
    },
  ];

  const userId =
    UserToken !== "undefined" && UserToken !== null
      ? JSON.parse(UserToken).user_id
      : undefined;

  useEffect(() => {
    if (userId != undefined) {
      dispatch(GetUserDetails({ id: userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (clear === true) {
      window.location.reload();
      setOpen(false);
    }
  }, [clear]);
  return (
    <>
      <Drawer open={open} className="navbar">
        <div className="navbar_header">
          {/* <img src={Navlogo} alt="navlogo" /> */}
          <div className="navbar_logo">
            <h2>Logo</h2>
            <ArrowCircleLeftOutlinedIcon
              onClick={() => setOpen(false)}
              sx={{ width: "30px", height: "30px" }}
            />
          </div>

          <div className="navbar_monumber">+{userData?.phone}</div>
          {/* <Divider /> */}
          {/* <div className="walletBalancetitle">Wallet Balance</div>
          <div className="walletBalance">{WalletBalance ? WalletBalance : 0}</div> */}
        </div>
        <div className="navbar_body">
          <div>
            {list1.map((obj) => (
              <Link to={obj.link} key={obj.name}>
                <div className="list">
                  <div>{obj.icon}</div>
                  <p>{obj.name}</p>
                </div>
              </Link>
            ))}
            {userData?.as_dealer === "0" && (
              <Link onClick={() => setOpenPopUp(true)}>
                <div className="list">
                  <div>
                    <HelpIcon />
                  </div>
                  <p>Are You Interested to be dealer?</p>
                </div>
              </Link>
            )}
          </div>
          <div></div>
          <div className="navbar_logout">
            <Divider />
            <Button
              sx={{ color: "#aca6a6" }}
              className="list"
              onClick={() => {
                localStorage.clear();
                setClear(true);
              }}
            >
              <LogoutIcon />
              Logout
            </Button>
          </div>
        </div>
      </Drawer>
      <BeingPartner openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
    </>
  );
}

export default Navbar;
