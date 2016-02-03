(function() {
	// Déclaration du module
	var app = angular.module('bangModule', []);
	
	// app.config(['$routeProvider', function($routeProvider){
		// $routeProvider.when('/blindtest', { templateUrl: 'includes/blindtest.html', controller: 'ThemesController' });
	// }]);
		
	app.controller('ThemesController', ['$scope','$http', function($scope, $http) {
		var bang 		= this;
		bang.normals 	= [];
		bang.pongs 		= [];
		bang.images 	= [];
		bang.finales 	= [];
		bang.mashup     = [];
		bang.pistes		= [];
		bang.lyrics     = [];
		bang.radio    	= [];

		$http.get('json/themes.json').success(function(data){
			bang.normals  = data.normals;
			bang.pongs 	  = data.pongs;
			bang.images	  = data.images;
			bang.finales  = data.finales;
			bang.mashups  = data.mashups;
			bang.pistes   = data.pistes;
			bang.lyrics   = data.lyrics;
			bang.radio    = data.radio;
		});

		$scope.toggle 	   = true;
		$scope.used 	   = true;
		$scope.imageUsed   = true;
		$scope.imageFound  = true;
		$scope.finalUsed   = true;
		$scope.mashFound   = true;
		$scope.stemFound   = true;
		$scope.titleFound  = true;
		$scope.lyricUsed   = true;
		$scope.lyricFound  = true;
		$scope.radioUsed   = true;
		$scope.radioFound  = true;
		$scope.radioPlayed = true;
		$scope.radioReveal = true;

		var initTime = 30

		$scope.timers = [new Countdown(initTime), new Countdown(initTime)] // 2 timers
		var current = 1;

		/** Upon clicking, stop the current timer, resume the other one **/
		$scope.alter = function() {
			$scope.timers[current].pause();
			current = ++current % 2;
			$scope.timers[current].start();
		}

		function Countdown(time) {
			var self = this;
			var value = (time || 100) * 100; // seconds -> 0.01 second (not ms)
			self.started = false;
			self.terminated = false;
			var countdownInterval;

			this.getSeconds = function() {
				return Math.ceil(value / 100) // 0.01 milliseconds -> seconds
			}

			this.start = function() {
				if (this.started) {
			    	return;
			  	}
			  	countdownInterval = $interval(function() {
			    	--value
			    	self.terminated = value <= 0;
			 	}, 10)
			  	this.started = true;
			}

			this.pause = function() {
				if (!this.started || !countdownInterval) {
			    	return;
			  	}
			  	this.started = false;
			  	$interval.cancel(countdownInterval)
			  	countdownInterval = null;
			}
		}
  	}]);

  	// app.controller('ListsController', ['$scope','$http', function($scope, $http) {
  	// 	this.normals = [];

  	// 	$http.get('json/lists.json').success(function(data){
  	// 		this.normals = data.normals;
  	// 		this.pongs   = data.pongs;
  	// 		this.finales = data.finales;
  	// 	});
  	// }]);

})();