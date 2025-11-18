document.addEventListener('DOMContentLoaded', function () {
    // Récupère l'utilisateur connecté
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let profileContent = document.getElementById('profileContent');
    let notConnectedAlert = document.getElementById('notConnectedAlert');

  

    if ((currentUser == null) || users[currentUser.email == null]) {
        console.log("Remove connecté alert");
        if(notConnectedAlert != null){
            notConnectedAlert.classList.remove('d-none');
            return;
        }
    }

    // Affiche les informations de l'utilisateur
    profileContent.classList.remove('d-none');
    document.getElementById('userEmail').textContent = currentUser.email;

    // Affiche les préférences
    let user = users[currentUser.email];
    if (user.preferences && user.preferences.plateau) {
        document.getElementById('preferredPlateau').textContent = user.preferences.plateau;
    }
    if (user.preferences && user.preferences.dimension) {
        document.getElementById('preferredDimension').textContent = user.preferences.dimension;
    }

    // Affiche les 10 meilleurs scores
    let bestScores = document.getElementById('bestScores');
    if (user.scores && user.scores.length > 0) {
        // Trie les scores par ordre décroissant
        let sortedScores = [...user.scores].sort((a, b) => b.score - a.score).slice(0, 10);
        sortedScores.forEach(score => {
            let row = document.createElement('tr');
            row.innerHTML = `
                        <td>${score.plateau}</td>
                        <td>${score.dimension}</td>
                        <td>${score.score}</td>
                        <td>${new Date(score.date).toLocaleDateString()}</td>
                    `;
            bestScores.appendChild(row);
        });
    } else {
        bestScores.innerHTML = '<tr><td colspan="4" class="text-center">Aucun score enregistré.</td></tr>';
    }

    // Affiche les 5 dernières parties
    let lastGames = document.getElementById('lastGames');
    if (user.scores && user.scores.length > 0) {
        // Trie les scores par date décroissante
        let sortedGames = [...user.scores].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        sortedGames.forEach(game => {
            let row = document.createElement('tr');
            row.innerHTML = `
                        <td>${game.plateau}</td>
                        <td>${game.dimension}</td>
                        <td>${game.score}</td>
                        <td>${new Date(game.date).toLocaleDateString()}</td>
                    `;
            lastGames.appendChild(row);
        });
    } else {
        lastGames.innerHTML = '<tr><td colspan="4" class="text-center">Aucune partie enregistrée.</td></tr>';
    }
});