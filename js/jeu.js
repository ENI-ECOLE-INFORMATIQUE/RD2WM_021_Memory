// Récupère l'utilisateur connecté depuis localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let users = JSON.parse(localStorage.getItem('users')) || {};
let scores = JSON.parse(localStorage.getItem('scores')) || {};
let gameBoard = document.getElementById('gameBoard');
let scoreDisplay = document.getElementById('scoreDisplay');
let startGameBtn = document.getElementById('startGame');
let plateauSelect = document.getElementById('plateau');
let dimensionSelect = document.getElementById('dimension');


if (currentUser && users[currentUser.email]?.preferences) {
        let preferences = users[currentUser.email].preferences;
        console.log("Preferences : plateau = "+preferences.plateau);
        console.log("Preferences : dimension = "+preferences.dimension);
        if (preferences.plateau) {
            document.getElementById('plateau').value = preferences.plateau;
        }
        if (preferences.dimension) {
            document.getElementById('dimension').value = preferences.dimension;
        }
}


// Initialisation du jeu
function initGame() {
    if (!currentUser) {
        alert("Veuillez vous connecter pour jouer.");
        window.location.href = "inscription.html";
        return;
    }

    let plateau = plateauSelect.value;
    let dimension = dimensionSelect.value;
    let cards = [];

    console.log("Plateau selectionne = "+plateau);
    console.log("dimension selectionne = "+dimension);
    
    // Génère les cartes selon le plateau choisi
    switch(plateau) {
        case 'animaux':
            cards = ['chien', 'chat', 'lapin', 'souris', 'cheval', 'vache', 'coq', 'canard'];
            break;
        case 'legumes':
            cards = ['carotte', 'tomate', 'salade', 'oignon', 'pomme de terre', 'courgette', 'poivron', 'aubergine'];
            break;
        case 'scrabble':
            cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            break;
    }

    // Double les cartes pour les paires
    cards = [...cards, ...cards];

    // Mélange les cartes
    cards.sort(() => 0.5 - Math.random());

    // Crée le plateau
    gameBoard.innerHTML = '';
    console.log('dimension:'+dimension)
    // Séparer la chaîne en deux parties
    let [colonnes, lignes] = dimension.split('x').map(Number);

    // Résultat :
    console.log("Colonnes :", colonnes); // 4
    console.log("Lignes :", lignes);      // 3
    
    let rows = parseInt(lignes);
    let cols = colonnes;
    let cardIndex = 0;

    for (let i = 0; i < rows; i++) {
        let row = document.createElement('div');
        row.className = 'row mb-2';
        for (let j = 0; j < cols; j++) {
            let col = document.createElement('div');
            col.className = 'col-3 col-md-2 p-1';
            let card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = cards[cardIndex];
            card.innerHTML = `
                <div class="card-body bg-secondary text-white d-flex justify-content-center align-items-center" style="height: 80px;">
                    ?
                </div>
            `;
            card.addEventListener('click', flipCard);
            col.appendChild(card);
            row.appendChild(col);
            cardIndex++;
        }
        gameBoard.appendChild(row);
    }

    // Initialise le score
    scoreDisplay.innerHTML = `<h3>Score: 0</h3>`;
}

// Retourne une carte
function flipCard() {
    // Logique pour retourner la carte, vérifier les paires, etc.
    // À compléter selon tes besoins
}

// Démarre le jeu
startGameBtn.addEventListener('click', initGame);

// Exemple : quand la partie est terminée
function finDePartie(score) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const plateau = document.getElementById('plateau').value;
    const dimension = document.getElementById('dimension').value;

    if (currentUser && users[currentUser.email]) {
        const newScore = {
            plateau: plateau,
            dimension: dimension,
            score: score,
            date: new Date().toISOString()
        };

        if (!users[currentUser.email].scores) {
            users[currentUser.email].scores = [];
        }

        users[currentUser.email].scores.push(newScore);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Votre score a été enregistré !");
    }
}
