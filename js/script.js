console.log("script chargé");

const tableauCorrespondanceMemoryImage = [
    {nom:"legumes",nomAffiche:"Légumes",img:"./images/memory-legume/memory_detail.png",extension:"svg"},
    {nom:"animaux",nomAffiche:"Animaux",img:"./images/animaux/memory_detail_animaux.png",extension:"webp"},
    {nom:"animauxAnimes",nomAffiche:"Animaux animés",img:"./images/animauxAnimes/memory_detail_animaux_animes.png",extension:"webp"},
    {nom:"animauxDomestiques",nomAffiche:"Animaux Domestiques",img:"./images/animauxdomestiques/memory_detail_animaux_domestiques.png",extension:"jpg"},
    {nom:"chiens",nomAffiche:"Chiens",img:"./images/chiens/memory_details_chiens.png",extension:"webp"},
    {nom:"dinosaures",nomAffiche:"Dinosaures",img:"./images/dinosaures/memory_detail_dinosaures.png",extension:"jpg"},
    {nom:"dinosauresAvecNom",nomAffiche:"Dinosaures avec nom",img:"./images/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png",extension:"jpg"},
    {nom:"alphabetScrabble",nomAffiche:"Lettre Scrablle",img:"./images/alphabet-scrabble/memory_detail_scrabble.png",extension:"png"}
];

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


    // document.getElementById('deconnexion')?.addEventListener('click', function () {
    //     localStorage.removeItem('currentUser');
    //     alert("Vous êtes déconnecté.");
    //     window.location.href = "index.html";
    // });
});

