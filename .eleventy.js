const toml = require("@iarna/toml");
let handlebars = require("handlebars");
const fs = require("fs");

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

  // CSS partial for inlining
  //  load css from file
  const css = fs.readFileSync("public/stylesheet.css", "utf8");
  handlebars.registerPartial("css", css);

  eleventyConfig.setLibrary("hbs", handlebars);
};
