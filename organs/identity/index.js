const { user1 } = require('../../fixtures/keypairs');

const identity = require('../../../identity/fabric/fabidentity/javascript');

const execute = ({method, data, socket, reason}) => {
    socket.emit('answer', JSON.stringify({
        reason,
        answer: {
            publicKey: user1.publicKey,
            id: 1,
        }
    }))
}

module.exports = {
    execute
}