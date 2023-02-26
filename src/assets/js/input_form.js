$(document).ready(function () {
  var isShown = false;

  // SHOW PASSWORD
  $("#show_password").click(function () {
    $(this).siblings('input').focus();
    $(this).toggleClass('bi-eye-fill bi-eye-slash-fill');
    
    var $input = $(this).siblings('input');
    var type = $input.attr('type') === 'password' ? 'text' : 'password';
    $input.attr('type', type);
  });

});