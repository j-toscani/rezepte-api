# rezepte-api

This is an API created for training purposes. It uses Typescript, Node, Express and Mongoose. The main goal was to create a small Api that handles Recipes and where to find them. It uses a modularized structure so that parts of it can be reused for bigger projects.

## MVP

- [x] Create a database with distict routes and actions to `create`, `update`, `read` and `delete` Sources, Recipes and Locations
  - [x] Each recipe can be found in a source (Website, Magazine (with issues) or Book)
  - [x] Each Source can be found in a location (Physical place)
  - [x] All Sources are accumulated under there own `router`
  - [x] Add a simple password + email account

## EXTRAS

- [ ] create tests to ensure functionality
- [ ] implement a unified response handler

# Set-Up

### To connect your database to your App, create a .env file and create the following variables:

```
PORT=<port of your server>
DB_URL=<link to your DB>
SECRET=<long string you use for jwt authentication>
```

If you are not familliar with JWT-Authentication please stat here https://jwt.io/ . If you find security issues in this projecvt feel free to create an Issue.

### Use the following commands in developement:

```
// install dependencies
npm install

// start typescript watch mode to create js files
npm run dev:watch

// start nodemon
npm run dev:start
```

### To start your project for use with a frontend use

```
// install dependencies
npm install

// build js files
npm run build

// start nodemon
npm run start
```
