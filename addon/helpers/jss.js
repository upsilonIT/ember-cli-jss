import { helper } from '@ember/component/helper';

export default helper((params, hash) => {
  const { classes = {} } = hash;

  const items = Object.keys(hash)
    .filter(key => (
      key !== 'classes' &&
      hash[key]
    ));

  return [...params, ...items].map(param => classes[param] || '').join(' ');
});
