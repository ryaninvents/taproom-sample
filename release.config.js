/* global module */
module.exports = {
  branches: ['master', 'next'],
  plugins: [
    ['@semantic-release/commit-analyzer'],
    ['@semantic-release/release-notes-generator'],
    ['@semantic-release/changelog'],
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json', '*.png'],
      // eslint-disable-next-line no-template-curly-in-string
      message: 'chore(release): ${nextRelease.version} \n\n![${nextRelease.version} screenshot - desktop](https://github.com/ryaninvents/taproom-sample/raw/${nextRelease.version}/home-desktop.png)\n\n![${nextRelease.version} screenshot - mobile](https://github.com/ryaninvents/taproom-sample/raw/${nextRelease.version}/home-mobile.png)\n\n${nextRelease.notes}',
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
