//var app = angular.module('App', ['ngAnimate']);
//
//app.service('JSONService', function($http){         
//    return {
//        getJSON: function() {
//            return $http.get('http://localhost/aa.json');
//        }
//    };
//});
//
//app.controller('PostController', function PostController($scope, JSONService){
//    $scope.data;
////    alert ('asd');
//    
//    $scope.getJSON = function(){            
//        JSONService.getJSON()
//            .then(function (response) {
//                $scope.friends = response.data;
//            });
//    };
//    $scope.addPost = function(postText){
//        // Add to $scope.data (assuming it's an array of objects)
//        $scope.data.push({friends: postText});
//    };
//});
//
//app.factory('myHttp',['$http',function($http) {
//  return {
//    get: function(url, success, fail) {
//      $http.get(url).success(function(response) {
//        return response.data;
//      }).error(fail);
//    }
//  };
//}]);

angular.module('App', ['$timeout', '$watch']);
//.factory('myHttp',['$http',function($http) {
//
//  return function(url, success, failure) {
//    alert(url);
//    
//    $http(url).get(function(json) {
//        var data = examineJSONResponse(json);
//        if(data) {
//          if(success) success(json.data);
//        }
//        else if(failure) {
//          failure();
//        }
//      }).error(function() {
//        if(failure) failure();
//      });
//  }
//
//}]);

function jsonp_example($scope, $timeout, $http) {
  
  $scope.load = function() {
    $scope.testlog = 'ok';
//    $.getJSON("test.json").then(function (data) {
//      $scope.friends = data;//return data.items;
//    });
//    jQuery.getJSON("test.json", function(data){         
//      $scope.friends = data;
//    });
    //    $http.get('test.json').success(function (data) {
    // uwaga to jest przyk³ad który dla statycznego pliku zadzia³a tylko raz
    $scope.friends = null;
//    $.get('http://www.bloomberg.com/quote/csfb:ind', function (data) {
//      var elements = $("<div>").html(stripScripts(data))[0].getElementsByClassName("price")[0];
//  });
//    $http.jsonp('./test-jsonp.json?callback=JSON_CALLBACK').success(function (data) {
//      $scope.friends = data; 
    if (!$scope.query) {
      return;
    }
    $http.jsonp('http://api.themoviedb.org/3/search/movie?api_key=f9e2fa41c29c8ade6eacd6c601aaf72f&callback=JSON_CALLBACK&query=' + 
        $scope.query).success(function (data) {
      // inside data there are basic information about the collection
      $scope.movies = data.results; 
    }).error(function(data, status, headers, config) {
      $scope.testlog = headers();
//      for(i = 0 ; i < headers.length; i++){
//        $scope.testlog += headers[i];
//      }
    });
  };

  $scope.init = function() {
//    $scope.ModelName='query';
    /*
     * following code invokes reload action after given amount of inactivity 
     * since last change of watched property
     */
    $scope.$watch('query', function() {
      if($scope.timer) {
          $timeout.cancel($scope.timer);
      }  
      $scope.timer = $timeout(function() {
        angular.element("#query-field").blur();
        $scope.load();
      }, 800, true);
    });    
  };
//  var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";
//
//  $http.jsonp(url)
//      .success(function(data){
//        alert("2:" + data.found);
//      });
  
//  $http.jsonp('test.json?callback=JSON_CALLBACK')
//  .success(function (data) { 
//     alert(data.response);
//  })
//  .error(function (data) {
//     console.log('ERROR');
//  });
}


//alert('asd: ' + $http.get('http://localhost/aa.json'));