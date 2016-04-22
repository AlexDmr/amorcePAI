var proxyNF = function($http) {
	// Ajoutez le code de construction du service
    //construit un objet qui va être instancié dans le controlleur
	// Cette fonction sera appelée pour instancier un objet service ...
	// Utilisez $http pour télécharger la base de données
    //this.getData() = function(){return $http.get( ci dessous )....
    this.getData = function(src){
        return $http.get(src).then(processData);
    }





function processData(resp){
    var cabinetJS = {patientNonAffectes : [], infirmiers : {}, patients : [] };
    var parser = new DOMParser();
    var doc = parser.parseFromString(resp.data, "text/xml");
    var infirmiersXML = doc.querySelectorAll("infirmier");
    var infirmierXML , i , infirmier;
    for(i=0; i<infirmiersXML.length ; i++) {  //voir avec foreach
        infirmierXML = infirmiersXML[i];
        var id = infirmierXML.getAttribute('id');
        infirmier = {   id : id,
                        name : infirmierXML.querySelector("nom").textContent,
                        forname : infirmierXML.querySelector("prenom").textContent,
                        photo : infirmierXML.querySelector("photo").textContent,
                        patients : [] 
                    };
        cabinetJS.infirmiers[id] = infirmier;
    }
    //Traitement
    var patientsXML, patientXML, patient;
    patientsXML = doc.querySelectorAll("patient");
    for(i=0 ; i<patientsXML.length ; i++) {
        patientXML = patientsXML[i];
        patient =   {   name : patientXML.querySelector("nom").textContent,
                        forname : patientXML.querySelector("prenom").textContent,
                        sex : patientXML.querySelector("sexe").textContent,
                        birthday : patientXML.querySelector("naissance").textContent,
                        numero : patientXML.querySelector("numero").textContent, 
                        adress: {   patientfloor : patientXML.querySelector("adresse[etage]"),
                                    numero : patientXML.querySelector("adresse[numero]"),
                                    street : patientXML.querySelector("adresse[rue]"),
                                    city : patientXML.querySelector("adresse[ville]"),
                                    postalCode : patientXML.querySelector("adresse[codePostal]")
                                    }
                    };
        cabinetJS.patients.push(patient);
        //patient affecté?
        var visite = patientXML.querySelector("visite[intervenant]");
        if(visite===null){
            cabinetJS.patientNonAffectes.push(patient);
        } else {
            id = visite.getAttribute("intervenant");
            cabinetJS.infirmiers[id].patients.push(patient);
        }
    }
    
return cabinetJS;
    
//ajout d'un nouveau patient dans la BDD
this.ajouterNouveauPatient = function(nouveauPatient) {
    return $http({
        method  : 'POST',
        url     : "/addPatient",
        data    : nouveauPatient
    }).then(function(response){
        console.log("ajout patient depuis NF.js");
    })
};

    
}
    
    
    
};

proxyNF.$inject = [ "$http" ]; // Injection de dépendances
module.exports = function(moduleAngular) {
	var idService = "proxyNF";
	moduleAngular.service(idService, proxyNF);
};