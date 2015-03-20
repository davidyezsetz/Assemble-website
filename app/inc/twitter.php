<?php

// include twitter API
// see: https://github.com/J7mbo/twitter-api-php
// docs: https://dev.twitter.com/rest/public
require_once('TwitterAPIExchange.php');

// path for cache file
$cacheFileName = 'tweets.json';

// cache lifetime
// 60 seconds * 60 minutes * 24 hours * 7 days
$cacheLifeTime = 60 * 60 * 24 * 7;

// update cache
if (time() - filemtime($cacheFileName) > $cacheLifeTime || filesize($cacheFileName) === 0) {
	// config
	$config = array(
		'screen_name' => 'i_pioneers',
		'count' => 10,
		'include_rts' => 0,
		'exclude_replies' => 1
	);

	// twitter oauth/consumer settings
	$settings = array(
		'oauth_access_token' => "273874281-NlLVPjsoChS8nWdTNFZFT2ZdJ9GZqUKxjQYHdqxi",
		'oauth_access_token_secret' => "Lp5P3z13bArlWfnlx7qJ0EtuxT5D2dVWEOGyMp6ttiJCr",
		'consumer_key' => "fZC4fy2Oh3P1JfJDVgiBMkXm9",
		'consumer_secret' => "pK8KBgB756eNTfIx1kAJ2u3dmwVKOLVgwqSMtEpUzP3fMZfyHZ"
	);

	// request settings
	$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
	$getfield = '?screen_name=' . $config['screen_name'] . '&count=' . $config['count'] . '&include_rts=' . $config['include_rts'] . '&exclude_replies=' . $config['exclude_replies'];
	$requestMethod = 'GET';

	// create an instance of TwitterAPIExchange
	$twitter = new TwitterAPIExchange($settings);

	// do request
	$tweets = json_decode($twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest());
	
	// minimize output
	$response = array();
	foreach($tweets as $tweet) {
		$response[] = array(
			'id' => $tweet->id,
			'body' => $tweet->text,
			'user_screenname' => $tweet->user->screen_name,
			'user_name' => $tweet->user->name,
			'date' => $tweet->created_at
		);
	}

	// write cache
	file_put_contents($cacheFileName, json_encode($response));

}
// fetch from cache
else {
	$response = json_decode(file_get_contents($cacheFileName));
}

echo json_encode($response); die;






