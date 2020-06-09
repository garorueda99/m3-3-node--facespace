const friendsArray = document.body.querySelectorAll(".mainMenu");
friendsArray.forEach((element) =>
  element.addEventListener("mouseenter", menuRemove)
);
friendsArray.forEach((element) => element.addEventListener("mouseleave", menu));

function menuRemove() {
  this.innerText = `Remove ${this.innerText}`;
}

function menu() {
  this.innerText = this.innerText.replace("Remove ", "");
}
