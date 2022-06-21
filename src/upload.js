import api from "./interceptors.js";
import FormData from "form-data";
import CryptoJS from "crypto-js";
import fs from "fs";

async function upload(filePath, file, desDir) {
  //   console.log(file);
  const form = new FormData({
    maxDataSize: Infinity,
  });
  const path = desDir + file;
  form.append("path", path);
  form.append("files", fs.createReadStream(filePath + file));
  const url = process.env.FURL;
  // console.log("url: " + url);
  var publicKey = process.env.AccessKeyId;

  // sign the path string
  var signature = generateSignature(
    JSON.stringify({
      path: path,
    }),
    process.env.AccessKeySecret
  );

  // generate authorization string
  var authorization = process.env.AUTH + publicKey + ":" + signature;

  // // log results for debugging
  // console.log("signature: " + signature);
  // console.log("authorization: " + authorization);

  await api({
    method: "post",
    url: url,
    data: form,
    headers: { "Content-Type": "multipart/form-data", Authorization: authorization },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  })
    .then(function (response) {
      //handle success
      console.log("uploading => " + response.data.code + " : " + file);
      //console.log(response.data);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

// functions
function generateSignature(message, key) {
  var enc = CryptoJS.HmacSHA1(message, key).toString();
  return enc;
}
export default upload;
