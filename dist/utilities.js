"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataURIToBlob = dataURIToBlob;
exports.interleaveArrays = interleaveArrays;
exports.stringToQrImage = stringToQrImage;
var _qrcodeGenerator = _interopRequireDefault(require("qrcode-generator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function interleaveArrays(arr1, arr2) {
  let interleavedArr = [];
  if (arr2.length === arr1.length) {
    arr1.forEach((element, index) => {
      interleavedArr.push(element);
      interleavedArr.push(arr2[index]);
    });
  } else if (arr2.length === arr1.length - 1) {
    arr2.forEach((element, index) => {
      interleavedArr.push(arr1[index]);
      interleavedArr.push(element);
    });
    interleavedArr.push(arr1[arr1.length - 1]);
  } else if (arr2.length === arr1.length + 1) {
    arr1.forEach((element, index) => {
      interleavedArr.push(element);
      interleavedArr.push(arr2[index]);
    });
    interleavedArr.push(arr2[arr2.length - 1]);
  } else {
    console.log("Array1 length: " + arr1.length);
    console.log("Array2 length: " + arr2.length);
    throw new Error("Cannot compare arrays if the difference between their lengths is greater than 1");
  }
  return interleavedArr;
}

// OBTAINED FROM: https://gist.github.com/suuuzi/06a3b0b6741e6a90d83548aa8ac9666a
// Thanks to suuuzi
function dataURIToBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);else byteString = unescape(dataURI.split(',')[1]); //NOTE unescape is deprecated, need to replace

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
    type: mimeString
  });
}
function stringToQrImage(s) {
  let qr = (0, _qrcodeGenerator.default)(0, 'M');
  qr.addData(s);
  qr.make();
  return qr.createDataURL(6);
}