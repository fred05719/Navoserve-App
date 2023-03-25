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
          $('#resend-email').text('RESEND VERIFICATION (' + timeleft + ')');
          if (timeleft <= 0) {
            clearInterval(downloadTimer);
            $('#resend-email').prop('disabled', false);
            $('#resend-email').text('RESEND VERIFICATION');
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
          $('.page_loading_con').css('display', 'flex');
          db.collection('applicants').doc(user.uid).get().then(function (doc) {
            $.ajax({
              type: 'post',
              url: '../assets/sql/alter_applicants.php',
              data: {
                'applicant_id': doc.data().applicant_id,
              },
              success: function (data) {
                console.log(data);
                db.collection('applicants').doc(user.uid).update({ email_verified: true })
                .then(() => {
                    $('.page_loading_con').css('display', 'none');
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

  $('#resend-email').click(sendEmailVerification);

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