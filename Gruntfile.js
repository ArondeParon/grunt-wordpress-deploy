/*
 * grunt-wordpress-deploy
 * https://github.com/webrain/grunt-wordpress-deploy
 *
 * Copyright (c) 2013 Webrain
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.config.set('deploy', grunt.file.readJSON('deploy.json'));

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    wordpressdeploy: {
      options: {
        backups_dir: 'backups_dir/',
        rsync_args: ['--verbose', '--progress', '-rlpt', '--compress', '--omit-dir-times'],
        exclusions: ['.git', 'tmp/*', 'backups_dir/', 'wp-config.php', 'composer.json', 'composer.lock']
      },
      local: grunt.config.get('deploy.local'),
      production: grunt.config.get('deploy.production'),
    },

    nodeunit: {
      tasks: ['test/*_test.js']
    },
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
