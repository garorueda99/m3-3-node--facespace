"use strict";

const express = require("express");
const morgan = require("morgan");
const { users } = require("./data/users");

let currentUser = undefined;

const home = (req, res) =>
  res.status(200).render("pages/homepage", { users, currentUser });
// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

const profilePage = (req, res) => {
  const user_ID = req.params.userID;
  if (users.find((element) => element._id === user_ID) != undefined) {
    const profile = users.find((element) => element._id === user_ID);
    const friends = users.filter((element) =>
      element.friends.includes(user_ID)
    );
    res.render("pages/profile", { profile, friends, currentUser, users });
  } else {
    res.status(404).send("I couldn't find what you're looking for.");
  }
};
const login = (req, res) => {
  if (currentUser === undefined) {
    res.status(200).render("pages/signin", { users, currentUser });
  } else {
    res.status(404).redirect("back");
  }
};

const handleName = (req, res) => {
  currentUser = users.find((element) => element.name === req.query.firstName);
  currentUser != undefined
    ? res.status(200).redirect(`/users/${currentUser._id}`)
    : res.status(404).redirect("back");
};

const handleRemoveFriend = (req, res) => {
  //delete friend from user
  users.find(
    (element) => element._id === req.query.userID
  ).friends = users
    .find((element) => element._id === req.query.userID)
    .friends.filter((element) => element != req.query.friendID);

  //delete user from friend
  users.find(
    (element) => element._id === req.query.friendID
  ).friends = users
    .find((element) => element._id === req.query.friendID)
    .friends.filter((element) => element != req.query.userID);

  res.status(200).redirect(`/users/${currentUser._id}`);
};

const handleFriendshipRequest = (req, res) => {
  //Adding request to the currentUser
  const user = users.find((element) => element._id === req.query.userID);
  "friendToBe" in user
    ? user.friendToBe.push(req.query.friendID)
    : (user.friendToBe = [req.query.friendID]);

  //Adding request to the friend
  const friend = users.find((element) => element._id === req.query.friendID);
  "friendToBe" in friend
    ? friend.friendToBe.push(req.query.userID)
    : (friend.friendToBe = [req.query.userID]);
  console.log(users);
};
// -----------------------------------------------------
// server endpoints
express()
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints
  .get("/", home)
  .get("/signin", login)
  .get("/users/:userID", profilePage)
  .get("/removefriend", handleRemoveFriend)
  .get("/requesFriendship", handleFriendshipRequest)
  .get("/getname", handleName)

  // a catchall endpoint that will send the 404 message.
  .get("*", handleFourOhFour)

  .listen(8000, () => console.log("Listening on port 8000"));
