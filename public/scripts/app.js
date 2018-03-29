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
      <div>${escape(tweet.content.text)}</div>
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
      //reset the form and don't navigate away from the page
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
          console.log($('.new-tweet textarea'));
            //console.log('Success: ', data);
            //load the tweet that has just been sent
            loadTweets();
          }
        })
        $('.new-tweet form')[0].reset();
      }
      event.preventDefault();
    });
  });

  function loadTweets(){
    $.getJSON('http://localhost:8000/tweets', renderTweets);
  };

  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function calculateDays(timestamp){
    let days = Math.floor((Date.now() - timestamp) / 86400000);

    if (days === 1) {
      return `${days} day ago`;
    } else {
      return `${days} days ago`;
    }
  }
  loadTweets();
})