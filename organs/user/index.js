// Should bootsrap what is needed for a new user
// Return a wallet file
// Require admin priviledes
const create = ({username, password}) => {
    // 1a. check for username availability (contract transaction A)
    // 2. create wallet for username
    // 3a. add {id:{username, registryDate, publicKey}} in chain state (contract transaction A)
    // 3b. add index on username
    // 4. return wallet file
}


module.exports = {
    create
}