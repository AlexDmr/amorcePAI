var template = require( "./cabinetMedical.html" );
require( "./cabinetMedical.css" );
module.exports = function(moduleAngular) {
	var proxyNF = require( "./NF.js" )(moduleAngular);
    require( "./infirmier.js" )(moduleAngular);
	var controller = function( proxyNF ) {
        console.log( "on a une nouvelle instance de cabinetMedical" );
        //proxyNF.getData("./data.cabinetInfirmier.xml");
        var self = this;
        proxyNF.getData(this.src).then( function(cabinetMedicalJS){
            self.data = cabinetMedicalJS;
        })
		// Cette fonction sera appelée pour instancier un cabinet
	}
	controller.$inject = [ proxyNF ]; // Injection de dépendances ou services que va utiliser la fonction controller

	moduleAngular.component( "cabinetMedical", {
		template	: template,
        controller	: controller,
		bindings	: {
            src     : "@",
			titre	: "@"
		}		
	});
};