$(document).ready(function () {
  const db = firebase.firestore();
  const auth = firebase.auth();


  //ON AUTHSTATECHANGED
  auth.onAuthStateChanged(user => {
    if (user !== null) {
      
      db.collection('customers').doc(user.uid).get().then((doc) => {
        
        console.log(user.emailVerified);
        if (doc.exists) {
          (!user.emailVerified) ? window.location.href = 'email_verify' : window.location.href = "home_screen.html";
        } 
      });
    }
  });




  //ON LOGIN BUTTON CLICK
  $("#login-form").submit(function (e) {
    e.preventDefault();
    $('#login_btn').html('<div class="spinner-border text-light" role="status"><span class="sr-only"></span></div>');

    var email = $(".text-box[name='email']").val();
    var password = $(".text-box[name='password']").val();

    console.log(email)

    if((email == '') || (password == '')) {
      alert('Please fill up all fields.');
      $('#login_btn').html('LOGIN');
    } else {
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {}).catch((error) => {});
    }

  });

});

