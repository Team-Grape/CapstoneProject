const path = require("path");

module.exports = {
  entry: {
    gameBundle: "./src/game.js",
    "flow/puzzleChartBundle": "./src/flowcharts/puzzleChart.js",
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
        type: "asset/source",
      },
    ],
  },
};
