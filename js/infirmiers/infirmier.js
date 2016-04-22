require( "./infirmier.css" );
var template = require( "./infirmier.html" )




module.exports = function(moduleAngular) {

var proxyNF = require( "./NF.js" )(moduleAngular);
var ctrlInfirmier = function (){
    
    //créer methodes pour affectert patient à l'infirmier et ce servir du proxyNF
    
    
    
    
    // Construire une balise <infirmier>
    moduleAngular.component("infirmier", {
        controller  : ctrlInfirmier,
        template    : template,
        bindings    : {data : "<"}
    });
    
    
}
    
}