$(document).ready(function(){
  //add keyup event listener that will update the counter
  $('.new-tweet textarea').keyup(function(){
    $(this).parents(".new-tweet").find(".counter").text(140 - $(this).val().length);
    $(this).parents(".new-tweet").find(".counter").toggleClass("counterred", ($(this).val().length > 140));
  });
});