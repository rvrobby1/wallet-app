import React, { useEffect, useState } from "react";
import "./index.scss";
import { Avatar, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Confrimpassword from "../Changepassword/index";
import { GetUserDetails } from "../../App/Redux/Actions/AuthActions";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

function Profile() {
  const userDetail = useSelector((state) => state?.user.userDetail);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const UserToken = localStorage.getItem("UserToken");
  const userId =
    UserToken !== "undefined" && UserToken !== null
      ? JSON.parse(UserToken).user_id
      : undefined;

  useEffect(() => {
    if (userId != undefined) {
      dispatch(GetUserDetails({ id: userId }));
    }
  }, [userId]);

  return (
    <>
      <div className="profile_main">
        <div className="profile_head">
          <div className="profile_title">
            <Link to={"/"}>
              <ArrowCircleLeftIcon sx={{ width: "40px", height: "35px" }} />
            </Link>
            <div className="profile_subtitle">Profile</div>
          </div>
        </div>

        <div className="profile_body">
          <div className="profile_details">
            <div className="profile_bottom">
              <Avatar className="profile_avatar" />
              {/* <button className="logout">
          <div style={{ marginRight: "1rem" }}>Logout</div>
          <LogoutIcon />
        </button> */}
              <div>
                <div className="profile_subdata">
                  <PersonIcon sx={{ marginRight: "1rem" }} />
                  <div>{userDetail?.name}</div>
                </div>
                <Divider />
                <div className="profile_subdata">
                  <EmailIcon sx={{ marginRight: "1rem" }} />
                  <div>{userDetail?.email}</div>
                </div>
                <Divider />
                <div className="profile_subdata">
                  <PhoneIphoneIcon sx={{ marginRight: "1rem" }} />
                  <div>{userDetail?.phone}</div>
                </div>
                <Divider />
                <div className="profile_subdata">
                  Member Since : {userDetail?.created_at.substr(0, 10)}
                </div>
                <Divider />
                <div className="profile_subdata">
                  Dealership :{" "}
                  {userDetail?.as_dealer === "0" ? "Not Active" : "Active"}
                </div>
                <Divider />
                <div className="profile_subdata"></div>
              </div>

              <button onClick={() => setOpen(true)} className="changePassword">
                Change Password
              </button>

              {/* <div className="reward_refer">
          <div className="rewards">
            <EmojiEventsIcon sx={{ color: "white", width: '40px', height: '35px' }}/>
            <div className="rewards_title">
              <div>Rewards Earned</div>
              <div className="coin">0</div>
            </div>
          </div>
          <div className="referred">
            <GroupAddOutlinedIcon sx={{ color: "white", width: '40px', height: '35px' }} />
            <div className="rewards_title">
              <div>Users Referred</div>
              <div className="coin">0</div>
            </div>
          </div>
        </div> */}
            </div>
          </div>
        </div>
      </div>
      <Confrimpassword open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;
