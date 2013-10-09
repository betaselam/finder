<?php
// Is it a POST or a GET?
$url = ($_POST['requestURL']) ? $_POST['requestURL'] : $_GET['requestURL'];

// Open the Curl session
$session = curl_init($url);
$postvars =$_POST['postRequest'];

if ($_POST['requestURL']) {
	$postvars =urldecode( $_POST['postRequest']);
	curl_setopt ($session, CURLOPT_POST, true);
	curl_setopt ($session, CURLOPT_POSTFIELDS, $postvars);
}

// Don't return HTTP headers. Do return the contents of the call
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);

	
// Make the call
$response = curl_exec($session);
 //echo $xml;

// The web service returns XML. Set the Content-Type appropriately
//header("Content-Type: text/xml");

echo $response;
curl_close($session);

?>