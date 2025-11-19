document.addEventListener('DOMContentLoaded', function () {
    // Récupère l'utilisateur connecté
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users')) || {};
    let profileContent = document.getElementById('profileContent');
    let notConnectedAlert = document.getElementById('notConnectedAlert');
    let preferencesForm = document.getElementById('preferencesForm');
    let preferredPlateauSelect = document.getElementById('preferredPlateau');
    let preferredDimensionSelect = document.getElementById('preferredDimension');

    if ((currentUser == null) || users[currentUser.email == null]) {
        console.log("Remove connecté alert");
        if(notConnectedAlert != null){
            notConnectedAlert.classList.remove('d-none');
            return;
        }
    }
    afficherProfil(currentUser, users);
    // Affiche les informations de l'utilisateur
    profileContent.classList.remove('d-none');
    document.getElementById('userEmail').textContent = currentUser.email;

   

      // Charge les préférences existantes
    let user = users[currentUser.email];
    if (user.preferences) {
        if (user.preferences.plateau) {
            preferredPlateauSelect.value = user.preferences.plateau;
        }
        if (user.preferences.dimension) {
            preferredDimensionSelect.value = user.preferences.dimension;
        }
    }

     //Création de la liste déroulante Plateau préféré
    creerChoixMemory(tableauCorrespondanceMemoryImage,preferredPlateauSelect);

    preferredPlateauSelect.addEventListener("change",afficherChoixPlateau);
    
    // Gestion de l'envoi du formulaire de préférences
    preferencesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let plateau = preferredPlateauSelect.value;
        let dimension = preferredDimensionSelect.value;

        // Met à jour les préférences de l'utilisateur
        if (!user.preferences) {
            user.preferences = {};
        }
        user.preferences.plateau = plateau;
        user.preferences.dimension = dimension;

        // Sauvegarde dans localStorage
        users[currentUser.email] = user;
        localStorage.setItem('users', JSON.stringify(users));

        alert("Vos préférences ont été enregistrées !");
    });

    // Fonction pour afficher les infos du profil
    function afficherProfil(currentUser, users) {
        const user = users[currentUser.email];
        document.getElementById('userEmail').textContent = currentUser.email;

        // Affiche les préférences existantes
        if (user.preferences) {
            if (user.preferences.plateau) {
                document.getElementById('preferredPlateau').value = user.preferences.plateau;
            }
            if (user.preferences.dimension) {
                document.getElementById('preferredDimension').value = user.preferences.dimension;
            }
        }

        // Affiche les 10 meilleurs scores
        afficherMeilleursScores(user.scores);

        // Affiche les 5 dernières parties
        afficherDernieresParties(user.scores);
    }

    function afficherMeilleursScores(scores) {
        // Affiche les 10 meilleurs scores
        let bestScores = document.getElementById('bestScores');
        bestScores.innerHTML = '';
        if (!scores || scores.length === 0) {
            bestScores.innerHTML = '<tr><td colspan="4" class="text-center">Aucun score enregistré.</td></tr>';
            return;
        }


        // Trie les scores par ordre décroissant et prend les 10 premiers
        const sortedScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);

        sortedScores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.plateau || 'Inconnu'}</td>
                <td>${score.dimension || 'Inconnu'}</td>
                <td>${score.score}</td>
                 td>${score.moves}</td>
                <td>${new Date(score.date).toLocaleDateString()}</td>
            `;
            bestScores.appendChild(row);
        });
    }

    // Affiche les 5 dernières parties
    function afficherDernieresParties(scores) {
        const lastGames = document.getElementById('lastGames');
        lastGames.innerHTML = '';

        if (!scores || scores.length === 0) {
            lastGames.innerHTML = '<tr><td colspan="4" class="text-center">Aucune partie enregistrée.</td></tr>';
            return;
        }

        // Trie les scores par date décroissante et prend les 5 premiers
        const sortedGames = [...scores].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        sortedGames.forEach(game => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${game.plateau || 'Inconnu'}</td>
                <td>${game.dimension || 'Inconnu'}</td>
                <td>${game.score}</td>
                <td>${game.moves}</td>
                <td>${new Date(game.date).toLocaleDateString()}</td>
            `;
            lastGames.appendChild(row);
        });
    }

    function creerChoixMemory(tableau,preferredPlateauSelect){
       
    
        for (const val of tableauCorrespondanceMemoryImage)
        {
            var option = document.createElement("option");
            option.value = val.nom;
            option.text = val.nomAffiche;
            if(user.preferences.plateau==val.nom){
                option.selected="selected";
            }
            preferredPlateauSelect.appendChild(option);
        }
    
    }

    function afficherChoixPlateau(){
        let optionValue=preferredPlateauSelect.options[preferredPlateauSelect.selectedIndex].value;
        let optionTexte=preferredPlateauSelect.options[preferredPlateauSelect.selectedIndex].text;
        let image=document.createElement("img");
        const textePlateauDefaut = "Choisir un plateau...";
        console.log("Option Texte="+optionTexte);
        console.log("Option value="+optionValue);

        if(optionTexte != textePlateauDefaut){
           
            for (const val of tableauCorrespondanceMemoryImage)
            {
                if(val.nom==optionValue){
                    image.src=val.img;
                    break;
                }
            }
            
            image.alt=optionTexte;
            image.title=optionTexte;
            image.className="img-memory-presentation";
        }
        //Suppression de l'image en cours si ell est présente
        if(document.querySelector('.img-memory-presentation')!=null){
            document.querySelector('.img-memory-presentation').remove();
        }
        if(optionTexte != textePlateauDefaut){
            document.getElementById("zoneImage").appendChild(image);
        }
    }
});