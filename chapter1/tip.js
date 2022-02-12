const form = document.querySelector("form");

if (window.ethereum) {
  form.classList.add("has-eth");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!window.ethereum) {
    alert("Please install a wallet.");
  }
});
