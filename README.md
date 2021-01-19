# BLOCKOTUS Nerves

## Abstract
Simple HTTP server, following Blockotus Open and Decentralized Standard specifications.

This repository is part of BLOCKOTUS Organism (https://github.com/BLOCKOTUS/organism).

## Usage
To run the server, executes:
```bash
$ yarn start
```

## Documentation

APIs imported from the Organs, to interact with the Network and Contracts.
```javascipt
const user = require('../organs/user/api');
const identity = require('../organs/identity/api');
const job = require('../organs/job/api');
```

### REST API

- /user
- /user/keypair
- /identity
- /job
- /job/list
- /job/complete

### How to contribute
Fork and submit a pull-request.

### How to use it for your own project
Clone or download the repository. Modify at your convenience.

In an ideal world, you will conserve the same license, and give credits to the author [@danielfebrero](https://github.com/danielfebrero).