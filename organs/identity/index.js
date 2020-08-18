const { user1 } = require('../../fixtures/keypairs');

const identity = require('../../../organs/identity/fabric/identity/javascript');

const post = async ({data, socket, reason}) => {
    const args = {
        nation: data.nation,
        nationalId: data.nationalId,
        encryptedData: data.encryptedData
    }

    await identity.create(args);

    socket.emit('answer', JSON.stringify({
        reason,
        answer: {success: true}
    }))
}

const get = ({data, socket, reason}) => {
    socket.emit('answer', JSON.stringify({
        reason,
        answer: {
            publicKey: user1.publicKey,
            id: 1,
        }
    }))
}

const methods = {
    post,
    get
}

const execute = ({method, data, socket, reason}) => {
    console.log({method, data, reason});
    methods[method] ? methods[method]({data, socket, reason}) : null;
}

module.exports = {
    execute
}