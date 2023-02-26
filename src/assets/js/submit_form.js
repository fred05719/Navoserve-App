$(document).ready(function () {

  const urlParams = new URLSearchParams(window.location.search);
  const socser_id = urlParams.get("socser_id");
  const customer_id = urlParams.get("customer_id");
  var app_data = {};

  if(socser_id == null && customer_id == null) {
     $('body').css('display', 'none');
  }

  console.log(socser_id);
  console.log(customer_id);

  const db = firebase.firestore();
  const tbl_applications = db.collection("applications");
  const tbl_app_details = db.collection("app_details");
  const tbl_customer = db.collection("customers");

  $('#app_form').submit(function (e) {
    e.preventDefault();
    if ($(this).valid()) {

      //ADD APP DATA TO OBJECT
      app_data.socser_id = socser_id;
      app_data.customer_id = customer_id;
      app_data.details_id = 1;
      app_data.queue_num = '';
      app_data.schedule = '';
      app_data.app_status = 'PENDING';


      //CONVERT FORMDATA DETAILS TO OBJECT
      const formDetails = $(this).serializeArray();
      const formDetailsObject = {};
      $(formDetails).each(function (index, obj) {
        formDetailsObject[obj.name] = obj.value;
      });

      console.log(formDetailsObject);



      //FORM DATA
      const formAppData = new FormData();
      for (const key in app_data) {
        formAppData.append(key, app_data[key]);
      }

      for (const key in formDetailsObject) {
        formAppData.append(key, formDetailsObject[key]);
      }
      formAppData.append('gender', $('#gender').val());
      formAppData.append('civil_status', $('#civil_status option:selected').text());


      //PHP MYSQL
      $.ajax({
        type: "POST",
        url: "sql/add_form.php",
        data: formAppData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (data) {
          if(data.status == 'SUCCESS') {
            tbl_applications.doc(data.id).set(app_data);
            console.log(data.id);
          }
        }
      });

      const sample = Object.fromEntries(formAppData);
      console.log(sample);
      console.log(Object.keys(sample).length);

    }
  });

});