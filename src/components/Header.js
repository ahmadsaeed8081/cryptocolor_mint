import React, { useState, useEffect } from "react";
import "./header.css";
import HeaderMenu from "./HeaderMenu";
import ArrowDown from "./ArrowDownIcon";
const Header = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowMenu(false);
    });
  }, []);
  






  return (
    <div className="header flex">
      <div className="h-wrap flex aic wrapWidth">
        <div className="h-left flex aic">
          <div className="logo flex aic jc">
            <img src="./images/logo.svg" className="logo-img" />
          </div>
        </div>
        <HeaderMenu />
        <div className="h-right flex aic">
          <div className="btn-connect" onClick={props.connectWallet}>{!props.isWalletConnected? "Connect MetaMask": props._address.slice(0, 5)+".."+props._address.slice(38,42)}</div>
          <div
            className="menu-icon flex"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <img src="images/icon-menu.png" className="ico" />
            <div
              className="manue flex"
              // onClick={(e) => {
              //   console.log("header", showMenu);
              //   setShowMenu(!showMenu);
              // }}
            >
              {showMenu ? <HeaderMenu /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
