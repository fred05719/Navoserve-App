$(document).ready(function() {

  $.validator.setDefaults({
    errorClass: 'help-block',
    highlight: function(element) {
      $(element)
        .closest('input')
        .addClass('invalid');
      $(element)
        .closest('select')
        .addClass('invalid');
    },
    unhighlight: function(element) {
      $(element)
        .closest('input')
        .removeClass('invalid')
      $(element)
        .closest('select')
        .removeClass('invalid')
    },
    errorPlacement: function (error, element) {
      if (element.prop('type') === 'select') {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element.parent());
      }
    },
  });

  $.validator.addMethod('strongPassword', function(value, element) {
    return this.optional(element) 
      || value.length >= 6
      && /\d/.test(value)
      && /[a-z]/i.test(value);
  }, 'Your password must be at least 6 characters long and contain at least one number and one char.');

  $.validator.addMethod('email', function(value, element, param) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(value)
  }, 'Please enter a valid email address.')


  $("#signup_form").validate({
    rules: {
      fName: {
        required: true
      },
      lName: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        // strongPassword: true
      },
      cpassword: {
        required: true,
        equalTo: '#password'
      },
    },
    messages: {
      fName: {
        required: "Please enter your First Name."
      },
      lName: {
        required: "Please enter your Last Name."
      },
      email: {
        required: "Please enter your Email Address."
      },
      password: {
        required: "Please enter a password."
      },
      cpassword: {
        equalTo: "Your password and confirmation password must match.",
        required: "Please confirm your password."
      }, 
    }
  });


});