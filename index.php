<?php

header('Access-Control-Origin-Allow: *');
header("Content-Type: application/json");
set_time_limit(10);
$site = $_GET['site'];
if ($site) {
    $query_array = [
        'site' => $site,
        'se' => 1,
        'sort_type' => 'asc',
        'sort_date' => 1,
        'top_filter' => 500,
        'sort_by' => 'pos',
        'pos_filter' => 'all',
        'key' => 'EftJQkfD1BPKhRiUjv3hk9CnBDs13frHH0GA7qFz7enmyurxuAj2pRWfQo4vuNqL9CIAUBVyh33rGbwG',
    ];
    $query_parameter = http_build_query($query_array, '&');
    $url = "https://kwinside.com/api/v1/serp/keywords/list?$query_parameter";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    echo $response = curl_exec($ch);
    curl_close($ch);
    // echo json_encode($response);
}
