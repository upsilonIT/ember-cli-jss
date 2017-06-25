# ember-cli-jss [![Build Status][buildstat-image]][buildstat-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/exeto/ember-cli-jss.svg)](https://greenkeeper.io/)

> JSS integration for Ember

## Install

```bash
$ npm install --save-dev ember-browserify
$ npm install --save ember-cli-jss jss jss-preset-default
```

## Usage

The property `stylesheet` must be an instance of the `StyleSheet`.

Properties `jssNames` and `jssNameBindings` work like `classNames` and `classNameBindings`, respectively.

When you update properties listed in the `jssObservedProps`, dynamic styles will be updated.

```js
// ...awesome-component/component.js

import Ember from 'ember';
import JSS from 'ember-cli-jss';
import stylesheet from './stylesheet';

export default Ember.Component.extend(JSS, {
  stylesheet,
  jssNames: ['wrapper'],
  jssNameBindings: ['isShow:show'],
  jssObservedProps: ['color'],

  color: 'blue',
  isShow: true,

  actions: {
    changeColor(color) {
      this.set('color', color);
    },
  },
});
```

Constructor `StyleSheet` accepts the same arguments as [`jss.createStyleSheet`](http://cssinjs.org/js-api?v=v8.0.0#create-style-sheet).

```js
// ...awesome-component/stylesheet.js

import { StyleSheet } from 'ember-cli-jss';

export default new StyleSheet({
  wrapper: {
    width: 600,
    display: 'none',
  },

  show: {
    display: 'block',
  },

  content: {
    color: data => data.color;
  },
});
```

```hbs
{{!-- ...awesome-component/template.hbs --}}

<button type="button" {{action "changeColor" "green"}}>
  Green
</button>

<div class="{{jss 'content'}}">
  Lorem ipsum...
</div>
```

## Helper

```hbs
<button class="{{jss 'large' 'primary' disabled=true}}">
  Submit
</button>
```

## Configuration

Plugin [`jss-preset-default`](https://github.com/cssinjs/jss-preset-default) applied by default. Please note that the work of the dynamic properties depends on [`jss-compose`](https://github.com/cssinjs/jss-compose) plugin.

You can override the `app/initializers/ember-cli-jss.js`. Use `setup`, it takes the same arguments as [`jss.setup`](http://cssinjs.org/js-api?v=v8.0.0#setup-jss-instance).

```js
// ...app/initializers/ember-cli-jss.js

import { setup } from 'ember-cli-jss';
import compose from 'npm:jss-compose';

export function initialize() {
  setup(compose.default());
}

export default {
  name: 'ember-cli-jss',
  initialize,
};
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me/)

[buildstat-url]: https://travis-ci.org/exeto/ember-cli-jss?branch=master
[buildstat-image]: https://img.shields.io/travis/exeto/ember-cli-jss/master.svg?style=flat-square
