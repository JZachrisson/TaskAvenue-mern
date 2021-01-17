# Task Avenue - Collaborative Lists :white_check_mark:

Welcome to Task Avenue! A real-time collaborative list web app created with the [MERN Stack](https://www.mongodb.com/mern-stack) and written in TypeScript.
[Check it out here!](https://taskavenue.web.app)

<img width="1440" alt="Screenshot 2021-01-17 at 11 36 57" src="https://user-images.githubusercontent.com/49671818/104838079-f1ddbe00-58b8-11eb-9f8b-f5b5cbd76d39.png">

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
### Features and User Stories implemented
* :warning: **(required):** I as a user can create to-do items, such as a grocery list.
* :warning: **(required):** I as another user can collaborate in real-time with user - so that we can (for example) edit our famnily shopping list together.
* I as a user can mark to-do items as "done", so that I can avoid clutter and focus on things that are still pending.
* I as a user can create multiple to-do lists where each list has it's unique URL that I can share with my firends - so that I could have separate to-do lists for my groceries and work related tasks.
* I as a user can be sure that my todos will be persisted so that important information is not lost when server restarts. (User can view all their lists on their profile page.)

## Technologies
Frontend is created with:
* [React](https://github.com/facebook/react) - create-react-app with TypeScript template
* [Material-UI](https://github.com/mui-org/material-ui) - React component library
* [Pusher](https://pusher.com) - Setting up realtime connection between frontend and backend

Backend is created with:
* [Express](https://github.com/expressjs/express) - Written in TypeScript
* [MongoDB](https://www.mongodb.com) - NoSQL database
* [Mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling tool
* [Pusher](https://pusher.com) - Making MongoDB a realtime database with the combination of [MongoDB Change Streams](https://docs.mongodb.com/manual/changeStreams)

## Setup

Install the dependencies, set up the proper .env-files (register a Pusher application [here](https://pusher.com)) and start the server
```
$ cd backend
$ npm install
$ npm start
```
Install the dependencies, and start the client
```
$ cd frontend
$ npm install
$ npm start
```


