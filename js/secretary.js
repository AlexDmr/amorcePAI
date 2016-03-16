require( "./secretary.css" );

var utils = require("./utils.js");
var cabinetJS = {patientsNonAffectés:[], infirmiers:{}};

utils.XHR('GET','data/cabinetInfirmier.xml').then(function(xhr){
	//console.log(xhr);
    var parser = new DOMParser();
    var doc = parser.parseFromString(xhr.resposeText,"text/xml");

    var infirmiersXML = doc.querySelectorAll("infirmier");
    var infirmierXML;
    var i;
    var infirmier;
    var id;
    for(i=0; i<infirmiersXML.length; i++){
    	infirmierXML=infirmiersXML[i];
        id = infirmierXML.getAttribute('id');
        infirmier = { name: infirmierXML.querySelector("nom").textContent,
                      forname: infirmierXML.querySelector("prenom").textContent,
                      photo: infirmierXML.querySelector("photo").textContent,
                      patients:[]
                    };
        cabinetJS.infirmiers[id]=infirmier; //si puo mettere [id] anche se é un attributo                      
    }
    
     
    
    //traitement
    var patientsXML;
    var patientXML;
    var patient;
    patientsXML=doc.querySelectorAll("patient");
    for(i=0;i<patientsXML.length;i++){
    	patientXML=patientsXML[i];
    	patient={name: patientXML.querySelector("nom").textContent,
    		     forname: patientXML.querySelector("prenom").textContent,
                 sexe: patientXML.querySelector("sexe").textContent,
                 birthdate: patientXML.querySelector("naissance").textContent,
                 numero: patientXML.querySelector("numero").textContent,
                 adresse: {etage:patientXML.querySelector("adresse[etage]"),
                           numero: patientXML.querySelector("adresse[numero]"),
                           rue: patientXML.querySelector("adresse[rue]"),
                           ville: patientXML.querySelector("adresse[ville]"),
                           codePostal: patientXML.querySelector("adresse[codePostale]")
                          }
    	        };
    	//le patient est-il affecté?
        var visite = patientXML.querySelector("visite[intervenant]");
        if(visite===null){
        	cabinetJS.patientsNonAffectés.push(patient);
        	} else{
        		id = visite.getAttribute("intervenant");
        		cabinetJS.infirmier[id].patients.push(patient);
        	}	        
    }
    console.log("cabinet:",cabinetJS);
})