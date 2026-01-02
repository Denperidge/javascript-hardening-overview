import pugPlugin from "@11ty/eleventy-plugin-pug";

export default async function(eleventyConfig) {
    eleventyConfig.addPlugin(pugPlugin);
    return {
        dir: {
            input: "src",
            output: "dist",
        }
    }
}