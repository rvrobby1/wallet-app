import React from 'react'
import './style.scss'
import Toolbar from '@mui/material/Toolbar'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { IconButton, Typography } from '@mui/material'
const imageList = [
  {
    id: 1,
    imageSrc:
      'https://avrpay.com/api/get/offer/image/offer-3004FAB3-0165-46AD-B84F-5B4F45A0E01B.jpeg',
  },
  {
    id: 2,
    imageSrc:
      'https://avrpay.com/api/get/offer/image/offer-74B53659-34BF-431B-A452-DB9F537953FC.jpeg',
  },
  {
    id: 3,
    imageSrc:
      'https://avrpay.com/api/get/offer/image/offer-49189569-9A24-49F6-B37E-040A4A1BC224.jpeg',
  },
  {
    id: 4,
    imageSrc:
      'https://avrpay.com/api/get/offer/image/offer-49189569-9A24-49F6-B37E-040A4A1BC224.jpeg',
  },
]
function OfferPage() {
  return (
    <div className="ourOffer">
      <div className="ourOffer_header">
        <Toolbar style={{ marginTop: '1rem', marginLeft: '1rem' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowCircleLeftIcon sx={{ width: '40px', height: '35px' }}/>
          </IconButton>
          <h1 className='title'> Offers </h1>
        </Toolbar>
      </div>
      <div className="ourOffer_main">
      <h1 className="ourOffer_title">Top Offers</h1>
        {imageList.map((val, index) => (
          <div className="offer_list" key={val.id}>
            <img src={val.imageSrc} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OfferPage
