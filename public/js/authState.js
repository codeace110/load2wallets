firebase.auth().onAuthStateChanged(user => {
  if (user) {
    var currentUser = firebase.auth().currentUser;
    var email = currentUser.email;
    var emailVerified = currentUser.emailVerified;

    if (emailVerified !== true) {
      // User Verification Box displayed
      console.log("Waiting for verification ...");
      document.getElementById("user-div").style.display = "none";
      document.getElementById("login-div").style.display = "none";
      document.getElementById("registration-div").style.display = "none";
      document.getElementById("send-verification-div").style.display = "block";
      document.getElementById("user_para").innerHTML = "Email: " + email;
      send_verification();
    } else {
      // User is logged in
      console.log("User is logged in.");
      successNotification("Welcome, " + email + "!");
      document.getElementById("user-div").style.display = "block";
      document.getElementById("login-div").style.display = "none";
      document.getElementById("registration-div").style.display = "none";
      document.getElementById("send-verification-div").style.display = "none";
      document.getElementById("user_email_show").innerHTML = email;
      document.getElementById("user_para").innerHTML = "Email: " + email;
    }
  } else {
    // No user is signed in.
    console.log("You are currently not logged in to any account.");
    document.getElementById("user-div").style.display = "none";
    document.getElementById("login-div").style.display = "block";
    document.getElementById("registration-div").style.display = "none";
    document.getElementById("send-verification-div").style.display = "none";
  }
});

function reg_account() {
  document.getElementById("registration-div").style.display = "block";
  document.getElementById("login-div").style.display = "none";
  document.getElementById("send-verification-div").style.display = "none";
}