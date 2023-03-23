import React from "react";
import "./index.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_icon">
        <HomeOutlinedIcon sx={{ color: "#8e8b8b" }} />
        <Link to={"/"} className="footer_icon_title">
          Home
        </Link>
      </div>
      <div className="footer_icon">
        <SellOutlinedIcon sx={{ color: "#8e8b8b" }} />
        <Link to={"tabs/offers"} className="footer_icon_title">
          Offers
        </Link>
      </div>

      <div className="footer_icon">
        <MenuBookIcon sx={{ color: "#8e8b8b" }} />
        <div className="footer_icon_title">Passbook</div>
      </div>

      <div className="footer_icon">
        <AssignmentIndIcon sx={{ color: "#8e8b8b" }} />
        <div className="footer_icon_title">IDs</div>
      </div>
    </div>
  );
}

export default Footer;
