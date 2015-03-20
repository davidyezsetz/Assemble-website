(function($) {

  'use strict';

  // template for a tweet
  var template = '' +
    '<div>' +
      '<p class="tweets__tweet">{{body}}</p>' +
      '<div class="tweets__user">' +
        '<a href="https://twitter.com/{{user_screenname}}" aria-label="{{user_name}} (screen name: {{user_screenname}})">' +
          '<span><span>{{user_name}}</span></span>' +
          '<span> @{{user_screenname}}</span>' +
        '</a>' +
      '</div>' +
      '<p class="tweets__timePosted">Posted on {{date}}</p>' +
      '<p class="tweets__interact">' +
        '<a href="https://twitter.com/intent/tweet?in_reply_to={{id}}" class="twitter_reply_icon" target="_blank">Reply</a>' +
        '<a href="https://twitter.com/intent/retweet?tweet_id={{id}}" class="twitter_retweet_icon" target="_blank">Retweet</a>' +
        '<a href="https://twitter.com/intent/favorite?tweet_id={{id}}" class="twitter_fav_icon" target="_blank">Favorite</a>' +
      '</p>' +
    '</div>';

  // DOM id for twitter feed
  var tweetFeed = $('#tweets');

  /**
   * ajax response handler
   * @var array tweets
   * @return void
   */
  function handleTweets(tweets) {

    var html = '';
    var tweetHtml = '';
    var body = '';
    $.each(tweets, function(i, tweet) {
      tweetHtml = template;

      body = __parseLinks(tweet.body);
      body = __parseUsers(body);
      body = __parseHashtags(body);
      tweet.body = body;

      tweet.date = __parseDate(tweet.date);

      $.each(tweet, function(key, value) {
        tweetHtml = tweetHtml.replace(new RegExp('{{' + key + '}}', 'g'), value);
      });

      html += tweetHtml;

    });
    
    // insert gen. html to the DOM
    tweetFeed.html(html);

    // setup slick slider
    tweetFeed.slick({
      autoplay: false,
      autoplaySpeed: 5000
    });

  }

  /**
   * fetch tweets from API
   * @return void
   */
  function fetchTweets() {
    $.ajax({
      dataType: 'json',
      url: 'inc/twitter.php',
      success: function(res) {
        // check if something came back
        if (res !== null) {
          handleTweets(res);
        }
      }
    });
  }

  /**
   * parse links
   * @param string text
   * @return string text
   */
  function __parseLinks(text) {
    return text.replace(
      /(https?:\/\/([-\w\.]+)+(\/([\w\/_\.]*(\?\S+)?(#\S+)?)?)?)/gi,
      '<a href="$1" target="_blank">$1</a>'
    );
  }

  /**
   * parse users
   * @param string text
   * @return string text
   */
  function __parseUsers(text) {
    return text.replace(
      /@(\w+)/gi,
      '<a href="http://twitter.com/$1" target="_blank">@$1</a>'
    );
  }

  /**
   * parse hashtags
   * @param string text
   * @return string text
   */
  function __parseHashtags(text) {
    return text.replace(
      /\s+#(\w+)/gi,
      '<a href="http://search.twitter.com/search?q=%23$1" target="_blank">#$1</a>'
    );
  }

  /**
   * parse date
   * @param string date
   * @return string text
   */
  function __parseDate(date) {
    var parts = date.split(' ');
    return parts[2] + ' ' + parts[1];
  }

  fetchTweets();
  
})(jQuery);
