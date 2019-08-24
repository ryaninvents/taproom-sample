/* global module */
module.exports = {
  branches: ['master', 'next'],
  plugins: [
    ['@semantic-release/commit-analyzer'],
    ['@semantic-release/release-notes-generator'],
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json'],
      // eslint-disable-next-line no-template-curly-in-string
      message: 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}',
    }],
    ['@semantic-release/github', {
      assets: [{
        path: '*.zip',
        label: 'Deployable theme',
      }, {
        path: 'cypress/screenshots/**/*.png',
        label: 'Theme previews',
      }],
    }],
  ],
};
