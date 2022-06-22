import upload from "./upload.js";
import fs from "fs";
import "dotenv/config";

export function sync() {
  const args = process.argv.slice(2);
  const filePath = args[0];
  // const desDir = "/hm-son/images/";
  const desDir = args[1];
  fs.readdir(filePath, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      upload(filePath, file, desDir);
    });
  });
}
sync();
//sync("/Users/leo/Desktop/NFT/upload/fs/");
