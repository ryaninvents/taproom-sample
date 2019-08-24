/* eslint-env node */
/* eslint no-process-env: off */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const config = {
  ...dotenv.config().parsed,
  ...process.env,
};

exports.precypress = async () => {
  const cypressJson = {
    baseUrl: `https://${config.SLATE_STORE}`,
    testThemeId: config.SLATE_THEME_ID,
  };
  fs.writeFileSync(path.resolve(__dirname, 'cypress.json'), JSON.stringify(cypressJson, null, 2));
};
