var Path = require('path');
var directoryTree = require('directory-tree').directoryTree;
var traverse = require('traverse');
var fs = require('fs');
var setIn = require('set-in');

module.exports = Store;

function Store (options) {
  if (!this instanceof Store) {
    return new Store(options);
  }

  this.path = options.path || "";
  this.types = options.types;
  this.root = options.root;
}

Object.defineProperties(Store, {

});

Object.defineProperties(Store.prototype, {
  loadSync: {
    value: function () {
      console.log("loading sync");
      var tree = directoryTree(
        this.path,
        Object.keys(this.types)
          .map(function (s) {
            return "."+s;
          })
      );
      objects = {};
    /*
      function traverse(tree, path) {
        if (tree.type === 'directory') {
          var newPath = path.concat([obj.name])

        } else if (tree.type === 'file'){
          
        }
      }
    */
      var self = this;
      traverse(tree).forEach(function (obj) {
        if (obj.type === "file") {
          // split up file path
          var dirname = Path.dirname(obj.path);
          var extname = Path.extname(obj.path);
          var basename = Path.basename(obj.path, extname);
          var path = obj.path;
          if (self.root) {
            path = Path.relative(self.root, self.path);
          }
  
          // get path to file with extname
          var fsPath = Path.join(self.path, dirname, basename + extname);

          // get path to content without extname
          var slashPath = Path.join(path, dirname, basename);
          var contentPath = slashPath.split('/');
          
          // get content from filesystem
          var content = fs.readFileSync(fsPath).toString();

          // set
          setIn(objects, contentPath, content);
        }
      });
      console.log("output", objects);
      return objects;
    },
  },
  save: function () {
  },
});
