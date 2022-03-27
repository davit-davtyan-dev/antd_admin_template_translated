const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
process.env.CI = "false";
const addCustomize = () => (config) => {
  if (config.output.publicPath) {
    config.output.publicPath =
      process.env.NODE_ENV === "production"
        ? "/react-antd-admin-template/"
        : "/";
  }
  if (config.resolve) {
    config.resolve.extensions.push(".jsx");
  }
  return config;
};
module.exports = override(
  // Directance on ANTD Package: Package (use Babel-Plugin-Import) according to IMPORT
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // Automatic packaging related styles
  }),

  // Use LESS-Loader to re-specify the variables of the LESS in the source code
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
  }),

  // Configure path alias
  addWebpackAlias({
    "@": resolve("src"),
  }),
  addCustomize()
);
