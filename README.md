<p align="center"><img src="logo/horizontal.png" alt="moncrud" height="120px"></p>

[Moncrud](https://moncrud.com) is an open source tool that allows simple CRUD operations on any mongoDB database.

## Demo

Visit [moncrud.com](https://demo.moncrud.com) to see how to interact with data from a few mongoDB databases. This demo doesn't showcase how to create users or set-up connections. You can red the "Getting started" section to start working with your own databases.

## Getting Started


Moncrud makes uses of the bcrypt npm package to enable user authentication. Make sure you have installed [bcrypt's dependencies](https://www.npmjs.com/package/bcrypt#dependencies) before installing the dependencies for moncrud.

Start by cloning this repository into your local folder.

```
git clone https://github.com/sbeltran10/moncrud
```

After cloning the repository, intall moncrud's dependencies.

```
npm install
```
If you don't have Browserify, install it globally and then run the broswerify build command.

```
npm install -g browserify
npm run browserify-build
```

Start the server and open the app at http://localhost:3003.

```
npm start
```

Follow the instructions on-screen to create the admin user and then add a connection to start managing data.


## Documentation
 
See the documentation at [moncrud.com](https://moncrud.com/docs) for customization and configuration options and a detailed explanation of how to set-up your database connections.

## License

MIT Licensed. Copyright (c) Santiago Beltran 2019.

Moncrud logo by [realinfo](https://github.com/reallinfo)
