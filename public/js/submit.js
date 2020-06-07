const form = document.body.querySelector("form");
form.addEventListener("submit", logSubmit);

function logSubmit(e) {
  e.preventDefault();
  // console.log(form);
  // users.includes((element) => element.name === form.querySelector("input").value);
  console.log(
    users.includes(
      (element) => element.name === form.querySelector("input").value
    )
  );
  // users.find((element) => element._id === user_ID
}
