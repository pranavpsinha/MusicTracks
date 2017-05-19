app.controller("homeCtrl", function($scope, $http, Resource){
	
	//list of all songs from server
	$scope.songs = []
	$http.get("http://104.197.128.152:8000/v1/tracks").then(function(songs){
		$scope.rawSongs = songs.data;
		$scope.filteredSongs = $scope.rawSongs.results;
		
		for(var i=0; i<$scope.filteredSongs.length-1; i++){
			for(var j=i+1; j<$scope.filteredSongs.length; j++){
				if($scope.filteredSongs[i].rating < $scope.filteredSongs[j].rating){
					var temp = $scope.filteredSongs[i];
					$scope.filteredSongs[i] = $scope.filteredSongs[j];
					$scope.filteredSongs[j] = temp;
				}
			}
		}
		
		$scope.songs = $scope.filteredSongs;

	});
	
	//add new track
	$scope.newTrack = {};
	$scope.newTrack.genres = [];
	$scope.addTrack = function() {
		$scope.newTrack.genres.push($scope.newGenreAdd);
		$http.post("http://104.197.128.152:8000/v1/tracks", $scope.newTrack);
	}
	
	//search a track 
	$scope.search = function(){
		var link = "http://104.197.128.152:8000/v1/tracks?title=" + $scope.searchString;
		$http.get(link).then(function(response){
			var result = response.data;
		});
	}
	
	//edit a track
	$scope.modalData = function(s, index) {
		$scope.editableTrack = s;
		$scope.editedIndex = index;
		$scope.newGenreFlag = false;
		$scope.newGenre = {};
	}
	
	$scope.provideGenreInput = function() {
		$scope.newGenreFlag = true;
	}
	
	$scope.editTrack = function() {
		if(typeof($scope.newGenre) == "undefined" || typeof($scope.newGenre.name) == "undefined" ||$scope.newGenre.name.length == 0)
			alert("Invalid Entry");
		else{
			$scope.editableTrack.genres.push($scope.newGenre);
			$scope.songs[$scope.editedIndex] = $scope.editableTrack;
			$scope.newGenreFlag = false;
			
			var link = "http://104.197.128.152:8000/v1/tracks/" + $scope.editableTrack.id;
			/*$http.post(link, $scope.editableTrack).then(function(){
				$scope.newGenre.name = "";
				$scope.editableTrack = {};
			}).catch(function(e){
				$scope.newGenre.name = "";
				$scope.editableTrack = {};
			});*/
		}
	}
	
	//rating to stars
	
	
	//search function	--- notneeded
	/*var input = document.getElementById('searchBar');
	input.addEventListener('keyup', function() {
		$scope.searchString = input.value;
		
		if($scope.searchString.length == 0 || $scope.searchString.length=="") {
			$scope.songs = $scope.filteredSongs;
		}
		else {
			$scope.songs = [];
			
			angular.forEach($scope.filteredSongs, function(fs){
				if($scope.searchString == fs.title.substr(0,$scope.searchString.length)) {
					$scope.songs.push(fs);
				}
			});
		}
		console.log($scope.songs);
	});*/
	
});