$(document).ready(function () {

  const db = firebase.firestore();
  const auth = firebase.auth();

  const tbl_customer = db.collection("customers");

  $('#signup_form').submit(function (e) {
    e.preventDefault();
    $('#submit-btn').html('<div class="spinner-border text-light" role="status"><span class="sr-only"></span></div>');

    if ($(this).valid()) {

      //CONVERT FORM DETAILS TO ARRAY
      const signupDataArray = $(this).serializeArray();
      //CONVERT FORM ARRAY TO OBJECT
      const signupDataObject = {};
      $(signupDataArray).each(function (index, obj) {
        signupDataObject[obj.name] = obj.value;
      });
      //CONVERT FORM OBJECT TO FORMDATA
      const signupFormData = new FormData();
      for (const key in signupDataObject) {
        signupFormData.append(key, signupDataObject[key]);
      }

      auth.createUserWithEmailAndPassword(signupDataObject['email'], signupDataObject['password']).then((cred) => {
        console.log(cred.user.uid);

        $.ajax({
          type: "POST",
          url: "../assets/sql/signup_sql.php",
          data: signupFormData,
          processData: false,
          contentType: false,
          dataType: "json",
          success: function (data) {
            if(data.status == 'SUCCESS') {
              const newFormObject = {};
              newFormObject.customer_id = data.id;
              newFormObject.email = cred.user.email;
              newFormObject.name = signupDataObject['lName'] +', '+ signupDataObject['fName'];
              newFormObject.email_verified = false;
              newFormObject.user_type = 'CUSTOMER';

              tbl_customer.doc(cred.user.uid).set(newFormObject).then(() => {
                window.location.href="email_verify.html";
              });
              console.log(newFormObject);
              console.log(data.index);
            } else {
              showAlertDialog('Signup Failed', 'Something went wrong.');
            }
            console.log(data.status);
          }
        });

      }).catch((error) => {
        showAlertDialog('Signup Failed', error.message);
      });
    } else {
      $('#submit-btn').html('CREATE ACCOUNT');
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
    $('#submit-btn').html('CREATE ACCOUNT');
    resetForm();
  }

  function resetForm() {
    var validator = $("#signup_form").validate();
    validator.resetForm();
    $(".text-box").val('');
  }

});