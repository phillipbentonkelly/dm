<?php

  $email = $_POST['email'];

	$mid = '10790730';
	// list id
	$lid = '19196655';

	$service_url = 'http://pages.exacttarget.com/bgcenterstage/';

  curl_init($service_url);

  $post_data = array(
    'a' => 'sub',
    'm' => $mid,
    'l' => $lid,
    'e' => $email,
    'o' => 'j'
  );

	curl_init($service_url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POST, true);
  $curl_response = curl_exec($curl);
  echo json_encode($curl_response);

?>