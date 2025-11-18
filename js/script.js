console.log("script chargé");
document.addEventListener('DOMContentLoaded', function () {
    // Récupère l'utilisateur connecté
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let profileContent = document.getElementById('profileContent');
    let notConnectedAlert = document.getElementById('notConnectedAlert');

    if (!currentUser && !['index.html', 'inscription.html', 'connexion.html'].includes(window.location.pathname.split('/').pop())) {
        alert("Veuillez vous connecter pour accéder à cette page.");
        window.location.href = "connexion.html";
    }


    document.getElementById('deconnexion')?.addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        alert("Vous êtes déconnecté.");
        window.location.href = "index.html";
    });
});

