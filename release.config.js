/* global module */
module.exports = {
  branches: ['master', 'next'],
  plugins: [
    ['@semantic-release/commit-analyzer'],
    ['@semantic-release/release-notes-generator'],
    ['@semantic-release/changelog'],
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json', 'home-desktop.png', 'home-mobile.png'],
      // eslint-disable-next-line no-template-curly-in-string
      message: 'chore(release): ${nextRelease.version} \n\n${nextRelease.notes}',
    }],
    ['@semantic-release/github', {
      assets: [{
        path: '*.zip',
        label: 'Deployable theme',
      }, {
        path: 'home-desktop.png',
        label: 'Theme preview for desktop',
      }, {
        path: 'home-mobile.png',
        label: 'Theme preview for mobile',
      }],
    }],
  ],
};
