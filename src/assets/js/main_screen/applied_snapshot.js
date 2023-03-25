$(document).ready(function () {

  const db = firebase.firestore();
  const auth = firebase.auth();
  var applicant_id;

  auth.onAuthStateChanged((user) => {

    const appRef = db.collection('applications');
    const query = appRef.where('appl_doc_id', '==', user.uid);

    query.onSnapshot(snapshot => {

      if (snapshot) {

        snapshot.docChanges().forEach(change => {
          console.log(change.doc.id);
          var app_data = change.doc.data();
          moment.locale();


          db.collection('soc_services').doc(app_data.socser_id).get().then((docs) => {

            var socser_data = docs.data();


            var newLI = '<li>' +
              '<div class="socser_card" onclick="openAppForm(\'' + change.doc.id + '\')">' +
              '<div class="color_con"><div class="socser_color" style="background-color: ' + (socser_data.event_color).replace('0xFF', '#') + '"></div></div>' +
              '<div class="socser_content flex-grow-1">' +
              '<span class="socser_title">' + socser_data.event_name + '</span>' +
              '<div class="socser_sub">' +
              '<span id="socser_date">DATE: </span>' +
              '<span id="socser_date">' + moment(socser_data.date_start).format('LL') + '</span>' +
              '<span id="socser_from"> ' + moment(socser_data.date_start).format('LT') + '</span>' +
              '<span> - </span><span id="socser_to">' + moment(socser_data.date_end).format('LT') + '</span>' +
              '</div>' +
              '<div class="socser_sub">' +
              '<span id="socser_date">STATUS: </span>' +
              '<span id="socser_date">PENDING</span>' +
              '</div>' +
              '</div>' +
              '<div class="arrow_con"><i class="bi bi-chevron-right"></i></div>' +
              '</div>' +
              '</li>';
            $('#socser_list').append(newLI);
            $('.loading_card').css('display', 'none');

          }).catch((error) => {
            console.log(error.message)
          });

        });

      } else {
        var noApp = '<li>'+
        '<div>No application yet.'+
        '</div>'+
      '</li>';
        $('#socser_list').append(noApp);
        $('.loading_card').css('display', 'none');
      }
    });

  });


});

function openAppForm(socser_id) {
  window.location.href = '../screens/app_form.html?page=first&socser_id=' + socser_id;
}