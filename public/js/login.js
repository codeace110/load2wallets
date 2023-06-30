let globalEmail = "";

// Function to handle login when Enter key is pressed
function handleLoginKeyPress(event) {
  if (event.key === 'Enter') {
    login();
  }
}

// Add event listener to the password field
document.getElementById("password_field").addEventListener("keydown", handleLoginKeyPress);

// Function to show the loading GIF
function showLoading() {
  document.getElementById("loading").style.display = "block";
}

// Function to hide the loading GIF
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

// Function to handle successful login
function handleSuccessfulLogin(user) {
  if (user.emailVerified) {
    globalEmail = user.email;
    // Redirect to user.html
    window.location.href = "./user.html";
  } else {
    // Email not verified
    sendVerificationEmail(user)
      .then(() => {
        successNotification("Verification email sent. Please check your email and verify your account.");
        document.getElementById("send-verification-div").style.display = "block";
      })
      .catch((err) => {
        errorNotification("Failed to send verification email. Please try again.");
        console.error("Error sending verification email:", err);
      });
  }
}

// Function to handle failed login
function handleFailedLogin(err) {
  errorNotification(err.message);
}

// Function to log in user
function login() {
  console.log('Attempting to login user ...');
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(userEmail, userPass);

  promise
    .then((response) => {
      handleSuccessfulLogin(response.user);
    })
    .catch(handleFailedLogin);
}

// Function to send verification email
function sendVerificationEmail(user) {
  return user.sendEmailVerification();
}

// Google Sign-In function
function loginWithGoogle() {
  showLoading(); // Show the loading GIF while the sign-in process is ongoing

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' }); // Prompt user to choose account
  firebase.auth().signInWithRedirect(provider); // Redirect to Google sign-in page
}

// Check if the user is already logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    handleSuccessfulLogin(user);
  } else {
    hideLoading(); // Hide the loading GIF since user is on the login/register page
  }
});


function resendVerificationEmail() {
  const user = firebase.auth().currentUser;

  if (user) {
    sendVerificationEmail(user)
      .then(() => {
        successNotification("Verification email sent. Please check your email and verify your account.");
      })
      .catch((err) => {
        errorNotification("Failed to send verification email. Please try again.");
        console.error("Error sending verification email:", err);
      });
  } else {
    errorNotification("No user found. Please login again.");
  }
}

