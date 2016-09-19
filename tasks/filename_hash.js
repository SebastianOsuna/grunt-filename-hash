/*
 * grunt-filename-hash
 * https://github.com/sebastian/grunt-contrib-filename-hash
 *
 * Copyright (c) 2016 SebastianOsuna
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('filename_hash', 'Add hashes to filenames.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      dest: {
        files: 'dist',
        index: 'dist'
      },
      filename: function(name, hash, extension) {
        return `${name}.${hash}${extension}`
      }
    });

    var hash = generateRandomHash();
    var opts = this.options();
    var done = this.async();

    // Check files
    if (!grunt.file.exists(opts.index)) {
      console.log('med')
      return grunt.log.error('No index file found') && done();
    }

    var files = opts.files.filter(function (filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      } else {
        return true;
      }
    });

    if (files.length === 0) return done();

    // Handle files

    files = files.map(function (filepath) {
      var details = {
        src: path.resolve(filepath),
        orig: filepath,
        filename: path.basename(filepath, path.extname(filepath)),
        extension: path.extname(filepath), 
      };
      details.dest = opts.dest.files + '/'+ opts.filename(details.filename, hash, details.extension);
      return details;
    });

    files.forEach(function (f) {
      copy(f.src, f.dest);
    });

    // Handle index
    var indexContents = fs.readFileSync(opts.index).toString();
    files.forEach(function (f) {
      indexContents = indexContents.replace(new RegExp(f.orig, 'gi'), f.dest);
    });
    try { fs.mkdirSync(path.resolve(opts.dest.index)); } catch (_) {}
    fs.writeFileSync(path.resolve(opts.dest.index, 'index.html'), indexContents);

  });
  function generateRandomHash() {
    return new Buffer((Date.now()*Math.random()).toString()).toString('base64').replace(/=/g, '').toLowerCase().substring(5);
  }

  function copy(o, d) {
    var content = fs.readFileSync(o).toString();
    var folder = path.dirname(d);
    try { fs.mkdirSync(folder); } catch(_) {}
    fs.writeFileSync(d, content);
  }
};
