"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataURIToBlob = dataURIToBlob;
exports.default = void 0;
// OBTAINED FROM: https://gist.github.com/suuuzi/06a3b0b6741e6a90d83548aa8ac9666a
// Thanks to suuuzi
function dataURIToBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);else byteString = unescape(dataURI.split(',')[1]);

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
var _default = exports.default = dataURIToBlob;