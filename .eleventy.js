const toml = require("@iarna/toml");
let handlebars = require("handlebars");
const fs = require("fs");
const CleanCSS = require("clean-css");
const Image = require("@11ty/eleventy-img");

function imageShortcode(src, cls, alt, ...allwidths) {
  // remove last width element
  let widths = allwidths.slice(0, -1);

  let options = {
    widths: widths,
    formats: ["jpeg"],
    urlPath: "/images/",
    outputDir: "./_site/images/",
  };

  // generate images, while this is async we don’t wait
  Image(src, options);
  // get metadata even if the images are not fully generated yet
  let metadata = Image.statsSync(src, options);

  let imageAttributes = {
    class: cls,
    alt,
    sizes: "", // I do not use sizes because I don't know what it is
    loading: "lazy",
    decoding: "async",
  };
  return Image.generateHTML(metadata, imageAttributes);
}

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

  // image shortcode
  eleventyConfig.addShortcode("eleventyimage", imageShortcode);

  eleventyConfig.setLibrary("hbs", handlebars);
};
