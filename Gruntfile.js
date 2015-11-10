module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          loadPath: ['bower_components/foundation/scss/']
        },
        files: {
          'dist/stylesheets/main.css': 'stylesheets/main.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          base: 'dist',
          open: 'dist/index.html',
          keepalive: true
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'public', src: '**', dest: 'dist/' },
          { 'dist/javascripts/modernizr.js' : 'bower_components/modernizr/modernizr.js' }
        ]
      }
    },
    zetzer: {
      main: {
        options: {
          partials: 'templates/partials/',
          templates: 'templates/templates/'
        },
        files: [{
            expand: true,
            cwd: 'templates/',
            src: '**/*.html',
            dest: 'dist',
            ext: '.html'
        }]
      }
    },
    bower_concat: {
      all: {
        dest: 'dist/javascripts/_bower.js',
        cssDest: 'dist/stylesheets/_bower.css'
        //exclude: [ 'modernizr' ],
        //include: [ 'foundation' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-zetzer');

  grunt.registerTask('clean', function() {
    grunt.file.delete('dist/');
    grunt.file.mkdir('dist');
    grunt.file.mkdir('dist/stylesheets/');
    grunt.file.mkdir('dist/javascripts/');
  });

  grunt.registerTask('default', ['clean', 'bower_concat', 'sass', 'zetzer', 'copy']);
  grunt.registerTask('serve', ['default', 'connect']);
};
