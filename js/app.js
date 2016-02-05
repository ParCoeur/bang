(function() {
	// Déclaration du module
	var app = angular.module('bangModule', []);
	
	// app.config(['$routeProvider', function($routeProvider){
		// $routeProvider.when('/blindtest', { templateUrl: 'includes/blindtest.html', controller: 'ThemesController' });
	// }]);
		
	app.controller('ThemesController', ['$scope','$http','$interval', function($scope, $http, $interval) {
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

		$scope.timers = [new Countdown(initTime), new Countdown(initTime)]; // 2 timers
		$scope.current = 1;

		$scope.arrow = "GO !";
		$scope.colorArrow = "";
		$scope.teamStarter = "";
		$scope.timerStarted = false;
		$scope.timerPaused = false;

		$scope.resetTimer = function() {
			$scope.timers[0].pause();
			$scope.timers[1].pause();

			$scope.timers = [new Countdown(initTime), new Countdown(initTime)];
			$scope.arrow = "GO !";
			$scope.colorArrow = "";
			$scope.teamStarter = "";
			$scope.timerStarted = false;
			$scope.timerPaused = false;
		}

		$scope.changeStarter = function() {
			if($scope.current%2==0) {
				$scope.current = 1;
				$scope.colorArrow = "blue";
			}
			else {
			 	$scope.current = 0;
			 	$scope.colorArrow = "red";
			}
		}

		/** Upon clicking, stop the current timer, resume the other one **/
		$scope.alter = function() {
			$scope.timers[$scope.current].pause();
			$scope.current = ++$scope.current % 2;
			$scope.timers[$scope.current].start();
			if($scope.current%2 == 1) 
			{
				$scope.arrow = ">>";
				$scope.colorArrow = "red";
			}
			else
			{
				$scope.arrow = "<<";
				$scope.colorArrow = "blue";
			}
		}

		$scope.pauseTimer = function() {
			if($scope.timerStarted==true) $scope.timers[$scope.current].pause();
			else $scope.timers[$scope.current].start();
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
			    	if(value > 0) --value
			    	else $interval.cancel(countdownInterval)
			    	self.terminated = value <= 0;
			 	}, 10)
			  	this.started = true;
			  	$scope.timerStarted = true;
			  	$scope.timerPaused = false;
			}

			this.pause = function() {
				if (!this.started || !countdownInterval) {
			    	return;
			  	}
			  	this.started = false;
			  	$scope.timerStarted = false;
			  	$interval.cancel(countdownInterval)
			  	countdownInterval = null;
			  	$scope.timerPaused = true;
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