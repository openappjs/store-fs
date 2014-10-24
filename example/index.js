var Store = require('../');

var store = new Store({
  path: __dirname + "/data",
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
