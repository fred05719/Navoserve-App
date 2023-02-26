$(document).ready(function () {

  const urlParams = new URLSearchParams(window.location.search);
  const socser_id = urlParams.get("socser_id");
  const customer_id = urlParams.get("customer_id");
  var app_data = {};

  if(socser_id == null && customer_id == null) {
     $('body').css('display', 'none');
  }

  const URL ='privacy_policy/privacy_policies.html';
  const PRIVACY_POLICIES = 'In order to proceed your application, we need to collect some personal information. Your privacy is important and our Privacy Policy details how we use and protect your information.';

  $('#policy').text(PRIVACY_POLICIES);

  $('#agree_policy').change(function () {
    if (this.checked) {
      $('#btn_continue').prop('disabled', false);
    } else {
      $('#btn_continue').prop('disabled', true);
    }
  });

  $('.open_policy').click(function () { 
    $('#modal-policy-body').load(URL);
   $('#modal_policy').modal('show');
  });

  $('#btn_continue').click(function () { 
    window.location.href = 'app_form.html?customer_id='+ customer_id +'&socser_id='+ socser_id;
    
  });

});