var Store = require('../');

var store = new Store({
  path: __dirname + "/data",
  root: __dirname,
  types: {
    'yml': {
      to: function (json) {

      },
      from: function (yaml) {

      },
    },
  },
});

store.loadSync();
