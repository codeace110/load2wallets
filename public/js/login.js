let globalEmail = "";

function login() {
  console.log('Attempting to login user ...');
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(userEmail, userPass);

  promise.then((response) => {
    globalEmail = response.user.email;
    // Redirect to user.html
    window.location.href = "./user.html";
  });

  promise.catch((err) => errorNotification(err.message));
}

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
    // User is already logged in, redirect to user.html
    window.location.href = "./user.html";
  } else {
    // User is not logged in
    hideLoading(); // Hide the loading GIF since user is on the login/register page
  }
});
