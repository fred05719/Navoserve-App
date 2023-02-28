$(document).ready(function () {
  const auth = firebase.auth();

  var email;

  $('#forgot-btn').click(function () {

    $('#forgot-btn').html('<div class="spinner-border text-light" role="status"><span class="sr-only"></span></div>');

    email = $('#forg_email').val();
    if (!email == '') {
      auth.sendPasswordResetEmail(email).then(() => {
        $('#forgot-btn').prop('disabled', true);
        var timeleft = 61;
        var downloadTimer = setInterval(function () {
          timeleft--;
          $('#forgot-btn').text('Resend (' + timeleft + ')');
          if (timeleft <= 0) {
            clearInterval(downloadTimer);
            $('#forgot-btn').prop('disabled', false);
            $('#forgot-btn').text('Resend');
          }
        }, 1000);
        var mess = 'Please check your inbox and follow the instructions indicated in the mail';
        showAlertDialog('Success', mess);

      }).catch((error) => {
        showAlertDialog('Email not sent', error.message);
      });
    } else {
      var mess = 'This field can\'t be empty. Please enter your email';
      showAlertDialog('Email not sent', mess);
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
    $('#forgot-btn').html('CONTINUE');
  }

});