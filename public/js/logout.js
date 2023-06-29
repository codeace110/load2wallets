function logout() {
  firebase.auth().signOut()
    .then(() => {
      successNotification("Successfully logged out!");
      window.location.href = "./index.html"; // Redirect to index.html
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}