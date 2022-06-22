module.exports = {
  mode: "production",
  target: "node",
  entry: __dirname + "/src/index.js", //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist", //打包后的文件存放的地方
    filename: "upload.js", //打包后输出文件的文件名
  },
  resolve: {
    extensions: ["", ".js"],
    preferRelative: true,
  },
};
