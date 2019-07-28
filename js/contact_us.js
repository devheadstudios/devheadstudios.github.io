$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function($form, event, errors) {
        // additional error messages or events
      },
      submitSuccess: function($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var name = $("input#name").val();
        var email = $("input#email").val();
        var phone = $("input#phone").val();
        var message = $("textarea#message").val();
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
        }
        $this = $("#sendMessageButton");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

        Email.send({
            SecureToken : "8aa3be6f-50b4-4ecc-b110-5fc15925aa1c",
            To : 'contact@devhead.net',
            From : email,
            Subject : "Website Creation: " + name,
            Body : "Name: " + name + "\r\nEmail: " + email + "\r\nPhone: " + phone + "\r\nMessage:\r\n" + message 
        }).then(
            message => processMessage(message)
        );

        setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when mail send is complete
        }, 1000);
      },
      filter: function() {
        return $(this).is(":visible");
      },
    });
  
    $("a[data-toggle=\"tab\"]").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
    });
  });
  
  /*When clicking on Full hide fail/success boxes */
  $('#name').focus(function() {
    $('#success').html('');
  });
  
  function processMessage(message)
  {
    //alert(message + "...");
    if(message === "OK")
    {
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
        $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
        $('#success > .alert-success').append('</div>');
        $('#contactForm').trigger("reset");
    }
    else
    {
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
        $('#success > .alert-danger').append($("<strong>").text("Sorry, it seems that my mail server is not responding. Please try and contact us via contact@devhead.net directly!"));
        $('#success > .alert-danger').append('</div>');
        $('#contactForm').trigger("reset");
    }
  }