TODO: Readme

# Primeros Pasos

## Requirements
The following applications are required to execute this project: 

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/) version 8.9 or higher (10.22.0+ recommended).

## Instalación

To start, you can clone this project using HTTPS: <br>

```sh
$ git clone https://github.com/Lancerider/money-graph.git
```

To install the dependencies for this project (defined in `package.json` file) you should run the following commands: 

```sh
$ cd money-graph # To access the project folder
$ npm install # To install all dependencies
$ npm run dev # To initialize the local server
```

You can verify that the application server is running by navigating to the default address
```sh
localhost:3000
# OR
127.0.0.1:3000
```

## Tests
You can run jest tests
```sh
npm run test
```

You can run jest tests with Coverage Analisys
```sh
npm run test:coverage
```

## Build Setup

```bash
# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## See current DEMO
You could find a live demo of this project current development stage in this [heroku app](https://metricks.herokuapp.com/).

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
