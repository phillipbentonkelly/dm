<?php
$feed = "{}";
$feedDomain = "http://devedit.boston.com";
$feedURI = "/real-estate/feeds";
$feedParam = "/keywords";


if (isset($_GET["env"]) && $_GET["env"]=="dev") {
	$feedDomain = "http://devedit.boston.com";
} else if (isset($_GET["env"]) && $_GET["env"]=="qa") {
	$feedDomain = "http://qaedit.boston.com";
} else if (isset($_GET["env"]) && $_GET["env"]=="prod") {
	$feedDomain = "http://www.boston.com";
} else if (isset($_GET["env"]) && $_GET["env"]=="prod0") {
	$feedDomain = "http://r.prodedit.boston.com";
} else if (isset($_GET["env"]) && $_GET["env"]=="prod1") {
	$feedDomain = "http://bdcweb1.boston.com";
} else if (isset($_GET["env"]) && $_GET["env"]=="prod2") {
	$feedDomain = "http://bdcweb2.boston.com";
} else if (isset($_GET["env"]) && $_GET["env"]=="prod3") {
	$feedDomain = "http://bdcweb3.boston.com";
} else if (isset($_GET["env"]) && $_GET["env"]=="prod4") {
	$feedDomain = "http://bdcweb4.boston.com";
}

if  (isset($_GET["name"]) && $_GET["name"]=="related-articles") {
	$feedURI = "/real-estate/feeds/related-articles";

	if (isset($_GET["keywords"])) {
		$feedParam = "/keywords/" . str_replace(" ","%20", $_GET["keywords"]);
	} else if (isset($_GET["id"])) {
		$feedParam = "/id/" . $_GET["id"];
	}
}

$feedURL = $feedDomain . $feedURI . $feedParam;


$feed = file_get_contents($feedURL);

ob_clean();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
print $feed;

ob_start();
ob_end_clean();
?>