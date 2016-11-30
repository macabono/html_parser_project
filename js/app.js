(function () {
'use strict';

angular.module('MfinanteApp', [])
.controller('FirmTableController', FirmTableController)
.service('FirmSearchService', FirmSearchService)
// .directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://www.mfinante.ro/infocodfiscal.html");

// function FoundItemsDirective() {
//   var ddo = {
//     templateUrl: 'foundItems.html',
//     scope: {
//       found: '<',
//       myTitle: '@title',
//       onRemove: '&'
//     },
//   };
//   return ddo;
// }

FirmTableController.$inject = ['FirmSearchService'];
function FirmTableController(FirmSearchService) {
  var ctrl = this;

  ctrl.searchFirms = function (searchTerm) {
    var promise = FirmSearchService.getMatchedDom(searchTerm)
    promise.then(function (response) {
      ctrl.obj = response;
    })
    .catch(function (error) {
      console.log(error);
      // if (error.status == 500) {
      //   formCtrl.error = "No such menu item exists!" ;
      // }
      // else {
      //   formCtrl.error = error.data.status + " ( " + error.statusText + " )";
      // }
    });
  };
}

FirmSearchService.$inject = ['$http', 'ApiBasePath'];
function FirmSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedDom = function (searchTerm) {
    var config = {};
    config.params = {'cod': searchTerm};
    
    return $http.get(ApiBasePath, config)
    .then(function (response) {
      console.log(response);
      var docParsed = HTMLParser(response);
      console.log(docParsed);
      var tableDoc = docParsed.getElementsByTagName("td");
      var obj = {};
      for (var i = 0; i < tableDoc.length; i++) {
        obj[tableDoc[i].innerHTML] = obj[tableDoc[i++].innerHTML]
      };
      console.log(obj);
      return obj;
    });
  };

  
}

})();
