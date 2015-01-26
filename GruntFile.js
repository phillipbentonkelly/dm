module.exports = function(grunt) {
	// require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);
    
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				// We watch and compile sass files as normal but don't live reload here
				files: ['styles/**/*.scss'],
				tasks: ['sass']
			}, jshint: {
				files: ['js/assets/**'],
				tasks: ['jshint:assets']
			}, copy_css_resources: {
				files: ['styles/resources/**'],
				tasks: ['copy:css_resources']
			}, copy_css_components: {
				files: ['styles/css/**'],
				tasks: ['copy:css_components']
			}, copy_images: {
				files: ['images/**'],
				tasks: ['copy:images']
			}, copy_js: {
				files: ['js/assets/**'],
				tasks: ['copy:js']
			}, copy_fonts: {
				files: ['fonts/**'],
				tasks: ['copy:fonts']
			}/*,
			options: {
				livereload: true
			}*/
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
					trace: false,
					lineNumbers: true,
					noCache: true, 
				},
				files: [{
					expand: true,
					cwd: 'styles/sass',
					src: ['**/*.scss'],
					dest: 'styles/css',
					ext: '.css'
				}]
			}
		},
		csslint: {
			lax: {
				options: {
					import: 2,
					csslintrc: '.csslintrc' // Setting what errors to lint and which will terminate operations
				},
				src: 'styles/css/*.css'
			}
		},
		jshint:{
			gruntFs: {
				src: 'Gruntfile.js',
				options: {
					globals: {
						jQuery: true,
						console: true,
						module: true,
						document: true
					}, 
					force: false,
					reporter: require('jshint-stylish')
				}
			},
			assets: {
				src: 'js/assets/*.js',
				options: {
					globals: {
						jQuery: true,
						console: true,
						module: true,
						document: true
					}, 
					force: true,
					reporter: require('jshint-stylish')
				}
			}
		},
		cssmin: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'styles/css',
					src: ['styles/css/*.css'],
					dest: 'styles/css/',
					ext: '.min.css'
				}]
			}
		},
		copy: {
			css_resources: {
				expand: true,
				src: 'styles/resources/**',
				dest: 'dist/',
				filter: 'isFile'
			},
			css_components: {
				expand: true,
				src: 'styles/css/**',
				dest: 'dist/',
				filter: 'isFile'
			},
			js: {
				expand: true,
				src: 'js/**',
				dest: 'dist/',
				filter: 'isFile'
			},
			fonts: {
				expand: true,
				src: 'fonts/**',
				dest: 'dist/',
				filter: 'isFile'
			},
			images: {
				expand: true,
				src: 'images/**',
				dest: 'dist/',
				filter: 'isFile'
			}
		},
		notify_hooks: {
		    options: {
				enabled: true,
				max_js_hint_notifications: 5,
				title: 'BCOM - DM (Real Estate) Notifications',
				success: true,
				duration: 3
		    },
		    sass: {
		    	options: {
		    		title: "Sass Watch Notifications",
		    		message: "His 'WATCH' has ended!"
		    	}
		    },
		    jshint: {
		    	options: {
		    		title: "jshint Watch Notifications",
		    		message: "His 'WATCH' has ended!"
		    	}
		    }
		}
	});

	// Load the plugin that provides the "watch" task.
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Load the plugin that provides the "sass" task.
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Load the plugin that provides the "csslint" task.
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Load the plugin that provides the "csslint" task.
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Load the plugin that provides the "jshint" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Load the plugin that provides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Load the plugin that provides the "copy" task.
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Load the plugin that provides the "notify" task.
	grunt.loadNpmTasks('grunt-notify');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'csslint', 'cssmin', 'jshint'/*, 'concat', 'uglify', 'notify:server'*/, 'copy', 'notify_hooks', 'watch']);

	// This is required if you use any options.
	grunt.task.run('notify_hooks');
};