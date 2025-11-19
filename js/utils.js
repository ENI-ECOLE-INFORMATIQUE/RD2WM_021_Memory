/**
 * Hache un mot de passe avec SHA-256
 * @param {string} password - Le mot de passe à hacher
 * @returns {Promise<string>} - Le mot de passe haché
 */
async function hashPassword(password) {
    // Encode le mot de passe en UTF-8
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Hache les données avec SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convertit le résultat en hexadécimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

/**
 * Vérifie si un mot de passe correspond au hash stocké
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe à vérifier
 * @returns {Promise<boolean>} - True si le mot de passe est correct
 */
async function verifyPassword(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[email]) return false;

    const hashedPassword = await hashPassword(password);
    return users[email].password === hashedPassword;
}

