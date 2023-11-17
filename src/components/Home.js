import React, { useState,useRef } from "react";
import { useColor } from "react-color-palette";
import Color from "./Color";
import "./Home.css";
// import { SketchPicker } from "react-color";
import Footer from "./Footer/Footer";
function Home(props) {
  const [color, setColor] = useColor("hex", "#11212");
  const [myColor, setMyColor] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [description, set_Description] = useState("");
  const [Name1, set_Name] = useState("");


  const divRef = useRef(null);
  // const nameRef = useRef(null);
  // const desc_Ref = useRef(null);

  return (
    <>
      {/* <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} /> */}
      {/* <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} /> */}
      <div className={`home flex flex-col ${props.show ? "show" : ""}`}>
        <div className="home-wrap flex aic jc wrapWidth">
          <div className="show-color flex">
            <button className="btn flex aic jc" onClick={(e) => props.setShow(!props.show)}>
              {props.show ? (
                <div>Hide Color Picker</div>
              ) : (
                <div>Show Color Picker</div>
              )}
            </button>
          </div>

          <div className={`home-l flex aic flex-col ${props.show ? "show" : ""}`}>
            <div className="label font">What is your favorite color?</div>
            {/* <PickColor /> */}
            <div className="leftbox">
              <Color color={color} setColor={setColor} />
              <div className="add-lbl">
                <div className="lbl font">Color Is Availabel To Mint</div>
              </div>
            </div>
          </div>

          <div className="middlebox flex aic jc flex-col" ref={ divRef }>
            <div
              className="boxinbox"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="boxtext">{color.hex}</div>
            
            <div className="boxmaintext">crypto color collection</div>
          </div>

          <div className="home-r flex aic jc">
            <div className="meta-r flex flex-col aic jc">
              <div className="input-r flex flex-col">
                <div className="lbl">Enter Name</div>
                <input
                  type="text"
                  className="form__field txt"
                  placeholder="Type a name for your color"
                  name="colorName"
                  value={Name1}
                  onChange= {(e)=>set_Name(e.target.value)}
                  // ref={nameRef}
                />
              </div>
              <div className="input-r flex flex-col" style={{ border:"1 solid white"}}>
                <div className="lbl">Description</div>
                <textarea

                style={{ height:70 ,   resize: "none"
                }}
                  type="text"
                  className="form__field1 txt"
                  placeholder="Write Description"
                  name="colorName"
                  height="30"
                  value={description}
                  onChange= {(e)=>set_Description(e.target.value)}
                  // ref={desc_Ref}
                />
              </div>
              {/* <div className="mint flex ">Mint</div> */}
              <div className="my-btn flex aic jc"  onClick={()=>{props.convert(divRef.current,Name1,color.hex,description)}}>Mint your color now</div>
              {/* <div className="button btn flex aic jc">Mint your color now</div> */}
              <div className="rightbox">
                Note: If the Mint button is not responding, open and unlock
                Metamask with your password and try again
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Home;
