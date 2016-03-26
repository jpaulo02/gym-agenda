module.exports = function(grunt){
	var gruntEnv = 'development',
		developmentTasks = ['jshint', 'sass', 'copy', 'concat', 'notify:complete'],
		productionTasks = ['sass', 'copy', 'concat', 'uglify'],
		jsFiles = [
			'public/libs/jquery/dist/jquery.js',
			'public/libs/jquery-ui/ui/core.js',
			'public/libs/jquery-ui/jquery-ui.js',
			'public/libs/underscore/underscore.js',
			'public/libs/angular/angular.js',
			'public/libs/angular-animate/angular-animate.js',
			'public/libs/angular-sanitize/angular-sanitize.js',
			'public/libs/angular-bootstrap/ui-bootstrap-tpls.js',
			'public/libs/angular-ui-router/release/angular-ui-router.js',	
			'public/libs/jquery-ui/ui/widget.js',
			'public/libs/restangular/dist/restangular.js',
			'public/libs/highcharts-ng/src/highcharts-ng.js',
			'public/libs/highcharts-release/highcharts.src.js',
			'public/libs/moment/moment.js',
			'public/js/modules/nmt-App.js',
			'public/js/modules/nmt-AppConfig.js',
			'public/js/modules/nmt-Routing.js',
			'public/js/controllers/mainController.js',
			'public/js/controllers/dashboardController.js',
			'public/js/controllers/welcomeController.js',
			'public/js/controllers/workoutsController.js',
			'public/js/controllers/loggerController.js',
			'public/js/controllers/dataController.js',
			'public/js/services/**/*.js',
			'public/js/filters/**/*.js'
		];

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			jshint: {
				all: ['public/js/**/*.js']
			},
			concat: {
				options: {
					separator: ';',
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				dist: {
					src: jsFiles,
					dest: 'public/builds/script.js'
				}
			},
			uglify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				build: {
					src: 'builds/script.js',
					dest: 'builds/script.min.js'
				}
			},
			sass: {
				dist: {
					options: {
						loadPath: [
							'public/libs/bootstrap-sass-official/assets/stylesheets/',
							'public/libs/bootswatch-scss/cyborg',
							'public/libs/font-awesome/scss',
							'public/style/css',
							'public/style/sass'
						],
						style: 'compressed'
					},
					files: {
						'public/builds/style.css': 'public/style/sass/style.scss'
					}
				}
			},
			copy: {
				fonts: {
					expand: true,
					flatten: true,
					filter: 'isFile',
					src: [
						'public/libs/font-awesome/fonts/**',
						'public/libs/bootstrap/fonts/**'
					],
					dest: 'public/builds/fonts'
				}
			},
			watch: {
				css: {
					files: '**/*.scss',
					tasks: ['sass']
				}
			},
			notify_hooks: {
				options: {
					enabled: true,
					max_jshint_notifications: 5
				}
			},
			notify: {
				complete: {
					options: {
						message: 'Grunt Completed!'
					}
				},
			}
		});
		
		//Load plugin tasks
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-contrib-copy');

		if(gruntEnv === 'production') {
			grunt.loadNpmTasks('grunt-contrib-uglify');
			grunt.registerTask('default', productionTasks);
		}
		else {
			grunt.loadNpmTasks('grunt-contrib-watch');
			grunt.loadNpmTasks('grunt-contrib-jshint');
			grunt.loadNpmTasks('grunt-notify');
			grunt.registerTask('default', developmentTasks);
		}
};