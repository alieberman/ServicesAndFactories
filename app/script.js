// Code goes here
var app = angular.module('servicesAndFactoriesApp', ['ngResource']);

app.controller('MainCtrl', ['$http', '$resource', '$scope','myFactory', 'myService', 'myResource', function($http, $resource, $scope, myFactory, myService, myResource) {

  $http.get('data.json').success((result) => {
    console.log('result from ctrl is: ', result);
    $scope.data1 = result;
  }).catch( (err) => {
    console.log('error is: ', err);
  })

  myService.getData('data.json').success((result) => {
    console.log('result from service is: ', result);
    $scope.data2 = result;
  }).catch( (err) => {
    console.log('error is: ', err);
  })

  myFactory.getData.then((result) => {
    console.log('result from factory is: ', result);
    $scope.data3 = result.data;
  }).catch( (err)=> {
    console.log('error is: ', err);
  })

  myResource.query(function(result) {
       console.log(('result from my resource is: ', result));
       $scope.data4 = result;
  }, function(error) {
      console.log('error is: ', error);
  })

}])

app.service('myService', function($http) {

  this.getData = function(path) {
    return $http.get(path);
  }

})

app.factory('myFactory', function($http) {

  return {
    getData: $http.get('data.json')
  }

})

app.factory('myResource', function($resource) {
	var getData = $resource('data.json',
	{
          post: {method: 'POST'},
     	get: {method: 'GET'},
     	update: {method:'PUT'},
     	query: {method:'GET', isArray:true}
     });
	return getData;
})
