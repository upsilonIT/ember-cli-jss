import { Promise } from 'rsvp';
import { module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function (name, options = {}) {
  module(name, {
    beforeEach(...args) {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach(...args);
      }
    },

    afterEach(...args) {
      const afterEach = options.afterEach && options.afterEach(...args);

      return Promise.resolve(afterEach).then(() => destroyApp(this.application));
    },
  });
}
