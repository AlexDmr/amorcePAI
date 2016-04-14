require( "./secretary.css" );

require( "./traitement.js" );
require( "./ajoutPatient.js" );



var angular 		= require( "angular" 		)
  , angularMaterial	= require( "angular-material" )
  ;
require( "angular-material/angular-material.css" );

var modAng =    angular.module( "cabinet", [ angularMaterial ] ); 
var modAngu =   angular.module('tabsDemoDynamicHeight', 'cardDemo1', ['ngMaterial']);
require( "./NF.js" )(modAng);

require( "./cabinetMedical.js" )(modAng);

