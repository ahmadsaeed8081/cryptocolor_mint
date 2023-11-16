import "./sidebar.css";
// import "./side_bar_style.scss";
import React, { useState, useEffect } from "react";
import HeaderMenu from "./HeaderMenu";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const [show, setShow] = useState(false);
  console.log("my sidebar.", openSidebar);

  useEffect(async () => {
    document.body.addEventListener("click", () => {
      document.body.style.overflowY = "auto";
      setOpenSidebar(false);
    });
  }, []);

  return (
    <div className={`sidebar fixed rel anim ${openSidebar ? "show" : "hide"}`}>
      <div
        className={`side-block flex col anim ${openSidebar ? "show" : "hide"}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="hdr flex">
          <div
            onClick={(e) => {
              setOpenSidebar(false);
            }}
          >
            {/* <img src="/images/icons-close.png" className="icon-close" /> */}
          </div>
        </div>
        <div>
          <HeaderMenu />
          {/* <div className="items flex aic flex-col">
            <div className="li cfff font cfff">Fases de Venta</div>
            <div className="li cfff font">NFT</div>
            <div className="li cfff font">Investhome</div>
            <div className="li cfff font">Launch App</div>
            <div className="li cfff font">Onepaper</div>
            <div className="li cfff font">Whitepaper</div>
            <div className="li cfff font">Blog</div>
            <div className="li cfff font">Contacto</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
