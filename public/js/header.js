const sign = document.body.querySelector('#sign');
if (window.location.pathname === '/signin') {
  sign.parentNode.removeChild(sign);
}
