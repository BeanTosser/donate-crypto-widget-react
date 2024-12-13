"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CrytoDonationWidget;
var _react = _interopRequireWildcard(require("react"));
var _utilities = require("./utilities");
var _constants = require("./constants");
require("./css/CryptoDonationWidget.css");
var _bitcoinBtcLogo = _interopRequireDefault(require("./img/bitcoin-btc-logo.svg"));
var _moneroXmrLogo = _interopRequireDefault(require("./img/monero-xmr-logo.svg"));
var _usdCoinUsdcLogo = _interopRequireDefault(require("./img/usd-coin-usdc-logo.svg"));
var _dogecoinDogeLogo = _interopRequireDefault(require("./img/dogecoin-doge-logo.svg"));
var _ethereumEthLogo = _interopRequireDefault(require("./img/ethereum-eth-logo.svg"));
var _emptyCoinLogo = _interopRequireDefault(require("./img/empty-coin-logo.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SUPPORTED_COIN_IMAGES = [_bitcoinBtcLogo.default, _moneroXmrLogo.default, _usdCoinUsdcLogo.default, _dogecoinDogeLogo.default, _ethereumEthLogo.default];
let qrImageSources = [];
let coinImageSources = [];
let coinsContainer;
let coin1Element;
let coin2Element;
let qrElement;
let addressElement;
let interval;
function CrytoDonationWidget(props) {
  const COIN_SIZE = 3.9;
  const WIDGET_WIDTH = 17;
  const COIN_SPACE = 7;
  const COINS_SHIFT_AMOUNT = COIN_SPACE;
  const COINS_SHIFT_INTERVAL = 0.566;
  const INITIAL_COIN_CONTAINER_POSITION_X = WIDGET_WIDTH / 2.0 - COIN_SIZE / 2.0;
  let imageSourceIndex = 0;
  let [addressDisplayIsVisible, setAddressDisplayIsVisible] = (0, _react.useState)(false);
  let [currentCoinIndex, setcurrentCoinIndex] = (0, _react.useState)(0);
  let coin1ImageURL = (0, _react.useRef)(_emptyCoinLogo.default);
  let coin2ImageURL = (0, _react.useRef)(_emptyCoinLogo.default);
  let oldTickersList = (0, _react.useRef)([]);
  let [currentCoinShift, setCurrentCoinShift] = (0, _react.useState)(0.0);
  let [isShiftingLeft, setIsShiftingLeft] = (0, _react.useState)(false);
  let [qrImageSources, setQrImageSources] = (0, _react.useState)([]);
  let [coinImageSources, setCoinImageSources] = (0, _react.useState)([]);
  console.log("Spanky: currentCoinShift: " + currentCoinShift);
  let testVar = "it might not work.";

  // The following function obtained (and modified) from:
  //https://stackoverflow.com/questions/9736804/find-missing-element-by-comparing-2-arrays-in-javascript
  //Thanks to ninjagecko
  function firstElemNotIn(newArray, oldArray) {
    /*
        returns the first element in currentArray that 
          is not in also in previousArray, 
          or undefined if no such element exists
        
        We declare two elements are equal here if they are === or both NaN.
        See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#comparing_equality_methods
    */
    console.log("oldarray: : " + JSON.stringify(oldArray));
    console.log("newArray: " + JSON.stringify(newArray));
    const difArray = oldArray.filter(function (ticker) {
      let test = !newArray.includes(ticker);
      console.log("Is " + ticker + " a missing element? " + (test ? "yes!" : "No!"));
      return !newArray.includes(ticker);
    });
    console.log("difArray: " + JSON.stringify(difArray));
    return oldArray.indexOf(difArray[0]);
  }

  // If we were on the last coin in the list and that coin was removed, decrement currentCoinIndex to prevent errors
  (0, _react.useEffect)(() => {
    // check to see if a ticker was removed
    if (oldTickersList.current.length > 0) {
      let e = firstElemNotIn(props.tickers, oldTickersList.current);
      if (e > -1) {
        if (e > 0 && currentCoinIndex === e) {
          setcurrentCoinIndex(oldCoinIndex => oldCoinIndex - 1 | 0);
          console.log("Shabam! Fixing currentCoinIndex to be " + (currentCoinIndex - 1).toString());
          resetImageSources();
          coin1ImageURL.current = tempCoinImageSources[currentCoinIndex - 1];
          coin2ImageURL.current = tempCoinImageSources[currentCoinIndex - 1];
          oldTickersList.current = props.tickers;
          return;
        } else if (e === 0 && currentCoinIndex === 0) {
          resetImageSources();
          coin1ImageURL.current = tempCoinImageSources[0];
          coin2ImageURL.current = tempCoinImageSources[0];
        }
        console.log("Shabam! The first element was removed from the array.");
      }
    }
    console.log("Shabam! It didn't work :(");
    oldTickersList.current = props.tickers;
    resetImageSources();
  }, [props.tickers]);
  let tempCoinImageSources = [];
  function resetImageSources() {
    let newQrImageSources = [];
    props.tickers.forEach((ticker, index) => {
      let supportedCoinIndex = _constants.SUPPORTED_COINS.indexOf(ticker);
      //Check if this coin is supported
      if (supportedCoinIndex < 0) {
        //The coin is not supported. 
        if (imageSourceIndex < props.images.length) {
          tempCoinImageSources.push(props.images[imageSourceIndex]);
          imageSourceIndex++;
        } else {
          tempCoinImageSources.push(_emptyCoinLogo.default);
        }
        console.log("The coin is NOT supported");
      } else {
        tempCoinImageSources.push(SUPPORTED_COIN_IMAGES[_constants.SUPPORTED_COINS.indexOf(ticker)]);
        console.log("The coin is supported; image url: " + SUPPORTED_COIN_IMAGES[_constants.SUPPORTED_COINS.indexOf(ticker)]);
      }
      if (index === currentCoinIndex) {
        coin1ImageURL.current = tempCoinImageSources[index];
      }
    });
    newQrImageSources = props.addresses.map(address => {
      return (0, _utilities.stringToQrImage)(address);
    });
    setCoinImageSources(tempCoinImageSources);
    setQrImageSources(newQrImageSources);
  }
  function initialize() {
    //First make sure there are enough supplied custom coin images to 
    console.log("starting loop for adding coinImage");
    resetImageSources();
    coin1Element = document.getElementById("coin1");
    console.log("coin1Element: " + coin1Element);
    coin2Element = document.getElementById("coin2");
    console.log("coin2Element: " + coin2Element);
    qrElement = document.getElementById("qr");
    console.log("qrElement: " + qrElement);
    coinsContainer = document.getElementById("coins-container");
    console.log("coinsContainer: " + coinsContainer);
    coinsContainer.style.width = (COIN_SIZE + COIN_SPACE).toString() + "em";
    coinsContainer.style.transform = "translateX(" + INITIAL_COIN_CONTAINER_POSITION_X.toString() + "em)";
    console.log("spanky: init coin1ImageUrl: " + coinImageSources[currentCoinIndex]);
    coin1ImageURL.current = tempCoinImageSources[currentCoinIndex];
    console.log("initializing coin 1 image to: " + coinImageSources[currentCoinIndex]);
    coin2ImageURL.current = tempCoinImageSources[currentCoinIndex + 1];
    document.documentElement.style.setProperty("--coin-2-opacity", "0.0");
    document.documentElement.style.setProperty("--coin-1-opacity", "1.0");
    document.documentElement.style.setProperty("--coins-container-left-position", (17.0 / 2.0 - COIN_SIZE - COIN_SPACE / 2.0).toString());
    console.log("spanky: qr imageurl: " + qrImageSources[0]);
    setcurrentCoinIndex(0);
  }
  (0, _react.useEffect)(() => {
    initialize();
  }, []);
  (0, _react.useEffect)(() => {
    let shiftIsNegativeMultiplier;
    if (currentCoinShift !== 0) {
      if (isShiftingLeft) {
        shiftIsNegativeMultiplier = -1;
      } else {
        shiftIsNegativeMultiplier = 1;
      }
      let newCoinShift = currentCoinShift + shiftIsNegativeMultiplier * COINS_SHIFT_INTERVAL;
      if (newCoinShift > 0) {
        newCoinShift = 0;
      } else if (newCoinShift < -COINS_SHIFT_AMOUNT) {
        newCoinShift = -COINS_SHIFT_AMOUNT;
      }
      coinsContainer.style.transform = "translateX( " + (newCoinShift + INITIAL_COIN_CONTAINER_POSITION_X).toString() + "em";
      let progressPercentage;
      if (isShiftingLeft) {
        progressPercentage = -newCoinShift / COINS_SHIFT_AMOUNT;
      } else {
        progressPercentage = (COINS_SHIFT_AMOUNT + newCoinShift) / COINS_SHIFT_AMOUNT;
      }
      let progress1;
      let progress2;
      if (isShiftingLeft) {
        progress1 = 1 - progressPercentage;
        progress2 = progressPercentage;
      } else {
        progress1 = progressPercentage;
        progress2 = 1 - progressPercentage;
      }
      document.documentElement.style.setProperty("--coin-1-opacity", progress1.toString());
      document.documentElement.style.setProperty("--coin-2-opacity", progress2.toString());
      if (progressPercentage >= 1.0) {
        console.log("Clearing interval");
        clearInterval(interval);
        document.documentElement.style.setProperty("--coin-1-opacity", isShiftingLeft ? "0.0" : "1.0");
        document.documentElement.style.setProperty("--coin-2-opacity", isShiftingLeft ? "1.0" : "0.0");
        if (isShiftingLeft) {
          coinsContainer.style.transform = "translateX( " + INITIAL_COIN_CONTAINER_POSITION_X + ")";
        } else {
          coinsContainer.style.transform = "translateX( " + (INITIAL_COIN_CONTAINER_POSITION_X + COINS_SHIFT_AMOUNT) + ")";
        }
      }
    } else {
      return;
    }
  }, [currentCoinShift, isShiftingLeft]);
  function toggleAddressDisplay() {
    if (addressDisplayIsVisible) {
      console.log("add: Making adress section invisible");
      setAddressDisplayIsVisible(false);
    } else {
      setAddressDisplayIsVisible(true);
      console.log("add: Making adress section visible");
    }
  }
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(props.addresses[currentCoinIndex]);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  function clickRight() {
    if (props.tickers.length < 2) {
      return;
    }
    setIsShiftingLeft(true);
    let oldCoinIndex = currentCoinIndex;
    let newCoinIndex;
    console.log("binky: coinImageSources.length: " + coinImageSources.length);
    if (currentCoinIndex === coinImageSources.length - 1) {
      setcurrentCoinIndex(0);
      newCoinIndex = 0;
    } else {
      setcurrentCoinIndex(lastCoinIndex => lastCoinIndex + 1);
      newCoinIndex = oldCoinIndex + 1;
    }

    //First, reassign images
    coin1ImageURL.current = coinImageSources[oldCoinIndex];
    coin2ImageURL.current = coinImageSources[newCoinIndex];
    console.log("coinImageSources: " + JSON.stringify(coinImageSources));
    //set initial transparencies
    document.documentElement.style.setProperty("--coin-1-opacity", "1");
    document.documentElement.style.setProperty("--coin-2-opacity", "0");
    //Shift all the coins left one coin
    //currentCoinShift = COINS_SHIFT_AMOUNT;
    setCurrentCoinShift(0);
    //Place the container such that coin1 is in the center of the widget
    coinsContainer.style.transform = "translateX( " + INITIAL_COIN_CONTAINER_POSITION_X.toString() + "em";
    interval = setInterval(() => {
      setCurrentCoinShift(oldCoinShift => oldCoinShift - COINS_SHIFT_INTERVAL);
    }, 10);
    console.log("currentCoinIndex: " + currentCoinIndex);
    console.log("oldCoinIndex: " + oldCoinIndex);
    resetAddressAndQr();
  }
  function clickLeft() {
    if (props.tickers.length < 2) {
      return;
    }
    setIsShiftingLeft(false);
    let oldCoinIndex = currentCoinIndex;
    let newCoinIndex;
    if (currentCoinIndex === 0) {
      setcurrentCoinIndex(coinImageSources.length - 1);
      newCoinIndex = coinImageSources.length - 1;
    } else {
      setcurrentCoinIndex(currentCoinIndex - 1);
      newCoinIndex = oldCoinIndex - 1;
    }
    //First, reassign images
    //(coin1Element as HTMLImageElement).src=coinImageSources[currentCoinIndex];
    coin1ImageURL.current = coinImageSources[newCoinIndex];
    //(coin2Element as HTMLImageElement).src=coinImageSources[oldCoinIndex];
    coin2ImageURL.current = coinImageSources[oldCoinIndex];
    //set initial transparencies
    //(coin1Element as HTMLImageElement).style.opacity = (0).toString();
    document.documentElement.style.setProperty("--coin-1-opacity", "0");
    //(coin2Element as HTMLImageElement).style.opacity = (1).toString();
    document.documentElement.style.setProperty("--coin-2-opacity", "1");
    //Shift all the coins left one coin
    let newCoinShift = currentCoinShift + COINS_SHIFT_INTERVAL;
    setCurrentCoinShift(-COINS_SHIFT_AMOUNT);
    coinsContainer.style.transform = "translateX( " + (newCoinShift + INITIAL_COIN_CONTAINER_POSITION_X).toString() + "em";
    interval = setInterval(() => {
      setCurrentCoinShift(oldCoinShift => oldCoinShift + COINS_SHIFT_INTERVAL);
    }, 10);
    console.log("currentCoinIndex: " + currentCoinIndex);
    console.log("oldCoinIndex: " + oldCoinIndex);
    resetAddressAndQr();
  }
  function resetAddressAndQr() {
    document.documentElement.style.setProperty("value", props.addresses[currentCoinIndex]);
  }
  console.log("redrawing");
  const addressDisplayClassName = addressDisplayIsVisible ? "" : "address-hidden";
  console.log("spanky: render coin1image: " + coin1ImageURL);
  let rightArrowClassName = "right-arrow change-coin-arrow";
  let leftArrowClassName = "left-arrow change-coin-arrow";
  if (props.tickers.length < 2) {
    rightArrowClassName += " disabled";
    leftArrowClassName += " disabled";
  }
  console.log("coin image urls: " + coin1ImageURL + "; " + coin2ImageURL.current);
  console.log("testVar: " + testVar);
  let widgetJSX = /*#__PURE__*/_react.default.createElement("div", {
    className: "donate-crypto-widget"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "coin-chooser"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: leftArrowClassName,
    onClick: clickLeft
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "arrow-divider"
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "coins-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "coin-logo coin1",
    alt: "coin 1",
    onClick: toggleAddressDisplay,
    src: coin1ImageURL.current,
    id: "coin1"
  }), /*#__PURE__*/_react.default.createElement("img", {
    className: "coin-logo coin2",
    alt: "coin 2",
    onClick: toggleAddressDisplay,
    src: coin2ImageURL.current,
    id: "coin2"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: rightArrowClassName,
    onClick: clickRight
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: "address-display",
    className: addressDisplayClassName
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    id: "address-text",
    className: "address-display",
    onClick: copyAddress,
    value: props.addresses[currentCoinIndex],
    readOnly: true
  }), /*#__PURE__*/_react.default.createElement("img", {
    alt: "qr",
    id: "qr",
    className: "address-display",
    src: qrImageSources[currentCoinIndex]
  })));
  return widgetJSX;
}