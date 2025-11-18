// Gestion de l'inscription (déjà présente)
document.getElementById('inscriptionForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || {};
    console.log("users="+users);
    if (users[email]) {
        alert("Un utilisateur avec cet email existe déjà.");
        return;
    }

    users[email] = {
        password: password,
        scores: [],
        preferences: {}
    };

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ email: email }));

    alert("Inscription réussie !");
    window.location.href = "profil.html";
});

// Gestion de la connexion
document.getElementById('connexionForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[email] || users[email].password !== password) {
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

