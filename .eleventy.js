const toml = require("@iarna/toml");
let handlebars = require("handlebars");
const fs = require("fs");
const CleanCSS = require("clean-css");

// .eleventy.js
module.exports = function (eleventyConfig) {
  // copy static content
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // parse TOML files
  eleventyConfig.addDataExtension("toml", (contents) => toml.parse(contents));

  // strip https from url
  handlebars.registerHelper(
    "niceLink",
    (url) => url && url.replace(/^https?:\/\//, "")
  );

  // CSS partial for inlining -> load css from file
  handlebars.registerHelper("css", (file) => {
    const css = fs.readFileSync(`./public/${file}`, "utf8");
    return new handlebars.SafeString(css);
  });
  // load and minify css
  eleventyConfig.addFilter("cssmin", (file) => {
    const css = fs.readFileSync(`./public/${file}`, "utf8");
    return new CleanCSS({}).minify(css).styles;
  });

  // if eleventy is in dev mode
  handlebars.registerHelper(
    "serve",
    () => process.env.ELEVENTY_RUN_MODE === "serve"
  );

  eleventyConfig.setLibrary("hbs", handlebars);
};
