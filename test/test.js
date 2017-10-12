const assert = require('assert');
const loader = require('../index');

const getModuleRequireFromTemplate = module =>
  `module.exports = require("-!${module}");`;

describe('file-switcher-loader', () => {
  describe('pitch method', () => {
    it('should not rewrite for node_modules', () => {
      const resourcePath = 'node_modules/crazyModule';
      const requestedResource = 'crazyModule';
      const thisContext = {resourcePath};

      assert.equal(
        loader.pitch.apply(thisContext, [requestedResource, '', {}]),
        getModuleRequireFromTemplate(requestedResource),
      );
    });
    it('should not rewrite if no version was specified', () => {
      const resourcePath = 'crazyModule';
      const requestedResource = 'crazyModule';
      const query = {};
      const thisContext = {resourcePath, query: {}};

      assert.equal(
        loader.pitch.apply(thisContext, [requestedResource, '', {}]),
        getModuleRequireFromTemplate(requestedResource),
      );
    });
  });
});
