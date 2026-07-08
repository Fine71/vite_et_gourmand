// Implémenter le JS de ma page d'inscription

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputGSM = document.getElementById("GsmInput");
const inputMail = document.getElementById("EmailInput");
const inputAdresse = document.getElementById("AdresseInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const inputCommandes = document.getElementById("CommandesInput");
const btnValidation = document.getElementById("btn-validation-inscription");

inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputGSM.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputAdresse.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);
inputCommandes.addEventListener("keyup", validateForm);

//Fonction qui valide le formulaire d'inscription
function validateForm() {
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const gsmOK = validatePhone(inputGSM);
    const mailOK = validateEmail(inputMail);
    const adresseOK = validateRequired(inputAdresse);
    const passwordOK = validatePassword(inputPassword);
    const passwordConfirmOK = validateConfirmationPassword(inputPassword, inputValidatePassword);

    if(nomOK && prenomOK && gsmOK && mailOK && adresseOK && passwordOK && passwordConfirmOK) {
        btnValidation.disabled = false;
    } 
    else {
        btnValidation.disabled = true;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if(inputPwd.value === inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } 
    else {
        inputConfirmPwd.classList.remove("is-valid");
        inputConfirmPwd.classList.add("is-invalid");
        return false;
    }
}

function validatePassword(input) {
    // définir une regex pour valider le mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{10,}$/; // Minimum 10 characters, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
    const passwordUser = input.value;

    if(passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateEmail(input) {
    // définir une regex pour valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format de base pour une adresse email
    const emailUser = input.value;

    if(emailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validatePhone(input) {
    // définir une regex pour valider le numéro de téléphone
    const phoneRegex = /^\d{10}$/; // 10 chiffres pour un numéro de téléphone
    const phoneUser = input.value;

    if(phoneUser.match(phoneRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateAdresse(input) {
    // définir une regex pour valider l'adresse
    const adresseRegex = /^[a-zA-Z0-9\s,'-]{3,}$/; // Minimum 3 caractères, peut contenir des lettres, des chiffres, des espaces et certains caractères spéciaux
    const adresseUser = input.value;

    if(adresseUser.match(adresseRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateCommandes(input) {
    // définir une regex pour valider les commandes
    const commandesRegex = /^[a-zA-Z0-9\s,'-]{3,}$/; // Minimum 3 caractères, peut contenir des lettres, des chiffres, des espaces et certains caractères spéciaux
    const commandesUser = input.value;

    if(commandesUser.match(commandesRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRequired(input) {
    if(input.value != '') {
        //c'est OK
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } 
    else {
        //c'est pas OK
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}