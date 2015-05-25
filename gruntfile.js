module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.initConfig({

		uglify:{
			my_target:{

			files:{
					'htdocs/source/inc/js/global.scripts.js' : ['htdocs/source/inc/components/js/*.js']
				}// files
			}// my_target
		},// uglify
		compass:{
			dev:{
				options:{
					config:'config.rb'
				}// options
			}// dev
		},// compass
		sass: {
		  dist: {
		    options: {
		      require: 'susy'
		    }
		  }
		},
		watch:{
			options:{ livereload: true },
			scripts:{
				files: ['htdocs/source/inc/components/js/*.js'],
				tasks: ['uglify']
			},// scripts
			sass:{
				files: ['htdocs/source/inc/components/sass/*.scss'],
				tasks: ['compass:dev']
			},// Sass
			html :{
				files: ['htdocs/source/*.html']
			}// HTML
		} // watch
	}) // initCOnfig
	grunt.registerTask('default', 'watch');
} // exports