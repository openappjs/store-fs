var Store = require('../');

var Yaml = require('js-yaml');

var store = new Store({
  path: __dirname + "/data",
  root: __dirname,
  types: {
    'yml': {
      to: function (json) {
        return Yaml.safeDump(json);
      },
      from: function (yaml) {
        return Yaml.safeLoad(yaml);
      },
    },
  },
});

store.loadSync();
