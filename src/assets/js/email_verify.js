$(document).ready(function () {

  const db = firebase.firestore();
  const auth = firebase.auth();

  function sendEmailVerification() {
    auth.onAuthStateChanged(user => {
      if (user !== null) {
        $('#email_add').text(user.email);
        $('#resend-email').prop('disabled', true);

        var timeleft = 61;
        var downloadTimer = setInterval(function () {
          timeleft--;
          $('#resend-email').text('Resend verification (' + timeleft + ')');
          if (timeleft <= 0) {
            clearInterval(downloadTimer);
            $('#resend-email').prop('disabled', false);
            $('#resend-email').text('Resend verification');
          }
        }, 1000);

        user.sendEmailVerification().catch((error) => {
          showAlertDialog('Email verification not sent', 'Something went wrong.')
        });
      }
    });
  }
  sendEmailVerification();


  var emailInterval = setInterval(() => {
    auth.currentUser.reload().then(function () {
      var user = auth.currentUser;
      if (user !== null) {
        console.log(user.uid);
        if (user.emailVerified) {
          db.collection('customers').doc(user.uid).get().then(function (doc) {
            $.ajax({
              type: 'post',
              url: '../assets/sql/alter_customer.php',
              data: {
                'customer_id': doc.data().customer_id,
              },
              success: function (data) {
                console.log(data);
                db.collection('customers').doc(user.uid).update({ verified: true })
                  .then(() => {
                    window.location.href = 'home_screen.html';
                  });
              }
            })
          });
          clearInterval(emailInterval);
        }
      }
    });
  }, 1000);

  $('#logout').click(function (e) {
    e.preventDefault();

    firebase.auth().signOut();
  });

  function showAlertDialog(title, message) {
    $.alert({
      title: title,
      content: message,
      backgroundDismiss: true,
      columnClass: 'col-md-4 col-xs-2',
      animateFromElement: true,
    });
  }

});