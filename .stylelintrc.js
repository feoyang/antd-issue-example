/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'block-no-empty': true,
    'property-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'media-feature-name-no-vendor-prefix': null,
    'at-rule-no-vendor-prefix': null,
  },
};
