$(document).ready(function () {

  const db = firebase.firestore();

  db.collection('soc_services').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      console.log(change.doc.id);
      var socser_data = change.doc.data();

      moment.locale();
      var newLI = '<li>' +
        '<div class="socser_card" onclick="openAppForm(\'' + change.doc.id + '\')">' +
        '<div class="color_con"><div class="socser_color" style="background-color: ' + (socser_data.event_color).replace('0xFF', '#') + '"></div></div>' +
        '<div class="socser_content flex-grow-1">' +
        '<span class="socser_title">'+socser_data.event_name+'</span>' +
        '<div class="socser_sub">' +
        '<span id="socser_date">'+ moment(socser_data.date_start).format('LL') +'</span>' +
        '<span id="socser_from"> '+ moment(socser_data.date_start).format('LT') +'</span>'+
        '<span> - </span>'+
        '<span id="socser_to">'+ moment(socser_data.date_end).format('LT') +'</span>' +
        '</div>' +
        '</div>' +
        '<div class="arrow_con"><i class="bi bi-chevron-right"></i></div>' +
        '</div>' +
        '</li>';
      $('#socser_list').append(newLI);
      $('#loading_con').css('display', 'none');

    })
  });


});

function openAppForm(socser_id) {
  window.location.href = '../screens/app_form.html?page=first&socser_id=' + socser_id;
}