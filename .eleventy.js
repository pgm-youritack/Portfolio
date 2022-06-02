const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const path =  require('path');
const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "src/assets/styles/main.css":"dist/main.css"
    });
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    return {
      ...eleventyConfig,
      pathPrefix: "/Portfolio/",
      dir: {
        input: 'src',
        output: 'docs',
        layouts:"_includes/layouts"
      },
    };
  };
async function imageShortcode(src, alt, className, width = 750, sizes) {
  let metadata = await Image(path.join(__dirname,src), {
    widths: [width],
    formats: ["webp", "jpeg", "png", "svg"],
    outputDir: "./docs/assets/images/",
    urlPath: "/Portfolio/assets/images/"
  });

  let imageAttributes = {
    alt,
    sizes,
    class: className,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}
