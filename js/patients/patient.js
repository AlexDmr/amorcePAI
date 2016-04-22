var template = require( "./patient.html" )
var templateForm = require( "./formulairePatient.html" )
module.exports = function(moduleAngular) {
    require( "./patient.css" );
    var proxyNF = require( "../NF.js" )(moduleAngular);
    var ctrlPatient = function ( $http, proxyNF ){
        
        var ctrl=this;

        ctrl.nouveauPatient = {
            "patientName"       : "",
            "patientForname"	: "",
			"patientNumber"	    : "",
            "patientSex"		: "",
            "patientBirthday"   : "",
            "patientFloor"  	: "",
            "patientStreet" 	: "",
            "patientPostalCode" : "",
            "patientCity"	: ""
        };
        
        ctrl.sexe   = [
            {sexe: 'M'},
            {sexe: 'F'}
        ];
        
        ctrl.affecterPatient = {
            "patient"   : "",
            "infirmier" : ""
        };
        //créer methodes pour affectert patient à l'infirmier et ce servir du proxyNF


        ctrl.ajouterPatient = function(){
            console.log("test add patient");
        };

    };

        // Construire une balise <infirmier>
        moduleAngular.component("patient", {
            template    : template,
            bindings    : { data : "<" },
            controller  : ctrlPatient
        });
        
        moduleAngular.component("formPatient", {
        controller  : ctrlPatient,
        template    : templateForm,
        bindings    : {
            onValidation : "&",
            data : "<"}
        });


    
    
};
    
