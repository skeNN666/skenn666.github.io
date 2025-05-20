document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginUsername = document.getElementById("login-username");
  const startScreen = document.getElementById("start-screen");

  const savedNickname = localStorage.getItem("nickname");
  if (savedNickname) {
    loginUsername.value = savedNickname;
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputUsername = loginUsername.value;

    if (inputUsername.trim()) {
      localStorage.setItem("nickname", inputUsername.trim());
      loginForm.style.display = "none";
      startScreen.style.display = "block";
    } else {
      alert("Please enter a nickname.");
    }
  });
});
