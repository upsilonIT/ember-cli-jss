/* eslint-env node */
/* eslint-disable strict */

'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async () => {
  const release = await getChannelURL('release');

  return {
    scenarios: [
      {
        name: 'ember-lts-2.4',
        bower: {
          dependencies: {
            ember: 'components/ember#lts-2-4',
          },
          resolutions: {
            ember: 'lts-2-4',
          },
        },
        npm: {
          devDependencies: {
            'ember-source': null,
          },
        },
      },
      {
        name: 'ember-lts-2.8',
        bower: {
          dependencies: {
            ember: 'components/ember#lts-2-8',
          },
          resolutions: {
            ember: 'lts-2-8',
          },
        },
        npm: {
          devDependencies: {
            'ember-source': null,
          },
        },
      },
      {
        name: 'ember-lts-2.12',
        npm: {
          devDependencies: {
            'ember-source': '~2.12.0',
          },
        },
      },
      {
        name: 'ember-lts-2.16',
        npm: {
          devDependencies: {
            'ember-source': '~2.16.0',
          },
        },
      },
      {
        name: 'ember-lts-2.18',
        npm: {
          devDependencies: {
            'ember-source': '~2.18.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': release,
          },
        },
      },
    ],
  };
};
