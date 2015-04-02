//hide and show answers
$(document).ready(function(e){

    function provide_feedback(is_correct, notice_text) {
      $.ajax({
        url: window.location.pathname + "/feedback",
        type: "POST",
        data: { correct: is_correct }
      })
        .done(function( data ) {
          if ( console && console.log ) {
            console.log( "Sample of data:", data.slice( 0, 100 ) );
          }
          $('#alert_text').text(notice_text);
          $('.alert').slideDown();
      });
    };

  //if you wish to keep both the divs hidden by default then dont forget to hide //them
  $("#answers").hide();
  $("#response").hide();
 
 
  
//enableSubmitAnswer(); 

// Defines function that disables/enables submit button depending on if there is text in the answer box
function enableSubmitAnswer() {
  if ($('#answer_text').val()) {
    $('#submit_answer').attr('disabled', false);
  } else {
    $('#submit_answer').attr('disabled', true); 
  }
  //$('#submit_answer').attr('disabled', !($('#answer_text').val()));
}

// Function is called as soon as page is loaded so that submit button can be disabled initially 
enableSubmitAnswer(); 


// runs each time the user presses a key in the #answer_text form field
$('#answer_text').keyup(enableSubmitAnswer); 


  // if (!($('#answer_text').val()) {$('#submit_answer').attr('disabled', true);}

  // $('#answer_text').keyup(function(){
  //   $('#submit_answer').attr('disabled', !($('#answer_text').val()));
  // });

  $("#submit_answer").click(function(){
       $("#answers").fadeIn();
       $("#submit_answer").hide("slow");
       $("#response").fadeIn();
  });

  $('#respond-yes').click(function(e) {
    provide_feedback("yes", "Great! Congrats! Try another question.");
  });

  $('#respond-no').click(function(e) {
    provide_feedback("no", "No worries. You'll get it next time. Onwards!");
  });

});
