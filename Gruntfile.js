// Generated on 2016-02-24 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {


  grunt.loadNpmTasks('grunt-ftp-deploy');




  // Define the configuration for all the tasks
  grunt.initConfig({

    'ftp-deploy': {
      build: {
        auth: {
          host: 'webdemo.dac.co.jp',
          port: 21,
          authKey: 'key1'
        },
        src: './dist',
        dest: '/public_html',
        exclusions: ['index.html','./assets/*']
      }
    }

  });





  grunt.registerTask('deploy',['ftp-deploy']);


};
