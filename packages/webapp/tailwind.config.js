const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  content: [
    __dirname + '/src/**/*.{ts,tsx,htm,html}',
    ...createGlobPatternsForDependencies(__dirname),
  ],

  presets: [require('../../tailwind.config')],
};
