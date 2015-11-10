module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
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
          { expand: true, cwd: 'public', src: '**', dest: 'dist/' }
        ]
      }
    },
    zetzer: {
      main: {
        options: {
          partials: 'templates/partials/'
        },
        files: [{
            expand: true,
            cwd: 'templates/',
            src: '**/*.html',
            dest: 'dist',
            ext: '.html'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-zetzer');

  grunt.registerTask('clean', function() {
    grunt.file.delete('dist/')
    grunt.file.mkdir('dist')
  });

  grunt.registerTask('default', ['clean', 'sass', 'zetzer', 'copy']);
  grunt.registerTask('serve', ['default', 'connect']);
};
