import { run } from '@ember/runloop';
import { merge } from '@ember/polyfills';
import Application from '../../app';
import config from '../../config/environment';

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);

  // use defaults, but you can override;
  attributes = merge(attributes, attrs);

  return run(() => {
    const application = Application.create(attributes);

    application.setupForTesting();
    application.injectTestHelpers();

    return application;
  });
}
