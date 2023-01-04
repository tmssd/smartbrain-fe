# SmartBrain - frontend

Final project for "The Complete Web Developer: Zero to Mastery" course by [ZTM academy](https://zerotomastery.io/courses/coding-bootcamp/)

The backend code available at [SmartBrain - backend](https://github.com/tmssd/smartbrain-be) repo.

## Description

Web App that allows users to detect faces in pictures using Clarifai's AI API.

Utilized: ES6, React, Node.js, Express, PostgreSQL, Redis, Docker, knex, bcrypt, JWT, Prettier.

## Launch project

Clone this repo:
    
   ```bash
   git clone git@github.com:tmssd/smartbrain-fe.git
   ```

   or
 
   ```bash
   git clone https://github.com/tmssd/smartbrain-fe.git
   ```

Conventional way:

```bash
npm install && npm start
```

OR

Dockerized version:

+ for development version

  ```bash
  docker-compose -f docker-compose.dev.yml up --build
  ```

+ for production version

  ```bash
  docker-compose -f docker-compose.prod.yml up --build
  ``` 

The project will availbale at `localhost:3001`
