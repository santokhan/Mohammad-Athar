function google_trend_request_for_line_chart(keyword) {
  $.ajax({
    type: "post",
    // url: "http://localhost/soovle/keyword_trends/rapidapi.php",
    url: "rapidapi.php",
    jsonp: "jsonp",
    data: { keyword: keyword },
    success: function (response) {
      // console.log(response);
      const { timelineData } = response.default;

      let yearKd = [];
      let range = 0;
      let lowRange = 0;

      while (range < timelineData.length) {
        lowRange = range;
        range += 12;
        let split = timelineData.slice(lowRange, range);
        let sum = 0;
        let month = 0;
        split.map((e, i) => {
          sum += e.value[0];
          month++;
        });
        let average = sum / month;
        yearKd.push(average.toFixed(0));
        // console.log([lowRange, range]);
        // console.log(month);
      }
      console.log(yearKd);
      lineArt(yearKd);
    },
  });
}

function lineArt(data) {
  document.getElementById(
    "lineChart"
  ).innerHTML = `<canvas id="myChart" style="max-height: 300px;"></canvas>`;

  const lineChartLabels = [
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];

  const lineData = {
    labels: lineChartLabels,
    datasets: [
      {
        label: "Popularity 1-100",
        backgroundColor: "#3366cc",
        borderColor: "#3366cc",
        data: data
          ? data
          : [
              10, 10, 12, 4, 20, 25, 45, 34, 40, 4, 10, 10, 4, 20, 40, 4, 10,
              20, 10,
            ],
      },
    ],
  };
  const config = {
    type: "line",
    data: lineData,
    options: {},
  };

  let myChart = new Chart(document.getElementById("myChart"), config);
}

lineArt();
