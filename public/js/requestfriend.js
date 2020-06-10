"use strict";

const button = document.body.querySelector("button");
const currentUsetId = document.body.querySelector("#sign").dataset.user;
const friendToBeId = document.body.querySelector("#profile").dataset.profile;
button.addEventListener("click", requestFriendship);

function requestFriendship() {
  const form = document.createElement("form");
  const friend = document.createElement("input");
  const user = document.createElement("input");
  form.method = "get";
  form.action = "/requesFriendship";
  user.type = "hidden";
  user.id = "userID";
  user.name = "userID";
  friend.id = "friendID";
  friend.name = "friendID";
  user.value = currentUsetId;
  friend.value = friendToBeId;
  friend.type = "hidden";
  form.appendChild(friend);
  form.appendChild(user);
  document.body.appendChild(form);
  form.submit();
}
