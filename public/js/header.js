const sign = document.body.querySelector("#signin");
if (window.location.pathname === "/signin") {
  sign.parentNode.removeChild(sign);
}
