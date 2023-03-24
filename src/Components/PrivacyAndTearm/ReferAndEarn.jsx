import React from 'react'
import './style.scss'
import Toolbar from '@mui/material/Toolbar'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { Button, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
function ReferAndEarn() {
  return (
    <div className="refer-and-earn_main">
    <div className="refer-and-earn_head">
      <div className="refer-and-earn_title">
        <Link to={"/"}>
        <ArrowCircleLeftIcon />
        </Link>
        <div className="wallet-transfer_subtitle">Refer & Earn</div>
      </div>
    </div>
    <div className="refer-and-earn_body">
    <div className="refer_and_earn_bottom">
        <div className="refer_and_earn_user_detail">
          <div className="refer_and_earn_user_info">
            <p className="refer_and_earn_user_name">Refer Code:</p>
            <p className="refer_and_earn_user_code">76VZJC</p>
          </div>
        </div>
     <Button sx={{backgroundColor:"#fff",color:"#5ab5ee"}} fullWidth>Copy To Share</Button>
      </div>
    </div>
  </div>

  )
}


export default ReferAndEarn
