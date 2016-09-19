# grunt-filename-hash

> Add hashes to filenames.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filename-hash --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filename-hash');
```

## The "filename_hash" task

### Overview
In your project's Gruntfile, add a section named `filename_hash` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  filename_hash: {
    options: {
      files: ['dist/app.js']
      index: ['src/index.html'],
      dest: {
        files: 'dist',
        index: 'dist'
      },
      filename: function (name, hash, extension) {
        return `${hash}${extension}`;
      }
    },
  },
});
```

### Options

#### options.files
Type: `Array<String>`
Default value: None. **Required**

Array of paths of the files where the hash shoudl be added.

#### options.index
Type: `String`
Default value: None. **Required**

Source path of the index file. All paths from the `options.files` array are replaced within the `index.html` with the new
filepaths.

### options.dest.files
Type: `String`
Default value: `dist`

Location where to write the files with the new filenames.

### options.dest.index
Type: `String`
Default value: `dist`

Location where to write the files with the new `index.html`.

### options.filename
Type: `Function`
Default value: `(name, hash, extension) => '${name}.${hash}${extension}'`

Filename function.