require( "./secretary.css" );




var angular 		= require( "angular"),
    angularMaterial	= require( "angular-material" );
  
require( "angular-material/angular-material.css" );

var modAng =    angular.module( "cabinet", [ angularMaterial, 'ngMaterial' ] )
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default');
});

require( "./cabinetMedical.js" )(modAng);

