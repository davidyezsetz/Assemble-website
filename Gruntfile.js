// Generated on 2013-11-01 using generator-webapp 0.4.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load tasks on demand (speeds up dev)
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    //browserSync: 'grunt-browser-sync',
    //validation: 'grunt-html-validation'
  });

  grunt.initConfig({
    // configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist',
      src: 'src'
    },
    watch: {
      sass: {
        files: ['<%= yeoman.app %>/css/{,*/}*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      styles: {
        files: ['<%= yeoman.app %>/css/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '.tmp/css/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      templates: {
        files: ['<%= yeoman.src %>/*.hbs'],
        tasks: ['newer:assemble', 'htmlmin:collapse']
      },
      templateData: {
        files: ['<%= yeoman.src %>/data/*.yml'],
        tasks: ['assemble', 'htmlmin:collapse']
      },
      templateStructural: {
        files: ['<%= yeoman.src %>/{includes,layouts}/*.hbs'],
        tasks: ['assemble', 'htmlmin:collapse']
      }/*,
      templateMinify: {
        files: ['<%= yeoman.app %>/*.html'],
        tasks: ['htmlmin:collapse']
      }*/
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/{,*/}*.js',
        '!<%= yeoman.app %>/js/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    sass: {
      dist: {
        options: {
          includePaths: ['<%= yeoman.app %>/bower_components'],
          outputStyle: 'compressed'
        },
        files: {
          '.tmp/css/main.css': '<%= yeoman.app %>/css/main.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
     dist: {}
     },*/
    // not enabled since usemin task does concat and uglify
    // check index.html to edit your build targets
    // enable this task if you prefer defining your build targets here
    /*uglify: {
     dist: {}
     },*/

    // XXX filerev is disabled
    // To enable, uncomment below and in build task.
    // NB! Some assets are handled by JavaScript and have to have exceptions.
    //filerev: {
      //dist: {
          //src: [
            //'<%= yeoman.dist%>/images/{,*/}*.{webp,gif,svg,png,jpg,jpeg}',
            //'<%= yeoman.dist %>/css/*.css',
            //'<%= yeoman.dist %>/js/{,*}/*.js'
          //]
      //}
    //},

    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/index.html'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images/',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // This task is pre-configured if you do not wish to use Usemin
      // blocks for your CSS. By default, the Usemin block from your
      // `index.html` will take care of minification, e.g.
      //
      //     <!-- build:css({.tmp,app}) styles/main.css -->
      //
      // dist: {
      //     files: {
      //         '<%= yeoman.dist %>/styles/main.css': [
      //             '.tmp/styles/{,*/}*.css',
      //             '<%= yeoman.app %>/styles/{,*/}*.css'
      //         ]
      //     }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      },
      collapse: {
        options: {
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.app %>'
        }]
      },
      deploy: {
        options: {
          collapseWhitespace: true,
          minifyJS: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt,pdf}',
            '.htaccess',
            '{,*/}*.html',
            'images/{,*/}*.{webp,gif,svg,png,jpg,jpeg}',
            'css/fonts/{,*/}*.*',
            'fonts/{,*/}*.*'
          ]
        }]
      },
      notOptimised: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src:'images/dont_optimise/**/{,*/}*.{webp,gif,svg,png,jpg,jpeg}'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      },
      inc: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>',
        src: 'inc/{,*/}*.*',
        options: {
          mode: true,
          timestamp: true
        }
      }
    },
    modernizr: {
      dist: {
        devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
        outputFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',
        parseFiles : true,
        files: {
          src: [
            '<%= yeoman.app %>/js/{,*/}*.js',
            '<%= yeoman.app %>/css/{,*/}*.css',
            '!<%= yeoman.dist %>/js/vendor/*'
          ]
        },
        uglify: true,
        extra: {
          'load': false
        },
        tests: ['touch']
      }
    },
    concurrent: {
      server: [
        'sass',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles'
      ]
    },
    assemble: {
      options: {
        flatten: true,
        assets: '<%= yeoman.app %>',
        layoutdir: 'src/layouts',
        partials: ['src/includes/*.hbs'],
        data: ['src/data/*.yml']
      },
      pages: {
        src: ['src/*.hbs'],
        dest: '<%= yeoman.app %>/'
      }
    },
    critical: {
      dist: {
        options: {
          base: '<%= yeoman.dist %>/',
          css: [
            '<%= yeoman.dist %>/css/main.css',
          ],
          width: 1024,
          height: 4500,
          minify: true,
          extract: true
        },
        src: '<%= yeoman.dist %>/index.html',
        dest: '<%= yeoman.dist %>/index.html'
      }
    },
  });

  grunt.registerTask('minify', function() {
    grunt.task.run([
      'htmlmin:dist',
      'imagemin',
      //'svgmin'
    ]);
  });

  /**
   * Run the server.
   * Load environment-specific Grunt tasks for best performance.
   */
  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive', 'minify']);
    }
    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'assemble',
      'htmlmin:collapse',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test'
  ]);

  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean:dist',
      'assemble',
      'modernizr',
      'useminPrepare',
      'concurrent:dist',
      'minify',
      'autoprefixer',
      'concat',
      'cssmin',
      'uglify',
      'copy:dist',
      'copy:inc',
      //'filerev',
      'copy:notOptimised',
      'usemin',
      //'critical',
      'htmlmin:deploy'
    ]);
  });

  /**
   * Standalone Cleaning taskl
   */
  grunt.registerTask('cleanup', function() {
    grunt.task.run([
      'clean:server',
      'clean:dist'
    ]);
  });

  /**
   * Standalone QA task.
   */
  grunt.registerTask('qa', function() {
    grunt.task.run([
      'jshint'
    ]);
  });

  /**
   * Default task.
   */
  grunt.registerTask('default', function() {
    grunt.task.run([
      'jshint',
      'test',
      'build'
    ]);
  });
};
