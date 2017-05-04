module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          'public/index.html': 'assets/views/index.jade'
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/css/min.css': [
            'assets/css/libs/*.less',
            'assets/css/*.less'
          ]
        }
      }
    },
    concat: {
      dist: {
        files: {
          'public/js/min.js': [
            'assets/js/libs/*.js',
            'assets/js/tools/*.js',
            'assets/js/settings.js',
            'assets/js/plugins/*.js',
            'assets/js/app.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'public/js/min.js': [
            'assets/js/libs/*.js',
            'assets/js/settings.js',
            'assets/js/plugins/*.js',
            'assets/js/app.js'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {
              expand: true,
              cwd: 'assets/vendors/',
              src: ['**'],
              dest: 'public/vendors/'
          }
        ]
      }
    },
    nodemon: {
      local:{
        script: 'app.js'
      }
    },
    concurrent: {
      local:{
        tasks: ['nodemon:local', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      jade: {
        files: 'assets/views/**/*.jade',
        tasks: ['jade'],
        options: {
          nospawn: true
        }
      },
      styles: {
        files: ['assets/css/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: ['assets/js/**/*.js'],
        tasks: ['concat'],
        options: {
          nospawn: true
        }
      }
    },
    clean: {
      build: ['public']
    }
  });

  grunt.registerTask('default', ['clean', 'jade', 'less', 'concat', 'copy', 'concurrent:local']);
  grunt.registerTask('release', ['clean', 'jade', 'less', 'uglify', 'copy', 'concurrent:local']);
};