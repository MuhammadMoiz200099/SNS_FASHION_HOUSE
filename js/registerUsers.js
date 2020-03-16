// checking the password is correct aur not
(function() {
  $("#reg-con-pass").on("keyup", function() {
    if ($("#reg-pass").val() == $("#reg-con-pass").val()) {
      $("#validate-reg-form2")
        .html("Password match")
        .css({ color: "green", "font-size": "12px", "font-weight": "600" });
    } else
      $("#validate-reg-form2")
        .html("Password does not match")
        .css({ color: "red", "font-size": "12px", "font-weight": "600" });
  });
})();

const fireAuth = firebase.auth();

const registerUser = () => {
  var email = document.getElementById("reg-username");
  var password = document.getElementById("reg-pass");
  var con_password = document.getElementById("reg-con-pass");

  if (password.value === con_password.value) {
    const promise = fireAuth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.catch(e => snackBar(e));
  }

  clearInput();
  snackBar("User Created Successfully");
};

const loginUser = () => {
  var email = document.getElementById("reg-username");
  var password = document.getElementById("reg-pass");

  const promise = fireAuth.signInWithEmailAndPassword(
    email.value,
    password.value
  );

  promise.then((e) => {
    localStorage.setItem('currentUser', JSON.stringify({email: e.user.email}))
  })
  promise.catch(e => snackBar(e));

  snackBar("Successfully Signed In");
  clearInput();
};

const logoutUser = () => {
  fireAuth.signOut();
  snackBar("Successfully Logout");
};

const clearInput = () => {
  document.getElementById("reg-username").value = "";
  document.getElementById("reg-pass").value = "";
  document.getElementById("reg-con-pass").value = "";
};

/*-------------------
	snackBar
--------------------- */

const snackBar = msg => {
  $("#snackbar")[0].innerHTML =
    msg +
    `<i class="ti-close" style="font-size: 12px;margin-left:15px" onclick="closeSnackBar()"></i>`;
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function() {
    x.className = x.className.replace("show", "");
  }, 1500);
};

const closeSnackBar = () => {
  var x = document.getElementById("snackbar");
  x.className = "";
};

const updateCart = () => {
  window.location.reload();
};
