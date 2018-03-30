$(document).ready(function () {
 /*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */
 //create the DOM of a tweet element
  function createTweetElement(tweet){
    let $tweet =
    `<article>
      <header>
        <img src='${tweet.user.avatars.small}'>
        <p class='name'>${tweet.user.name}</p>
        <p class='handle'>${tweet.user.handle}</p>
      </header>
      <div class='tweet'>${escape(tweet.content.text)}</div>
      <footer>
        <p class='time'>${calculateDays(tweet.created_at)}</p>
        <div class='items'>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
     </article>`;

    return $tweet;
  }

//loops through tweets
//calls createTweetElement for each tweet
//takes return value and appends it to the tweets container
  function renderTweets(tweets) {
    tweets.forEach(function(item){
      $('.all-tweets').prepend(createTweetElement(item));
    });
  }

  function loadTweets(){
    $.getJSON('http://localhost:8080/tweets', renderTweets);
  };

  loadTweets();

//event listener for tweet button sending data via ajax post
  $('input').click(function() {
    //input by the user can not have 0 or more than 140 chars
    if ($('#input')[0].value.length === 0){
      $.flash('Please enter text!');
    } else if ($('#input')[0].value.length > 140){
      $.flash('Your message has more than 140 characters!');
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('.new-tweet textarea').serialize(),
        success: function (data) {
          //load the tweet that has just been sent by the user
          loadTweets();
        }
      })
      //reset the form and counter
      $('.new-tweet form')[0].reset();
      $(".new-tweet").find(".counter").text(140);
    }
    //don't navigate away from the page
    event.preventDefault();
  });

//event listener for compose button toggeling the new tweet section
  $('.button').click(function() {
    $('.new-tweet').slideToggle("slow", function() {
      $('#input').focus();
    });
  });
})

//prevent cross-site scripting
function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//calculate the days since submission of the tweet
function calculateDays(timestamp){
  let days = Math.floor((Date.now() - timestamp) / 86400000);
  if (days === 1) {
    return `${days} day ago`;
  } else {
    return `${days} days ago`;
  }
}