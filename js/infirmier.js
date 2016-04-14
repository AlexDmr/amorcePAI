require( "./infirmier.css" );
var template = require( "./infirmier.html" )
var controller = function (proxyNF){
    
    //créer methodes pour affectert patient à l'infirmier et ce servir du proxyNF
    
}
module.exports = function(moduleAngular){
    moduleAngular.component("infirmier", {
        controller  : controller,
        template    : template,
        bindings    : {data : "<"}
    });
}