$(document).ready(function () {
  
  const auth = firebase.auth();
  const db = firebase.firestore();

   //ON AUTHSTATECHANGED
   auth.onAuthStateChanged(user => {
    if (user == null) {
      window.location.href="../../index.html";
    }
  });

});