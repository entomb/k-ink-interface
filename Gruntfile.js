/*global module:false*/
module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({

  // Metadata.
  pkg: grunt.file.readJSON('package.json'),


  // Task configuration.
  requirejs: {
      compile: {
          options: {
            optimize:'none',
            wrap: {
              startFile: "lib/_head.js",
              endFile: "lib/_footer.js"
            },
            include: "kink.js",
            baseUrl: "lib/",
            findNestedDependencies: true,
            skipSemiColonInsertion: true,
            //mainConfigFile: "lib/config.js",
            out: "kink.js",
            onBuildWrite: function convert( name, path, contents ) {
                  grunt.log.writeln('cleaning up file '+name);
                  // Remove define wrappers, closure ends, and empty declarations
                  contents = contents.replace( /define\([^{]*?{/, "" ).replace( /\}\);[^}\w]*$/, "" );

                  // Remove CommonJS-style require calls
                  // Keep an ending semicolon
                  contents = contents
                    .replace( /(\s+\w+ = )?\s*require\(\s*(")[\w\.\/]+\2\s*\)([,;])/g,
                      function( all, isVar, quote, commaSemicolon ) {
                        return isVar && commaSemicolon === ";" ? ";" : "";
                      });


                  // revome @description comments
                  contents = contents.replace( /(@description)([\n\s\w\W\D\d][^\*]+)\*\*\//g,"\n\t **/");

                  // Remove empty definitions
                  contents = contents.replace( /define\(\[[^\]]+\]\)[\W\n]+$/, "" );


                return contents;
              }

          }
      }
    },
    jshint: {
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        unused:  true,
        boss:    true,
        eqnull:  true,
        browser: true,
        globals: {
          //requireJS stuff
          define: true,
          /*
            Ink.js dependencies
          */
          Ink:         true,
          InkBrowser:  true,
          InkSelector: true,
          InkEvent:    true,
          InkElement:  true,
          InkCss:      true,
          InkLoaded:   true,
          InkArray:    true,
          InkUrl:      true,
          InkString:   true,
          InkDate:     true,
          InkCookie:   true,
          InkAjax:     true,
          InkJsonP:    true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/*.js', '!lib/_*.js', 'test/unit/*.js']
      },

    },
    qunit: {
      all: {
        src:'tests/index.html',
        options: {
          inject: 'tests/bridge.js'
        }
      }
    },
    watch: {
      files: ['lib/*.js'],
      tasks: ['tests']
    }
});

  //plugins
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //task list
  grunt.registerTask('default', ['jshint','requirejs']);
  grunt.registerTask('tests',    ['jshint','requirejs','qunit']);


};
