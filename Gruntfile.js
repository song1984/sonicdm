
module.exports = function(grunt) {
	var banner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';

  	// Project configuration.
  	grunt.initConfig({
  		pkg: grunt.file.readJSON('package.json'),
  		uglify: {
  			options: {
  				banner: banner
  			},
  			build_plugins: {
  				src: './__js/concat/plugins.js',
  				dest: './js/plugins.js'
  			},
  			build_main: {
  				src: './__js/concat/main.js',
  				dest: './js/main.js'
  			}
  		},
  		less: {
  			options: {
  				banner: banner
  			},
  			build_main: {
  				files: {
  					'./css/main.css': 'less/__main.less'
  				}
  			}
  		},
  		concat: {
  			options: {
  				banner: banner,
  				separator: '',
  			},
  			concat_plugins: {
  				src: ['./__js/plugins.js', './__js/__plugins/build/*.js'],
  				dest: './__js/concat/plugins.js'
  			}
  		},
  		jshint: {
    		all: ['./__js/__plugins/*']
  		},
  		watch: {
  			scripts: {
  				files: ['./__js/__main/*', './__js/__plugins/*',],
  				tasks: ['jshint', 'concat', 'uglify']
  			},
  			less: {
  				files: ['./less/*'],
  				tasks: ['less:build_main']
  			}
  		},
      babel: {
        options: {
          sourceMap: false,
          presets: ['babel-preset-es2015']     
        },
        dist: {
          files: [{
             expand:true,
             cwd:'__js/__plugins/source/', //js目录下
             src:['*.js'], //所有js文件
             dest:'__js/__plugins/build/'  //输出到此目录下
           }] 
          }
        },
  	});

  	// 加载包含 "uglify" 任务的插件。
  	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-less');
  	grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

  	// 默认被执行的任务列表。
  	grunt.registerTask('default', ['babel', 'concat', 'uglify', 'less:build_main']);
  	grunt.registerTask('uglify-js', ['uglify']);
  	grunt.registerTask('build-css', ['less:build_main']);
  	grunt.registerTask('concat-js', ['concat']);
  	grunt.registerTask('js-syntax-check', ['jshint']);
  	grunt.registerTask('watch-js-and-less', ['watch']);

};