$(document).ready(function () {
  /*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  function createTweetElement(tweet){
    var $tweet = $('<article />');
    var $header = $('<header />');
    var $image = $('<img />').attr('src', tweet.user.avatars.small);
    var $name = $('<p />').addClass('name').html(tweet.user.name);
    var $user = $('<p />').addClass('user').html(tweet.user.handle);
    $header.append($image).append($name).append($user);

    var $message = $('<div />').html(tweet.content.text);
    var $footer = $('<footer />');
    var $time = $('<p />').addClass('time').html(tweet.created_at);
    $footer.append($time);

    $tweet.append($header).append($message).append($footer);
    $('.all-tweets').append($tweet);
  }

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  //$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})