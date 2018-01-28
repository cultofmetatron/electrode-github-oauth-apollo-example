module.exports = {
  cache: {
    cacheId: "github-oauth",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ["dist/**/*"]
  },
  manifest: {
    background: "#FFFFFF",
    title: "github-oauth",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
