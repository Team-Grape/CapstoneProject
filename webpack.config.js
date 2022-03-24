const path = require("path");

module.exports = {
  entry: {
    gameBundle: "./src/game.js",
    puzzleChartBundle: "./src/puzzleChart.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.mmd/,
        type: 'asset/source',
      },
    ],
  },


};
