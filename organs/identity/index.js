const { user1, user2, user3 } = require('../../fixtures/keypairs');

const identity = require('../../../organs/identity/fabric/identity/javascript');

// Should create an Identity
const create = async (data) => {
    const transaction = await identity.createIdentity(data);
    return transaction ? {success: true} : {sucess: false}
}

// Should return the user Identity object
const get = (data) => {
    const transaction 
        = data.id 
        ? await identity.queryIdentity(data.id) 
        : await identity.queryIdentity();

    return transaction ? {success: true} : {sucess: false}
}

// Should return the Verificators assigned to a user when registering
// Create them if no verificators assigned, require with Admin privileges
const getVerificators = (data) => {
    return new Promise((resolve, reject) => {
        // 1. get verificators 
        resolve({
            data: [
                {
                    certificate: user1.publicKey,
                    id: 1,
                },
                {
                    certificate: user2.publicKey,
                    id: 2,
                },
                {
                    certificate: user3.publicKey,
                    id: 3,
                }
            ],
            success: true,
        })
    })
}

module.exports = {
    get,
    getVerificators,
    create
}