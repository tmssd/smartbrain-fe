# SmartBrain - frontend

Final project for "The Complete Web Developer: Zero to Mastery" course by [ZTM academy](https://zerotomastery.io/courses/coding-bootcamp/)

The backend code available at [smartbrain-be](https://github.com/tmssd/smartbrain-be) repo.

## Description

Web App that allows users to detect faces in pictures using Clarifai's AI API.

Utilized: ES6, React, Node.js, Express, PostgreSQL, Redis, Docker, knex, bcrypt, JWT, Prettier.

## Setup the app

1. Clone this repo and `cd` to the project dir

    ```bash
    git clone git@github.com:tmssd/smartbrain-fe.git && cd smartbrain-fe
    ```

    or

    ```bash
    git clone https://github.com/tmssd/smartbrain-fe.git && cd smartbrain-fe
    ```

2. Launch the app

    Conventional way:

    ```bash
    npm install && npm start
    ```

    OR

    Dockerized version:

    + for development version

        for the first setup phase run:

        ```bash
        docker-compose -f docker-compose.dev.yml up --build
        ```

        otherwise run:

        ```bash
        docker-compose -f docker-compose.dev.yml up
        ```

    + for production version

        for the first setup phase run:

        ```bash
        docker-compose -f docker-compose.prod.yml up --build
        ```

        otherwise run:

        ```bash
        docker-compose -f docker-compose.prod.yml up
        ```

    The app now availbale at `localhost:3001`
