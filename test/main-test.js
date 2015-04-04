(function (window, require) {
	"use strict";
	var allTestFiles, TEST_REGEXP;

	allTestFiles = [];
	TEST_REGEXP = /Test\.js$/;

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			allTestFiles.push(file);
		}
	});

	allTestFiles.push("app");
	allTestFiles.push("mocks");
	allTestFiles.push("angular-route");
//	allTestFiles.push("angular-touch");
//	allTestFiles.push("angular-animate");

	require({
		// "/base" is the URL from where karma is serving project files
		baseUrl:'/base/app/modules',
		paths:{
//			'jquery': '/base/bower_components/jquery/dist/jquery',
			'angular':'/base/bower_components/angular/angular',
			'angular-route':'/base/bower_components/angular-route/angular-route',		
			'mocks':'/base/bower_components/angular-mocks/angular-mocks'
//			'angular-touch': '/base/bower_components/angular-touch/angular-touch',
			'angular-animate':'/base/bower_components/angular-animate/angular-animate',
//			'translate': '/base/bower_components/angular-translate/angular-translate',
//      		'translate-static-loader': '/base/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
//      		'translate-handler-log': '/base/bower_components/angular-translate-handler-log/angular-translate-handler-log'
		},
		shim:{
//			'jquery': { deps:[], exports:'jquery'},
			'angular':{ deps:[], exports:'angular' },
			'angular-route':{ deps:['angular'], exports:'angular-route' },
			'mocks':{ deps:['angular'], exports:'mocks' },
//			'angular-touch':{ deps:['angular'], exports:'ngTouch' },
			'angular-animate':{ deps:['angular'], exports:'ngAnimate' },
//			'translate': { deps: ['angular']},
//      		'translate-static-loader': { deps: ['translate']},
//      		'translate-handler-log': { deps: ['translate']}
		},
		// ask Require.js to load these files (all our tests)
		deps: allTestFiles,
		
		// start test run, once Require.js is done
		callback: window.__karma__.start
		
	}, allTestFiles, function () {
		window.__karma__.start();
	}, function (err) {
		var failedModules = err.requireModules;
		console.log("err", err);

		if (failedModules && failedModules[0]) {
			throw new Error("Module couldn't be loaded: " + failedModules);
		} else {
			throw new Error("Unkown error:" + err);
		}
	});
}(window, require));