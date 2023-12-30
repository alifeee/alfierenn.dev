const toml = require("@iarna/toml");

// .eleventy.js
module.exports = function (eleventyConfig) {
  // copy static content
  eleventyConfig.addPassthroughCopy({ public: "/" });

  // parse TOML files
  eleventyConfig.addDataExtension("toml", (contents) => toml.parse(contents));

  // strip https from url
  eleventyConfig.addHandlebarsHelper(
    "niceLink",
    (url) => url && url.replace(/^https?:\/\//, "")
  );
};
