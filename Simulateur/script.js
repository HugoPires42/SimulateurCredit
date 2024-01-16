

let ulmois = document.getElementById("mois");
let ulamorti = document.getElementById("amorti");
let ulint = document.getElementById("interets");
let ulrestant = document.getElementById("restant");
let ulmens = document.getElementById("mensualite");
let inputMontant = document.getElementById("Montant");
let inputDuree = document.getElementById("Duree");
let inputTaux = document.getElementById("Taux");
let bouton = document.querySelector(".simuler");

let defaultTemplate = `<li>{{value}}</li>`;
let dureeMois,interets,mensualite;

function getMontant(){
    let valeurMontant = inputMontant.value;
    return parseFloat(valeurMontant);
}
function getDuree(){
    let valeurDuree = inputDuree.value;
    return parseFloat(valeurDuree);
}
function getTaux(){
    let valeurTaux = inputTaux.value;
    return parseFloat(valeurTaux);
}

function calculMensualite() {
    let montant = getMontant();
    let duree = getDuree();
    let taux = getTaux() / 100 / 12; // Convert annual interest rate to monthly and percentage to decimal
    let denominator = Math.pow(1 + taux, -duree * 12);
    let mensualite = (montant * taux) / (1 - denominator);

    return mensualite.toFixed(2);
}

function calculInterets() {
    let interet = (getMontant() * getTaux()/100) / dureeMois;
    return interet.toFixed(2)
}

function fillMois(){
    let view = "";
    for(let mois = 1; mois <= dureeMois; mois++){
     let modifiedTemplate = defaultTemplate.replace('{{value}}',mois);
        view += modifiedTemplate;
    }
    return view;    
}

function fillMensualite(){
    let view = "";
    let mensualiteArrondi = calculMensualite();
    for(let mois = 1; mois <= dureeMois; mois++){
     let modifiedTemplate = defaultTemplate.replace('{{value}}',mensualiteArrondi);
        view += modifiedTemplate;
    }
    return view;    
}
function fillInterets(){
    let view = "";
    for (let mois = 1; mois <= dureeMois; mois++) {
    let interets = calculInterets();

        let modifiedTemplate = defaultTemplate.replace('{{value}}',interets);
        view += modifiedTemplate;
    }
    return view;
}

function fillAmorti(){
    let view = "";
    let Amorti =  calculMensualite() - calculInterets();
    let capitalAmorti,amorti;
    let montantRestant = montant
    for (let mois = 1; mois <= dureeMois; mois++) {

capitalAmorti = mois*Amorti;
amorti = capitalAmorti.toFixed(2)
let modifiedTemplate = defaultTemplate.replace('{{value}}',amorti);
view += modifiedTemplate;
    }
return view;
}

function fillRestant() {
    let view = "";
    let Amorti =  calculMensualite() - calculInterets();
    let capital=getMontant();
    let montantRestant = capital;
    for (let mois = 1; mois <= dureeMois; mois++) {

capitalAmorti = mois*Amorti;
montantRestant =getMontant()- capitalAmorti;
let modifiedTemplate = defaultTemplate.replace('{{value}}',montantRestant.toFixed(2));
view += modifiedTemplate;
    }
return view;

}


function updateMois() {
    ulmois.innerHTML = "";
    ulmois.insertAdjacentHTML("afterbegin", fillMois());
}
function updateMensualite() {
    ulmens.innerHTML = "";
    ulmens.insertAdjacentHTML("afterbegin", fillMensualite());
}
function updateInterets() {
    ulint.innerHTML = "";
    ulint.insertAdjacentHTML("afterbegin", fillInterets());
}

function updateAmorti() {
    ulamorti.innerHTML = "";
    ulamorti.insertAdjacentHTML("afterbegin", fillAmorti());
}

function updateRestant(){
    ulrestant.innerHTML = "";
    ulrestant.insertAdjacentHTML("afterbegin", fillRestant());
}
function validateInputs() {
    let montant = getMontant();
    let duree = getDuree();
    let taux = getTaux();
    if (montant <= 0 || isNaN(montant) || duree <= 0 || isNaN(duree) || taux < 0 || isNaN(taux)) {
        alert("Veuillez entrer des nombres valides (supérieurs à 0).");
        return false;
    }

    return true;
}


function lancerSimu(){
    if (!validateInputs()) {
        return;
    }
    dureeMois = getDuree()*12;
    interets = calculInterets();
    mensualite = calculMensualite();
    montant = getMontant();
    updateMois();
    updateMensualite();
    updateInterets();
    updateAmorti();
    updateRestant();
}

bouton.addEventListener("click",lancerSimu)


