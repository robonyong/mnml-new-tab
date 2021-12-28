module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
};
