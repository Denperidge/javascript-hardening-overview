import pugPlugin from "@11ty/eleventy-plugin-pug";

export default async function(eleventyConfig) {
    eleventyConfig.addPlugin(pugPlugin);

    eleventyConfig.addPassthroughCopy("src/static/")
    return {
        dir: {
            input: "src",
            output: "dist",
        }
    }
}