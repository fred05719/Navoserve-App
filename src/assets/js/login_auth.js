$(document).ready(function () {
  const db = firebase.firestore();
  const auth = firebase.auth();

  //ON AUTHSTATECHANGED
  auth.onAuthStateChanged(user => {
    if (user !== null) {

      db.collection('customers').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          (!user.emailVerified) ? window.location.href = 'email_verify.html' : window.location.href = "home_screen.html";
        } else {
          user.delete();
          var message = "There is no user record corresponding to this identifier. The user may have been deleted.";
          showAlertDialog('Login Failed', message);
        }
      }).catch((error) => {
        showAlertDialog('Login Failed', error.message);
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

    if ((email == '') || (password == '')) {
      showAlertDialog('Login Failed', 'Please enter your credentials');
    } else {
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => { }).catch((error) => {
          showAlertDialog('Login Failed', error.message);
          $(".text-box[name='password']").val('');
        });
    }

  });

  function showAlertDialog(title, message) {
    $.alert({
      title: title,
      content: message,
      backgroundDismiss: true,
      columnClass: 'col-md-4 col-xs-2',
      animateFromElement: true,
    });
    $('#login_btn').html('LOGIN');
  }

});

