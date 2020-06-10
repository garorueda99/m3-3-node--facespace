'use strict';

const signstatus = document.body.querySelector('#sign');
if (signstatus.innerText.includes('Howdy')) {
  const friendsArray = document.body.querySelectorAll('.mainMenu');
  friendsArray.forEach((element) =>
    element.addEventListener('mouseenter', menuRemove)
  );
  friendsArray.forEach((element) =>
    element.addEventListener('mouseleave', menu)
  );

  friendsArray.forEach((element) =>
    element.addEventListener('click', deleteMyfriend)
  );

  function menuRemove() {
    this.innerText = `Remove ${this.innerText}`;
  }

  function menu() {
    this.innerText = this.innerText.replace('Remove ', '');
  }

  function deleteMyfriend() {
    const form = document.createElement('form');
    const friend = document.createElement('input');
    const user = document.createElement('input');
    form.method = 'get';
    form.action = '/removefriend';
    user.type = 'hidden';
    user.id = 'userID';
    user.name = 'userID';
    friend.id = 'friendID';
    friend.name = 'friendID';
    user.value = this.dataset.user;
    friend.value = this.dataset.id;
    friend.type = 'hidden';
    form.appendChild(friend);
    form.appendChild(user);
    document.body.appendChild(form);
    form.submit();
  }
}
