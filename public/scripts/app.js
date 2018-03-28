$(document).ready(function () {
  /*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */
  function createTweetElement(tweet){
    let $tweet =
    `<article>
      <header>
        <img src='${tweet.user.avatars.small}'>
        <p class='name'>${tweet.user.name}</p>
        <p class='user'>${tweet.user.handle}</p>
      </header>
      <div>${tweet.content.text}</div>
      <footer>
        <p class='time'>${tweet.created_at}</p>
        <div class='items'>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
     </article>'`;

    return $tweet;
  }

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(function(item){
      $('.all-tweets').prepend(createTweetElement(item));
    });
  }

  //event listener for tweet button sending data via ajax
  $(function() {
    var $button = $('input');
    $button.on('click', function (event) {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('textarea').serialize(),
        success: function (data) {
          console.log('Success: ', data);
        }
      });
      //don't navigate away from the page
      event.preventDefault();
    });
  });

  function loadTweets(){
    $.getJSON('http://localhost:8000/tweets', function (data) {
        renderTweets(data);});
    //$.ajax({
    //  dataType: 'json',
    //  url: 'http://localhost:8080/tweets',
    //  method: 'GET',
    //  data: data,
    //  success: function (data) {
    //    console.log("okay get");
    //    //console.log('Success: ', data);
    //    renderTweets(data);
    //  }
    //});
  };

  loadTweets();
})