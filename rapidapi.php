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
    $keyword_query = http_build_query(["keyword" => $keyword]);

    request_google_trend($keyword_query);
} else {
    $_POST['keyword'];
}


function request_google_trend(string $keyword_query)
{
    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => "https://google-trend-api.p.rapidapi.com/interestOverTime?$keyword_query&geo=US",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "X-RapidAPI-Host: google-trend-api.p.rapidapi.com",
            "X-RapidAPI-Key: 05bb1d5c6bmsh948baf462b154a2p1aaaf9jsna7f9861821fe"
        ],
    ]);


    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);


    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        echo $response;
    }
}