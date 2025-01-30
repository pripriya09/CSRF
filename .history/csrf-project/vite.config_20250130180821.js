const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
