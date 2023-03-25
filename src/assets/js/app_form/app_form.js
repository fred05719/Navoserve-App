$(document).ready(function () {

  const urlParams = new URLSearchParams(window.location.search);
  const pageName = urlParams.get("page");

  $('#appform_back').click(function (e) {
    e.preventDefault();

    $.confirm({
      title: 'Confirm',
      content: 'Your application won\'t be saved. Are you sure you want to go back?',
      columnClass: 'col-md-4 col-xs-2',
      animateFromElement: true,
      buttons: {
        No: function () {},
        Yes: function () {
          window.location.href='home_screen.html'
        },
      }
    });
  });

  var pageURL = 'pages/'+pageName+'-form.html';
  $('.main-body').load(pageURL);

});