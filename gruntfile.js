/*global module: true */
module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> */'
    },
    clean: {
      all: ['<%=pkg.folders.build %>'],
      css: {
        src: ['<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/*.css',
            '!<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css']
      }
    },
    jshint: {
      src: '<%=pkg.folders.jsSource %>' + '**/*.js',
      grunt: ['gruntfile.js'],
      options: {
        jshintrc: '.jshintrc',
        globals: {
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: [{
          src: ['<%=pkg.folders.wwwRoot %>/scss/app.scss'],
          dest: '<%=pkg.folders.wwwRoot %>' + 'css/app.css',
          ext: '.css'
        }]
      }
    },
    watch: {
      javascript: {
        files: ['<%=pkg.folders.jsSource %>' + '**/*.js'],
        tasks: ['jshint', 'karma:development:run'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['<%=pkg.folders.wwwRoot %>' + '*.html'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['<%=pkg.folders.wwwRoot %>' + 'css/*',
                '<%=pkg.folders.wwwRoot %>' + 'scss/**/*.scss'
        ],
        options: {
          livereload: false
        },
        tasks: ['sass']
      },
      filmposters: {
        files: ['<%=pkg.folders.wwwRoot %>' + 'filmposters/*'],
        options: {
          livereload: true
        }
      },
      karma: {
        files: ['<%=pkg.folders.testRoot + "**/*.js" %>'],
        tasks: ['karma:development:run']
      }
    },
    targethtml: {
      build: {
        files: {
          '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/': '<%=pkg.folders.wwwRoot %>*.html'
        }
      }
    },
    copy: {
      css: {
        files: [{
          expand: true,
          dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
          src: ['*.css'],
          cwd: '<%= pkg.folders.wwwRoot%>css/'
        }]
      },
      filmposters: {
        files: [{
          expand: true,
          dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/filmposters/',
          src: ['**', "!**/README"],
          cwd: '<%= pkg.folders.wwwRoot%>filmposters/'
        }]
      },
      images: {
        files: [{
          expand: true,
          dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/images/',
          src: ['**', "!**/README"],
          cwd: '<%= pkg.folders.wwwRoot%>images/'
        }]
      },
      filmresources: {
        files: [{
          expand: true,
          dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/filmresources/',
          src: ['**'],
          cwd: '<%= pkg.folders.wwwRoot%>filmresources/'
        }]
      },
      modules: {
        files: [{
          expand: true,
          dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/modules/',
          src: ['**', '!**/*.js', "!**/README"],
          cwd: '<%= pkg.folders.wwwRoot%>modules/'
        }]
      },
      deploy: {
        files: [{
          expand: true,
          dest: '<%=deployOrdner %>',
          src: ['<%= pkg.name + "-" + pkg.version + ".tar.gz"%>'],
          cwd: '<%= pkg.folders.build%>'
        }]
      },
      htaccess: {
        files: [{
          expand: true,
          dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/',
          src: ['.htaccess'],
          cwd: '<%= pkg.folders.wwwRoot%>'
        }]
      }
    },
    cssmin: {
      css: {
        files: {
          '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css': [
              //include all css files in correct order, add new files in desired order
              '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/app.css'
            ]
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      development: {
        options: {
          background: true
        }
      },
      build: {
        options: {
          singleRun: true
        }
      }
    },
    compress: {
      tgz: {
        options: {
          mode: "tgz",
          archive: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '.tar.gz'%>"
        },
        expand: true,
        src:  ['**/*', '**/.*'],
        dest: '<%= pkg.name + "-" + pkg.version %>/',
        cwd: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "<%= pkg.folders.jsSource %>",
          name: "../../../bower_components/almond/almond",
          include: "main",
          mainConfigFile: "<%= pkg.folders.jsSource %>/main.js",
          out: "<%= pkg.folders.build + pkg.name + '-' + pkg.version %>/modules/main.js",
          optimize: "uglify2",
          paths: {
            'angular': '../../../bower_components/angular/angular',
            'ngRoute': '../../../bower_components/angular-route/angular-route',
            'ngResource': '../../../bower_components/angular-resource/angular-resource',
						"angular-isotope": "../../../bower_components/angular-isotope/dist/angular-isotope",
						"isotope": "../../../bower_components/isotope/jquery.isotope.min",
//            'ngTouch': '../../../bower_components/angular-touch/angular-touch',	
//            'ngAnimate': '../../../bower_components/angular-animate/angular-animate',
            "app": "../../../app/modules/app"

          },
          generateSourceMaps: false,
          preserveLicenseComments: false,
//		  useSourceUrl: true,
          uglify2: {
            // TODO - angular.js is already minified, mangling destroys it, so mangling is currently globally disabled to allow full optimization and minification of javascript code, without ruing functions parameters names, which is vital for Angular.js.
            mangle: false
          }
        }
      }
    },
    connect: {
      server: {
        options:  {
          port: process.env.PORT || 8000,
          base: '',
          hostname: '*'
        }
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: "<%=pkg.folders.build + pkg.name + '-' + pkg.version%>",
          network: ["*"],
          fallback: [],
          exclude: [],
          preferOnline: true,
          timestamp: true,
          hash: true
        },

        src: ["**/*", "!modules/main.js.map", "!modules/main.js.src",
          //WHEN CREATING A NEW MODULE, ADD IT HERE, AS WELL AS IN app.js.
          "!js", "!css", "!filmposters", "!filmresources", "!modules", "!modules/film", "!modules/home"],
        dest: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '/' + pkg.name %>.manifest"
      }
    },
    license: {
      options: {
        unknown: true,
        start: '.',
        depth: null,
        output: "file"
      }
    },
    dataUri: {
      dist: {
        src: ['<%=pkg.folders.wwwRoot %>css/*.css'],
        dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
        options: {
          target: ['<%=pkg.folders.wwwRoot %>images/*.*'],
          fixDirLevel: true,
          baseDir: '<%=pkg.folders.wwwRoot %>css'
        }
      }
    },
    release: {
      options: {
        npm: false
      }
    }
  });

  grunt.registerTask("install", "Create a deployable artifact for production servers",
    function () {
      grunt.task.run("jshint");
      grunt.task.run("clean:all");
      grunt.task.run("requirejs");
      grunt.task.run("dataUri");
      grunt.task.run("cssmin");
      grunt.task.run("clean:css");
      grunt.task.run("copy:filmposters");
      grunt.task.run("copy:filmresources");
      grunt.task.run("copy:modules");
      grunt.task.run("copy:htaccess");
      grunt.task.run("targethtml:build");
      grunt.task.run("manifest");
      // grunt.task.run("compress");
    }
  );

  grunt.registerTask('license', 'List all packages (and their sub-packages) that this project depends on with license information', function() {
    function convertToCsv(data) {
      var ret = "", module, licenses, repository;

      for (module in data) {
        if (data.hasOwnProperty(module)) {
          licenses = data[module].licenses || "";
          repository = data[module].repository || "";
          ret = ret + module + ";" + licenses + ";" + repository + "\r\n";
        }
      }

      return ret;
    }
    var checker = require('license-checker'),
      fs = require('fs'),
      done = this.async(),
      defaults = {
        start: '.',
        unknown: false,
        depth: 1,
        include: 'all',
        output: 'console', //console or file
        filename: 'LICENSES',
        format: 'json' //json or csv
      },
      options = grunt.util._.extend(defaults, this.options());

    checker.init(options, function(data){
      if (options.format === 'csv') {
        data = convertToCsv(data);
      } else {
        data = JSON.stringify(data, null, 4);
      }

      if (options.output === 'file') {
        fs.writeFile(options.filename, data, function() {
          console.log('Successfully written '.green + options.filename.grey);
          done();
        });
      } else if (options.output === 'console') {
        grunt.log.writeln(data);
      } else {
        grunt.log.writeln("Unknown output channel: " + options.output);
      }
    });
  });

  grunt.registerTask('default', ['jshint']);
  
  grunt.registerTask('web', ['connect', 'karma:development', 'sass', 'watch']);

  //call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};