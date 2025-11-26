import React from "react";
import { Link } from "react-router-dom";
function Header({ isValid2, nameOfTheUser }) {
  return (
    <div className="header-content">
      <div className="title">
        <Link to="/">
          <button>
            <p>GOLDEN NUTS</p>
          </button>
        </Link>
        <br />
      </div>
      <div className="buttons-inside-the-header">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <Link to="/about">
          <button>ABOUT US</button>
        </Link>
        <Link to="/cart">
          <button>CART</button>
        </Link>
        <Link to="/contact">
          <button>CONTACT</button>
        </Link>
      </div>
      {!isValid2 && (
        <div className="margin2">
          <Link to="/sign_up">
            <button>SIGN UP</button>
          </Link>
          <Link to="/sign_in">
            <button>SIGN IN</button>
          </Link>
        </div>
      )}
      {isValid2 && (
        <div className="margin3">
          <p>{nameOfTheUser}</p>
        </div>
      )}
    </div>
  );
}
export default Header;
