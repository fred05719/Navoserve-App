$(document).ready(function () {

  const url = new URL(window.location);
  const urlParams = new URLSearchParams(window.location.search);
  const socser_id = urlParams.get("socser_id");
  const customer_id = urlParams.get("customer_id");
  const agree = urlParams.get("agree");
  var app_data = {};

  if(agree) {
    $('#agree_policy').prop('checked', true);
    $('#btn_continue').prop('disabled', false);
  } 

  $('#agree_policy').change(function() {
    // Do something when the checkbox is changed
    if ($(this).is(':checked')) {
      url.searchParams.set('agree','true');
      $('#btn_continue').prop('disabled', false);
    } else {
      url.searchParams.set('agree','false');
      $('#btn_continue').prop('disabled', true);
    }
    window.history.pushState({}, "", url);
  });

  $('#labelForPolicy').click(function () {  
    $('#agree_policy').click();
  });
  

  if(socser_id == null && customer_id == null) {
     $('body').css('display', 'none');
  }

  const policy_url ='pages/privacy_policies.html';
  const PRIVACY_POLICIES = 'In order to proceed your application, we need to collect some personal information. Your privacy is important and our Privacy Policy details how we use and protect your information.';

  $('#policy').text(PRIVACY_POLICIES);

  $('.open_policy').click(function () { 
    $('#modal-policy-body').load(policy_url);
   $('#modal_policy').modal('show');
  });

  $('#btn_continue').click(function () { 
    url.searchParams.set('page','second');
    window.history.pushState({}, "", url);
    $('.main-body').load('pages/second-form.html');
  });

});