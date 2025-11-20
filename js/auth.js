const inputsValidity = {
  user: false,
  email: false,
  password: false, 
  passwordConfirmation: false
}

const form = document.querySelector("form");
const container = document.querySelector(".container");
let isAnimating = false;

// Gestion de l'inscription (déjà présente)
document.getElementById('inscriptionForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let nom = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || {};
    console.log("users="+users);
    if (users[email]) {
        alert("Un utilisateur avec cet email existe déjà.");
        return;
    }

    handleForm(e);
    //Hache le mot de passe
    const hashedPassword = await hashPassword(password);

    //Stocke le mot de passe haché
    users[email] = {
        nom: nom,
        password: hashedPassword, //mot de passe haché
        scores: [],
        preferences: {}
    };

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ email: email }));

    alert("Inscription réussie !");
    window.location.href = "profil.html";
});

function handleForm(e){
  e.preventDefault()

  const keys = Object.keys(inputsValidity)
  const failedInputs = keys.filter(key => !inputsValidity[key])
  
  if(failedInputs.length && !isAnimating) {
    isAnimating = true;
    container.classList.add("shake");

    setTimeout(() =>{
      container.classList.remove("shake")
      isAnimating = false;
    }, 400)

    failedInputs.forEach(input => {
      const index = keys.indexOf(input)
      showValidation({index: index, validation: false})
    })
  }
  else {
    alert("Données envoyées avec succès.")
    let nom = userInput.value;
    let email = mailInput.value;
    let motDePasse = pswInput.value;
    enregistrerUtilisateurLocalStorage(nom,email,motDePasse);
    document.location.href="./profil.html";
  }

}


function showValidation({index, validation}) {
  if(validation){
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "images/check.svg";
    if(validationTexts[index])  validationTexts[index].style.display = "none";
  } 
  else {
    validationIcons[index].style.display = "inline";
    validationIcons[index].src = "images/error.svg";
    if(validationTexts[index]) validationTexts[index].style.display = "block";
  }
}


const validationIcons = document.querySelectorAll(".icone-verif");
const validationTexts = document.querySelectorAll(".error-msg");

const userInput = document.querySelector(".input-group:nth-child(1) input")
if(userInput!=null){
    userInput.addEventListener("blur", userValidation)
    userInput.addEventListener("input", userValidation)
}

function userValidation(){
  if(userInput.value.length >= 3) {
    showValidation({index: 0, validation: true})
    inputsValidity.user = true;
  }
  else {
    showValidation({index: 0, validation: false})
    inputsValidity.user = false;
  }
}

const mailInput = document.querySelector(".input-group:nth-child(2) input")
if(mailInput!=null){
    mailInput.addEventListener("blur", mailValidation)
    mailInput.addEventListener("input", mailValidation)
}

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mailValidation(){
  if(regexEmail.test(mailInput.value)){
    showValidation({index: 1, validation: true})
    inputsValidity.email = true;

  }
  else {
    showValidation({index: 1, validation: false})
    inputsValidity.email = false;

  }
}

const pswInput = document.querySelector(".input-group:nth-child(3) input")
if(pswInput!=null){
    pswInput.addEventListener("blur", passwordValidation)
    pswInput.addEventListener("input", passwordValidation)
}

const passwordVerification = {
  length: false,
  symbol: false,
  number: false
}

const regexList = {
  symbol: /[^a-zA-Z0-9\s]/,
  number: /[0-9]/
}

let passwordValue;

function passwordValidation(){
  passwordValue = pswInput.value;
  let validationResult = 0;

  for(const prop in passwordVerification){
    
    if(prop === "length") {
      if(passwordValue.length < 6) {
        passwordVerification.length = false;
      }
      else {
        passwordVerification.length = true;
        validationResult++;
      }
      continue;
    }

    if(regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } 
    else {
      passwordVerification[prop] = false;
    }
  }

  if(validationResult !== 3) {
    showValidation({index: 2, validation: false})
    inputsValidity.password = false;

  }
  else {
    showValidation({index: 2, validation: true})
    inputsValidity.password = true;

  }

  passwordStrength()
}

const lines = document.querySelectorAll(".lines div")

function passwordStrength(){
  const passwordLength = pswInput.value.length;
  
  if(!passwordLength) {
    addLines(0)
  }
  else if(passwordLength > 9 && passwordVerification.symbol && passwordVerification.number) {
    addLines(3)
  }
  else if(passwordLength > 6 && passwordVerification.symbol || passwordVerification.number) {
    addLines(2)
  }
  else {
    addLines(1)
  }

  function addLines(numberOfLines) {
    lines.forEach((el, index) => {
      if(index < numberOfLines) {
        el.style.display = "block"
      }
      else {
        el.style.display = "none"
      }
    })
  }

  if(validationIcons[3].style.display === "inline") {
    confirmPassword()
  }
}


const confirmInput = document.querySelector(".input-group:nth-child(4) input")
if(confirmInput!=null){
    confirmInput.addEventListener("blur", confirmPassword)
    confirmInput.addEventListener("input", confirmPassword)
}

function confirmPassword(){
  const confirmedValue = confirmInput.value;

  if(!confirmedValue && !passwordValue) {
    validationIcons[3].style.display = "none";
  }
  else if(confirmedValue !== passwordValue) {
    showValidation({index: 3, validation: false})
    inputsValidity.passwordConfirmation = false;
  }
  else {
    showValidation({index: 3, validation: true})
    inputsValidity.passwordConfirmation = true;
  }
}

// Gestion de la connexion
document.getElementById('connexionForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || {};


    if (!users[email]) {
        alert("Email ou mot de passe incorrect.");
        return;
    }

    // // Hache le mot de passe saisi
    // const hashedPassword = await hashPassword(password);

    // // Compare avec le mot de passe haché stocké
    // if (users[email].password !== hashedPassword) {
    //     alert("Email ou mot de passe incorrect.");
    //     return;
    // }

    const isValid = await verifyPassword(email, password);
    if (!isValid) {
        alert("Email ou mot de passe incorrect.");
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ email: email }));
    alert("Connexion réussie !");
    window.location.href = "profil.html";
});


document.addEventListener('DOMContentLoaded', function() {
    // Récupère l'utilisateur connecté
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let lienInscription = document.getElementById('lienInscription');
    let lienConnexion = document.getElementById('lienConnexion');
    let lienProfil = document.getElementById('lienProfil');
    let boutonDeconnexion = document.getElementById('deconnexion');

    if (currentUser) {
        // Masque les liens "S'inscrire" et "Se connecter"
        if (lienInscription) lienInscription.classList.add('d-none');
        if (lienConnexion) lienConnexion.classList.add('d-none');
        // Affiche le bouton "Se déconnecter"
        if (boutonDeconnexion) boutonDeconnexion.classList.remove('d-none');
    } else {
        // Affiche les liens "S'inscrire" et "Se connecter"
        if (lienInscription) lienInscription.classList.remove('d-none');
        if (lienConnexion) lienConnexion.classList.remove('d-none');
        // Masque le bouton "Se déconnecter"
        if (boutonDeconnexion) boutonDeconnexion.classList.add('d-none');
    }

    // Gestion de la déconnexion
    if (boutonDeconnexion) {
        boutonDeconnexion.addEventListener('click', function() {
            console.log("Déconnecté");
            localStorage.removeItem('currentUser');
            alert("Vous êtes déconnecté.");
            window.location.href = "index.html";
        });
    }
});

