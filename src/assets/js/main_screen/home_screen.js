$(document).ready(function () {

  const url = new URL(window.location);
  if(url.searchParams.get('page') == null) {
    url.searchParams.set('page','home');
    window.history.pushState({}, "", url);
  }

  reloadTabPage();

  $('.nav-link').click(function (e) {
    e.preventDefault();

    $('.nav-link').parent().removeClass('active');
    $(this).parent().addClass('active');

    page_name = $(this).attr('id');
    url.searchParams.set('page',page_name);
    window.history.pushState({}, "", url);
    reloadTabPage();
  });

  function reloadTabPage() {
    page = url.searchParams.get('page');
    pageURL = 'pages/' + page + '.html';
    $('.nav-item').removeClass('active');
    $('#'+page+'').parent().addClass('active');
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