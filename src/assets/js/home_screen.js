$(document).ready(function () {

  var page_name = 'home';
  reloadTabPage();

  $('.nav-link').click(function (e) {
    e.preventDefault();

    $('.nav-link').parent().removeClass('active');
    $(this).parent().addClass('active');

    page_name = $(this).attr('id');
    reloadTabPage();
  });

  function reloadTabPage() {
    pageURL = 'pages/' + page_name + '.html';

    // $.ajax({
    //   url: pageURL,
    //   dataType: 'html',
    //   success: function (data) {  
    //     $('.main-body').html(data);
    //   }
    // });

    $('.main-body').load(pageURL);

  }




});