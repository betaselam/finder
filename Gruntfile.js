module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            desktopJS: {
                options: {
                    baseUrl: "js/app",
                    paths: {
                        "desktop": "init/DesktopInit"
                    },
                    wrap: true,
                    name: "../libs/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    mainConfigFile: "js/app/config/config.js",
                    include: ["desktop"],
                    out: "js/app/init/DesktopInit.min.js"
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./css/desktop.css",
                    out: "./css/desktop.min.css"
                }
            }
        },

        copy: {
            main: {
                files: [
                  {
                      src: ['server/environment/globals-dev.js'],
                      dest: 'js/app/config/environment/globals.js'
                  }
                ]
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'js/app/**/*.js', '!js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        plato: {
            complexity: {
                options: {
                    exclude: /\.min\.js$/
                },
                files: {
                    'reports': ['js/app/**/*.js']
                }
            }
        },

        cucumberjs: {
            files: 'features',
            options: {
                steps: "features/step_definitions"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-cucumber');
    grunt.loadNpmTasks('grunt-plato');

    grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:desktopCSS']);
    grunt.registerTask('analysis', ['plato', 'jshint']);
    grunt.registerTask('unit:test', ['karma']);
    grunt.registerTask('acceptance:test', ['build', 'cucumberjs']);
    grunt.registerTask('default', ['build', 'analysis']);

};







