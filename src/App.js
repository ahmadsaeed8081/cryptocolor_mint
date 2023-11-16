import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer/Footer";
import Web3Modal from 'web3modal'
import html2canvas from 'html2canvas';
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ContractAddress,abi } from "./config";
import {ethers } from 'ethers'
import {Buffer} from 'buffer';
const projectId="24THgNQOzFCOa5IPMccdboQJybN";
const projectSecret="49c0eb46af3b0fe34d451b0f19947684";
const auth = 'Basic ' +  Buffer.from(projectId + ':' + projectSecret).toString('base64')
const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  })


function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [show, setShow] = useState(false);

  const [fileUrl, setFileUrl] = useState(null)
  const [imgSrc,setImageSrc] = useState("")
  const [formInput, updateFormInput] = useState({name: '', description:''})

  const [_address, setAddress] = useState("0");
  const [minted_colors, set_mintedColors] = useState([]);

  
  const [isWalletConnected, setisWalletConnected] = useState(false);
  //const router = useRouter();

  // async function onChange(e) {
  //     const file = e.target.files[0]
  //     try{ //try uploading the file
  //         const added = await client.add(
  //             file,
  //             {
  //                 progress: (prog) => console.log(`received: ${prog}`)
  //             }
  //         )
  //         //file saved in the url path below
  //         const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //         setFileUrl(url)
  //     }catch(e){
  //         console.log('Error uploading file: ', e)
  //     }
  // }

  // //1. create item (image/video) and upload to ipfs
  // async function createItem(){
  //     // const {name} = formInput; //get the value from the form input
  //     const description="this is description";
  //     const name="cryptoColor";

  //     //form validation
  //     // if(!name || !fileUrl) {
  //     //     return
  //     // }
  //     const data = JSON.stringify({
  //         name, description, image: fileUrl
  //     });

  //     try{
  //         const added = await client.add(data)
  //         const url = `https://ipfs.infura.io/ipfs/${added.path}`
  //         //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
  //     }catch(error){
  //         console.log(`Error uploading file: `, error);
  //     }
  // }
// const CHAIN_ID = "56";
  // const CHAIN_ID1 = "0x38";

  const CHAIN_ID = "80001";
  const CHAIN_ID1 = "0x13881";

  async function connectWallet() {
    if (!window.ethereum) {
      alert(
        "it looks like that you dont have metamask installed, please install"
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      // setNetworkID(networkId);
      console.log(
        "id from async func is: " + CHAIN_ID + "hellggg " + networkId.toString()
      );

      // console.log(IDs)
      if (networkId == CHAIN_ID) {
        setisWalletConnected(true);

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
       
        console.log("its in net" + isWalletConnected);

        //sign the transaction
        const signer = provider.getSigner();
        let contract = new ethers.Contract(ContractAddress,abi, signer);

        let ret = await contract.listOfColors();
        console.log("its in net" + isWalletConnected);

        set_mintedColors(ret);
        console.log("All Minted Colors "+ret);
        setAddress(window.ethereum.selectedAddress);
        // mount1();
        // return accounts[0].toString();
      } else {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID1 }],
        });
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }






 async function convert(elements,userName,colorName,Description){

  if(!isWalletConnected)
  {
    alert("kindly connect your Wallet");
    return;
  }
  console.log(userName);
  console.log(colorName);

    html2canvas(elements).then(async function(canvas) {
      // document.body.appendChild(canvas);
      const data1=canvas.toDataURL();
      
      var img = new Image();
      img.src = data1;
      img.width=450;
      img.height=450;

      console.log("hello janu"+ img.src);
      setImageSrc(img.src)
      console.log("helo zindagi"+img.src);

      // document.body.appendChild(img);
      const description=Description.toString();

      let name=colorName;
      if(userName!=="")
      {
        alert("Kindly Give a name To your NFT")
        return
      }      
      if(Description!=="")
      {
        alert("Kindly Describe about the NFT")
        return
      }
      if(userName!=="")
      {
        name=colorName+"-"+userName;
      }

    //   const added = await client.add(data1);
    // const url1 = `https://ipfs.infura.io/ipfs/${added.path}`
    // // setFileUrl(url);
    // console.log("its a url "+url1);

    const data = JSON.stringify({
        name, description, image: data1
    });
// alert("Description "+Description)
    try{
        // const added = await client.add(fileUrl);
        const added = await client.add(data);
        const url2 = `https://ipfs.infura.io/ipfs/${added.path}`
        //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
        console.log("its a url 2 "+url2);     
        createNFT(url2,colorName);
        console.log("hello1");
    }catch(error){
        console.log(`Error uploading file: `, error);
    }

      console.log("hello1");

  });

    // const description="this is description";
    // const name="AHMIColor";

    //form validation
    // if(!name || !fileUrl) {
    //     return
    // }
// console.log("helo zindagi"+imgSrc);
//     const added = await client.add(imgSrc);
//     const url = `https://ipfs.infura.io/ipfs/${added.path}`
//     // setFileUrl(url);
//     console.log("its a url "+url);

//     const data = JSON.stringify({
//         name, description, image: imgSrc
//     });
// console.log("its secret data"+data)
//     try{
//         // const added = await client.add(fileUrl);
//         const added = await client.add(data);
//         const url = `https://ipfs.infura.io/ipfs/${added.path}`
//         //pass the url to sav eit on Polygon adter it has been uploaded to IPFS
//         console.log("its a url 2 "+url);
//         createNFT(url);
//         console.log("hello1");
//     }catch(error){
//         console.log(`Error uploading file: `, error);
//     }

}


async function createNFT(url,colorName){
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
 

  //sign the transaction
  const signer = provider.getSigner();
  let contract = new ethers.Contract(ContractAddress,abi, signer);
  let ret = await contract.colors(colorName);
  let owner = await contract.owner();
  if(ret!=true)
  {
    let transaction;

    if(owner.toString().toLowerCase()!=_address.toString().toLowerCase())
    {
       transaction = await contract.createToken(url,colorName,{value:1000000000000000});

    }
    else{
       transaction = await contract.createToken(url,colorName,{value:0});

    }
    let tx = await transaction.wait();

  }
  else{
    alert("this color has been already minted");;
    return;
  }



  //get the tokenId from the transaction that occured above
  //there events array that is returned, the first item from that event
  // //is the event, third item is the token id.
  // console.log('Transaction: ',tx)
  // console.log('Transaction events: ',tx.events[0])
  // let event = tx.events[0]
  // let value = event.args[2]
  // let tokenId = value.toNumber() //we need to convert it a number

  // //get a reference to the price entered in the form 
  // const price = ethers.utils.parseUnits(formInput.price, 'ether')

  // contract = new ethers.Contract(nftMarketAddress, Market.abi, signer);

  //get the listing price
  // let listingPrice = await contract.getListingPrice()
  // listingPrice = listingPrice.toString();
  // console.log(listingPrice);

  // transaction = await contract.createMarketItem(
  //     nftAddress, tokenId, price, {value: listingPrice }
  // )

  // await transaction.wait()

 // router.push('/')

}

try {
  window.ethereum.on("chainChanged", hello);
  window.ethereum.on("accountsChanged", hello);
} catch {}

function hello()
{
  window.location.reload();
}


  return (
    <>
      <div className="mainbody">
        {/* <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} /> */}
        <video
          autoPlay
          className={`bg-img ${show ? "show" : ""}`}
          muted
          title="Video Preview"
          src="./images/bg.mp4"
          loop
        />
        <div className="overlay">
          <Header connectWallet={connectWallet} isWalletConnected={isWalletConnected} _address={_address}/>
          <div className="body-content">
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<Home show={show} convert={convert} setShow={setShow} />}
                  exact
                />
              </Routes>
            </BrowserRouter>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
