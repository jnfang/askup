$(document).ready(function(q){

    $("#mine-radio").click(function(){
      $('.my-question').removeClass('hidden');
      $('.other-question').addClass('hidden');
    });

    $('#other-radio').click(function(){
      $('.my-question').addClass('hidden');
      $('.other-question').removeClass('hidden');
    });
  
// Defines function that disables/enables submit button depending on if there is text in the answer box
function enableSubmitAnswer() {
  if ($('#answer_text').val()) {
    $('#submit_answer').attr('disabled', false);
  } else {
    $('#submit_answer').attr('disabled', true); 
  }
}


// Creates the javscript for the Question modal that allows it to be populated with the data recieved upon clicking the modal link

$('#question_display_Modal').on('show.bs.modal', function (event) {
  
  // Creates the initial view of the modal. The submit answer is shown as well as an empty text box. 
  // The answer is initally hidden and so is the response + alert forms. 
  $("#submit_answer").show();
  $('#answer_text').val("");
    // initially hides the answers and response form in the modal 
  $("#response, #answers, #alert_text_container").hide();
  enableSubmitAnswer();  

  var question_link = $(event.relatedTarget); // element that triggered the modal. question_link is populated with the data from the click 

  // Creates variables with data that we will later use to populate certain parts of the modal 
  var text_question = question_link.data('question');
  var first_answer = question_link.data('answer');  
  
  // Setting up the response buttons to have the correct q_id to send to the analytics.log and to also trigger the right feedback form
  $('#respond-yes').data('q_id', question_link.data('q_id')); 
  $('#respond-no').data('q_id', question_link.data('q_id'));  

 
  // Searches the modal and populates the indicated classes with the data recieved when the modal was clicked
  var modal = $(this);
  modal.find('.modal-title').text(text_question);
  modal.find('.first-answer').text(first_answer);
})

// Creates the javscript for the Social modal that allows it to be populated with the data recieved upon clicking the modal link
$('#social_display_Modal').on('show.bs.modal', function (event) {
  var social_link = $(event.relatedTarget); // element that triggered the modal. social_link is populated with the data from the click 
  
  // Creates variables with data that we will later use to populate certain parts of the modal 
  var title = social_link.data('website');
  var text_question = social_link.data('question');
  var url_link = social_link.data('url');
  var hyperlink = social_link.data('hyperlink');
  var hyperlinktext = social_link.data('hyperlinktext');

  // Searches the modal and populates the indicated classes with the data recieved when the modal was clicked
  var modal = $(this);
  modal.find('.modal-title').text(title); // sets the title 
  modal.find('.modal-body-social input').val(text_question + " ➡" + "Follow the link to find out the answer: " + url_link); // creates the text that includes the question and url for user to copy to clipboard
  modal.find('.hyperlink').attr("href", hyperlink); // updates the href to the appropriate social platform the second attribute allows the social site to be opened on a new page 
  modal.find('.hyperlink').text(hyperlinktext); // creates the text that the hyperlink will show up as 
})

// Defines function that disables/enables submit button depending on if there is text in the question and answer boxes
function enableSubmitQuestion() {
  if ($('#question_text').val() && $('#question_answers_attributes_0_text').val()) {
    $('#submit_question').attr('disabled', false);
  } else {
    $('#submit_question').attr('disabled', true);
  }
}

// enables/disables the submit question button on page load
enableSubmitQuestion(); 

// runs each time the user presses a key in the #answer_text form field
$('#question_text, #question_answers_attributes_0_text').keyup(enableSubmitQuestion);

$('#question-groups').on('change', function(event) {
    var val = $(this).val();
    if (val == 'new') {
        $('#modal-new-question-group').modal();
    } else {
        window.open('questions?question_group_id=' + val, '_self');
    }
});

$('#modal-new-question-group').on('show.bs.modal', function (event) {
    var $modal = $(this);
    var currentQuestionGroupName = $('#edit-question-group').text().trim();
    $modal.find('input[name="name"]').val('');
    $modal.find('input[name="parent"]').val(currentQuestionGroupName);
});

$('#modal-new-question-group').on('hide.bs.modal', function (event) {
    $('#question-groups').val('');  // reset the question group dropdown
});

$('#edit-question-group').on('click', function (event) {
    var $modal = $('#modal-edit-question-group');
    var $link = $(event.target);
    $modal.find('input[name="name"]').val($link.text().trim());
    $('#delete_confirmation_form_container').hide();
});

$('#edit-question-group-delete').on('click', function (event) {
    $('#delete_confirmation_form_container').show();
});

});

