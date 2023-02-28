$(document).ready(function () {

  const db = firebase.firestore();

  db.collection('soc_services').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      console.log(change.doc.id);
      var socser_data = change.doc.data();

      var newLI = '<li>' +
        '<div class="socser_card" onclick="openAppForm(\''+change.doc.id+'\')">' +
        '<div class="color_con"><div class="socser_color" style="background-color: '+(socser_data.event_color).replace('0xFF', '#')+'"></div></div>' +
        '<div class="socser_title flex-grow-1"><span>'+socser_data.event_name+'</span></div>' +
        '<div class="arrow_con"><i class="bi bi-chevron-right"></i></div>' +
        '</div>' +
        '</li>';
      $('#socser_list').append(newLI);
      $('#loading_con').css('display', 'none');
      
    })
  });

  
});

function openAppForm(socser_id) {  
  window.location.href='../screens/app_form.html?socser_id='+socser_id;
}