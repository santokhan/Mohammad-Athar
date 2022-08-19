let monthVolume = [
  ["Month", "Volume", { role: "style" }],
  ["Jan", 8, "#3366cc"],
  ["Feb", 8, "#3366cc"],
  ["Mar", 10, "#3366cc"],
  ["Apr", 19, "#3366cc"],
  ["May", 21, "#3366cc"],
  ["Jun", 21, "#3366cc"],
  ["July", 40, "#3366cc"],
  ["Aug", 35, "#3366cc"],
  ["Sep", 45, "#3366cc"],
  ["Oct", 91, "#3366cc"],
  ["Nov", 75, "#3366cc"],
  ["Dec", 75, "#3366cc"],
];

function keywordEveryWhere(keyword) {
  $.ajax({
    type: "post",
    url: "http://localhost/soovle/keyword_trends/keywordeverywhere.php",
    // url: "keywordeverywhere.php",
    jsonp: "jsonp",
    data: { keyword: keyword },
    success: function (response) {
      const { trend } = response.data[0];
      // console.log(trend);
      monthVolume = [
        ["Month", "Volume", { role: "style" }],
        [trend[0].month.slice(0, 3), trend[0].value, "#3366cc"],
        [trend[1].month.slice(0, 3), trend[1].value, "#3366cc"],
        [trend[2].month.slice(0, 3), trend[2].value, "#3366cc"],
        [trend[3].month.slice(0, 3), trend[3].value, "#3366cc"],
        [trend[4].month.slice(0, 3), trend[4].value, "#3366cc"],
        [trend[5].month.slice(0, 3), trend[5].value, "#3366cc"],
        [trend[6].month.slice(0, 3), trend[6].value, "#3366cc"],
        [trend[7].month.slice(0, 3), trend[7].value, "#3366cc"],
        [trend[8].month.slice(0, 3), trend[8].value, "#3366cc"],
        [trend[9].month.slice(0, 3), trend[9].value, "#3366cc"],
        [trend[10].month.slice(0, 3), trend[10].value, "#3366cc"],
        [trend[11].month.slice(0, 3), trend[11].value, "#3366cc"],
      ];
      // console.log(monthVolume);
      drawBasic();
    },
  });
}

google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(drawBasic);
function drawBasic() {
  var data = new google.visualization.DataTable();
  data.addColumn("timeofday", "Month of Year");
  data.addColumn("number", "Total");

  var data = google.visualization.arrayToDataTable(monthVolume);

  var options = {
    title: "",
    hAxis: {
      title: "",
      format: "",
      viewWindow: {
        min: [7, 30, 0],
        max: [17, 30, 0],
      },
    },
    vAxis: {
      title: "Last 12 Month Volume",
    },
  };

  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_column")
  );

  chart.draw(data, options);
}
