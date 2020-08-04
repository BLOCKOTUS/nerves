// @flow
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

// fixtures and mock
const user = {id: 'dani420'};
const getUser = () => user;


// type Invoke = {
//     channelId: string,
//     contractName: string,
//     keepAlive: boolean,
//     transactionName: string,
//     transactionArgs: {}
// }

// type Query = {
//     channelId: string,
//     contractName: string,
//     keepAlive: boolean,
//     queryName: string,
// }

// type User = {
//     id: string
// }


const ccpPath = path.resolve(__dirname, '..', 'network', 'organizations', 'peerOrganizations', 'org1.blockotus.com', 'connection-org1.json');
console.log(ccpPath);
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const getWallet = async () => {
    const walletPath = path.resolve(__dirname, '..', 'admins', 'wallet');
    console.log('1abc')
    // get wallet
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log('2abc')
    // get admin 
    // FIXTURE - must not be part of RC
    const adminIdentity = await wallet.get('admin');
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');
    console.log('3abc')

    // check if user is registered, register if not
    var identity = await wallet.get(user.id);
    console.log('4abc')
    if (!identity) await registerUser({adminUser: adminUser, user: user})
    console.log('5abc')

    return wallet;
}

const invokeTransaction = async ({
    channelId = 'blockotus',
    contractName = 'fabidentity',
    keepAlive = false,
    transactionName,
    transactionArgs
}) => {
    // get the wallet and gateway
    var wallet = await getWallet();
    var gateway = new Gateway();

    // get network and smartContract
    await gateway.connect(ccp, { wallet, identity: getUser().id, discovery: { enabled: true, asLocalhost: true } });
    var network = network || await gateway.getNetwork(channelId);
    var contract = contract || network.getContract(contractName);

    // submit the transaction
    const transaction = await contract.submitTransaction(transactionName, ...Object.values(transactionArgs));
    if(!keepAlive) await gateway.disconnect();

    return transaction;
}

const queryTransaction = async ({
    channelId = 'blockotus',
    contractName = 'fabidentity',
    keepAlive = false,
    queryName
}) => {
    // get the wallet and gateway
    var wallet = wallet || await getWallet();
    var gateway = gateway || new Gateway();

    // get network and smartContract
    await gateway.connect(ccp, { wallet, identity: getUser().id, discovery: { enabled: true, asLocalhost: true } });
    var network = network || await gateway.getNetwork(channelId);
    var contract = contract || network.getContract(contractName);

    // submit the transaction
    const transaction = await contract.evaluateTransaction(queryName);
    if(!keepAlive) await gateway.disconnect();

    return transaction;
}

const registerUser = async ({
    adminUser,
    user
}) => {
    // Create a new CA client for interacting with the CA.
    const caURL = ccp.certificateAuthorities['ca.org1.blockotus.com'].url;
    const ca = new FabricCAServices(caURL);

    console.log('1sss');

    const secret = await ca.register({
        enrollmentID: user.id,
        role: 'client'
    }, adminUser);
    console.log('2sss');

    const enrollment = await ca.enroll({
        enrollmentID: user.id,
        enrollmentSecret: secret
    });
    console.log('3sss');

    const x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };
    console.log('4sss');

    var wallet = wallet || await getWallet();
    return await wallet.put(user, x509Identity);
}

const test = async () => {
    var transactionName = "createIdentity";
    var transactionArgs = {
        "registryDate": '2020/04/01 04:20:00 GMT+1',
        "nationalId": '12*8*5*3*N',
        "nation": 'Spain',
        "birthDate": '1992/01/01 08:20:00 GMT+1',
        "name": 'Daniel',
        "surname": 'Dani'
    }

    return await invokeTransaction({
        channelId: "blockotus",
        contractName: "fabidentity",
        keepAlive: false,
        transactionName, 
        transactionArgs
    });
}
test();
module.exports = { test }