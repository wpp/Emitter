/*global module:false*/

module.exports = function(grunt) {

  var srcFiles = [
    'src/Emitter.js'
  ];

  // Project configuration.
  grunt.initConfig({
    jasmine: {
      components: {
        src: [
          'src/Emitter.js'
        ],
        options: {
          specs: 'test/*.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('test',['jasmine']);
};
