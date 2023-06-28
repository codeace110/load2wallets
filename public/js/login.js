
let globalEmail = "";

function login() {
  console.log('Attempting to login user ...')
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(userEmail, userPass);
  promise.then((response) => {
    globalEmail = response.user.email;
  });
  promise.catch((err) => errorNotification(err.message));
}

// Function to handle Google login
    function loginWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          // Login successful, handle logged-in user
          var user = result.user;
          console.log("User logged in:", user);
        })
        .catch(function(error) {
          // Handle errors
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("Google login error:", errorCode, errorMessage);
        });
    }