
module.exports = function (grunt){
    'use strict';
    
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    
    var config = {
        app: './app',
        dist: './dist'
    };
    
    grunt.initConfig({
        config: config,
        clean: {
            foo: {
              src: ['dist/**/*'],
              filter: 'isFile',
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: '<%=config.app %>/js/', src: ['*.js'], dest:  '<%=config.dist %>/js/'},
                    /*{expand: true, cwd: '<%=config.app %>/css/', src: ['*.css'], dest: '<%=config.dist %>/css/'},*/
                    /*{expand: true, cwd: '<%=config.app %>/imgs/', src: ['*.*'], dest: '<%=config.dist %>/imgs/'},*/
                    {expand: true, cwd: '<%=config.app %>/', src: ['*.html'], dest: '<%=config.dist %>/'}
                ]
            }
        },
        less: {
            development: {
                files: [{
                    expand: true, cwd:  '<%=config.app %>/less/', src: ['**/global.less'], dest: '<%=config.dist %>/css/', ext: '.css'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/vendors/jquery/jquery.js'],
                dest: '<%=config.dist %>/js/vendors.min.js'
            }
        },
        uglify: {
            vendors: {
                files: {'<%=config.dist %>/js/vendors.min.js': ['<%=config.app %>/js/vendors.min.js']}
            }
        },
        imagemin: {
           prop: {
             options: {
               optimizationLevel: 7,
               pngquant: true
             },
             files: [
               {expand: true, cwd: '<%=config.app %>/', src: ['imgs/*.{png,jpg,jpeg,gif,webp,svg}'], dest: '<%=config.dist %>/'}
             ]
           }
        },
        usemin: {
            html: '<%=config.dist %>/*.html',
            options: {
                filePrefixer: function(url){
                    if(!url){
                        return '';
                    }
                    return url.replace('dist/imgs','app/imgs');
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['<%=config.app %>/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
            copy: {
                files: ['<%=config.app %>/**/*.html','<%=config.app %>/imgs/','<%=config.app %>/js/*.js'],
                tasks: ['copy'],
                options: {
                    spawn: false
                }
            }
        }
    });
    
    grunt.registerTask('default', ['copy', 'less', 'concat', 'uglify', 'imagemin', 'watch']);
};