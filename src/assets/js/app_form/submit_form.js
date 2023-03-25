$(document).ready(function () {

  const db = firebase.firestore();
  const auth = firebase.auth();

  const url = new URL(window.location);
  const urlParams = new URLSearchParams(window.location.search);
  const socser_id = urlParams.get("socser_id");
  var app_data = {};



  $('#back-btn').click(function () {
    url.searchParams.set('page', 'first');
    window.history.pushState({}, "", url);
    $('.main-body').load('pages/first-form.html');
  });

  if (socser_id == null && applicant_id == null) {
    $('body').css('display', 'none');
  }

  console.log(socser_id);

  const tbl_socser = db.collection("soc_services");
  const tbl_applications = db.collection("applications");
  const tbl_app_details = db.collection("app_details");
  const tbl_applicants = db.collection("applicants");
  const tbl_report = db.collection("reports");


  $('#app_form').submit(function (e) {
    e.preventDefault();

    if ($(this).valid()) {

      $('#submit-btn').html('<div class="spinner-border text-light" role="status"><span class="sr-only"></span></div>');

      auth.onAuthStateChanged((user) => {
        db.collection('applicants').doc(user.uid).get().then((docs) => {

          var applicant_id = docs.data()['applicant_id'];
          console.log(applicant_id);

          let index_app_id = (applicant_id.replace(/[^0-9]/g, '')).slice(4); // strip all non-numeric chars
          let applicant_index = parseInt(index_app_id, 10);
          let index_socser_id = (socser_id.replace(/[^0-9]/g, '')).slice(4); // strip all non-numeric chars
          let soscser_index = parseInt(index_socser_id, 10);

          //ADD APP DATA TO OBJECT
          app_data.appl_doc_id = user.uid;
          app_data.socser_id = socser_id;
          app_data.applicant_id = applicant_id;
          app_data.app_status = 'PENDING';
          app_data.date_created = new Date().getTime();


          //CONVERT FORM DETAILS TO ARRAY
          const formDetails = $(this).serializeArray();
          //CONVERT FORM ARRAY TO OBJECT
          const formDetailsObject = {};
          $(formDetails).each(function (index, obj) {
            formDetailsObject[obj.name] = obj.value;
          });
          formDetailsObject.bday = new Date(formDetailsObject.bday).getTime();


          //FORM DATA
          const formAppData = new FormData();
          for (const key in app_data) {
            formAppData.append(key, app_data[key]);
          }
          formAppData.append('applicant_index', applicant_index);
          formAppData.append('socser_index', soscser_index);

          for (const key in formDetailsObject) {
            formAppData.append(key, formDetailsObject[key]);
          }
          formAppData.append('gender', $('#gender').val());
          formAppData.append('civil_status', $('#civil_status option:selected').text());

          //CALL SAVE TO AJAX FUNCTION
          ajaxSaveAppForm(formAppData, app_data, formDetailsObject);

        });
      });
    }
  });


  function ajaxSaveAppForm(formAppData, app_data, formDetailsObject) {
    $.ajax({
      type: "POST",
      url: "../assets/sql/add_form.php",
      data: formAppData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (data) {
        if (data.status == 'SUCCESS') {

          firebaseSaveAppForm(data.id, app_data, formDetailsObject)

          console.log(data.id);
        } else {
          console.log(data.status);
          showErrorDialog('Failed', 'Application has not been created.')
        }
        console.log(data)
      }
    });

  }

  function firebaseSaveAppForm(id, app_data, formDetailsObject) {
    tbl_applications.doc(id).set(app_data).then(() => {
      tbl_app_details.doc(id).set(formDetailsObject).then(() => {

        tbl_socser.doc(socser_id).get().then((doc) => {
          var updated_applied_num = (doc.data().num_appl) + 1;
          var socser = doc.data();
          console.log(updated_applied_num);

          var updateCountData = new FormData();
          updateCountData.append('socser_id', socser_id);
          updateCountData.append('count', updated_applied_num);

          $.ajax({
            type: "POST",
            url: "../assets/sql/update_applied.php",
            data: updateCountData,
            processData: false,
            contentType: false,
            success: function (data) {
              console.log(data);
              if (data == 'SUCCESS') {
                tbl_socser.doc(socser_id).update({
                  num_appl: updated_applied_num,
                }).then(() => {
                  
                  var beneficiary = formDetailsObject.last_name + ', ' + formDetailsObject.first_name;
                  addAppFormReport(beneficiary, socser.event_name, id);

                });

              }
            }
          });

        });

      }).catch((error) => {
        showErrorDialog('Failed', error.message)
      });
    });
  }


  function addAppFormReport(beneficiary, socser, appform_id) {
    var reportObject = {};
    reportObject.time_stamp = new Date().getTime();
    reportObject.remark = '<b>' + beneficiary + '</b> wants to apply for <b>' + socser + '</b> with Aplication ID of <b>' + appform_id + '</b>';

    var reportFormData = new FormData();
    for (const key in reportObject) {
      reportFormData.append(key, reportObject[key]);
    }

    $.ajax({
      type: "POST",
      url: "../assets/sql/add_report.php",
      data: reportFormData,
      processData: false,
      contentType: false,
      success: function (data) {
        if (data == 'SUCCESS')
          tbl_report.doc().set(reportObject).then(() => {
            console.log(data);
            showSuccessDialog('Success', 'Application has been created.');
            resetForm();
          })
      }

    });
  }


  function showErrorDialog(title, message) {
    $.alert({
      title: title,
      content: message,
      backgroundDismiss: true,
      columnClass: 'col-md-4 col-xs-2',
      animateFromElement: true,
    });
    $('#submit-btn').html('SUBMIT');
  }


  function showSuccessDialog(title, message) {
    $.alert({
      title: title,
      content: message,
      backgroundDismiss: false,
      columnClass: 'col-md-4 col-xs-2',
      animateFromElement: true,
      buttons: {
        OK: {
          text: 'OK',
          action: function () {
            window.location.href = "home_screen.html?page=applications";
          }
        },
      }
    });
    $('#submit-btn').html('SUBMIT');
  }


  function resetForm() {
    var validator = $("#app_form").validate();
    validator.resetForm();
    $("#gender option:first").attr("selected", "selected");
    $("#civil_status option:first").attr("selected", "selected");
    $(".text-box").val('');
  }

});