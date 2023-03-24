import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import "./index.scss";

function Whatsapp() {
  return (
    <article className="contact__option">
      <a href="https://api.whatsapp.com/send?phone=919723328348">
        <BsWhatsapp className="contact__option-icon" />
      </a>
    </article>
  );
}

export default Whatsapp;
