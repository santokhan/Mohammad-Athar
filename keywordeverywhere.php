<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// API request 
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (isset($_POST['keyword'])) {
        $keyword = $_POST['keyword'];
    } else {
        $keyword = file_get_contents("php://input");
        $keyword = json_decode($keyword, true);
    }

    $ch = curl_init('https://api.keywordseverywhere.com/v1/get_keyword_data');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept: application/json',
        'Authorization: Bearer 58dc40a5413c50ed6bcb'
    ));

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt(
        $ch,
        CURLOPT_POSTFIELDS,
        urldecode(http_build_query([
            "dataSource" => "gkp",
            "country" => "us",
            "currency" => "USD",
            "kw" => [$keyword]
        ]))
    );

    $data = curl_exec($ch);
    $err = curl_error($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    if ($info['http_code'] == 200) {
        echo  $data;
    } else {
        echo "An error occurred.\n\n" . $data;
    }
} else {
    $_POST['keyword'];
}
