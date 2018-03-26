'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async () => {
  const release = await getChannelURL('release');

  return {
    useYarn: true,
    scenarios: [
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
      {
        name: 'ember-default',
        npm: {
          devDependencies: {},
        },
      },
    ],
  };
};
