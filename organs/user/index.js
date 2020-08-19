// Should bootsrap what is needed for a new user
// Return a wallet file
// Require admin priviledes
const create = ({username, password}) => {
    // 1a. check for username availability (contract transaction A)
    // 1b. create challenge from username/password with publicKey
    // 1c. add {username:{registryDate, challenge, publicKey}} in chain state (contract transaction A)
    // 2. create wallet for username
    // 3. return wallet file
}

module.exports = {
    create
}