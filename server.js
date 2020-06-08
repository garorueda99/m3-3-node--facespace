'use strict';

const express = require('express');
const morgan = require('morgan');
const { users } = require('./data/users');

let currentUser = {
  userinfo: undefined,
  friends: {},
};

const home = (req, res) =>
  res.status(200).render('pages/homepage', { users, currentUser });
// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

const profilePage = (req, res) => {
  const user_ID = req.params.userID;
  if (
    true
    // parseInt(path[0]) >= 100 &&
    // parseInt(path[0]) <= 125 &&
    // path[0].length === 3
  ) {
    const profile = users.find((element) => element._id === user_ID);
    const friends = users.filter((element) =>
      element.friends.includes(user_ID)
    );
    res.render('pages/profile', { profile, friends, currentUser });
  } else {
    res.render('pages/fourOhFour', {
      title: 'I got nothing',
      path: req.originalUrl,
    });
  }
};
const login = (req, res) => {
  if (currentUser.userinfo === undefined) {
    res.status(200).render('pages/signin', { users, currentUser });
  } else {
    res.status(404).redirect('back');
  }
};

const handleName = (req, res) => {
  currentUser.userinfo = users.find(
    (element) => element.name === req.query.firstName
  );

  currentUser.userinfo != undefined
    ? res.status(200).redirect(`/users/${currentUser.userinfo._id}`)
    : res.status(404).redirect('back');
};
// -----------------------------------------------------
// server endpoints
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .get('/', home)
  .get('/signin', login)
  .get('/users/:userID', profilePage)
  .get('/getname', handleName)

  // a catchall endpoint that will send the 404 message.
  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'));
