function google_trend_request(keyword) {
  $.ajax({
    type: "post",
    // url: "http://localhost/soovle/keyword_trends/keywordeverywhere.php",
    url: "keywordeverywhere.php",
    jsonp: "jsonp",
    data: { keyword: keyword },
    success: function (res) {
      // console.log(res);
      let adKd = res.data[0].competition * 100;

      document.getElementById("kVolume").innerHTML = res.data[0].vol;
      document.getElementById("kCPC").innerHTML = res.data[0].cpc.value;
      document.getElementById("kCompetition").innerHTML = adKd;
    },
  });
}
