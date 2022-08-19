const serverURL = "http://localhost/soovle/keyword_trends/scrape.php";
// serverURL = "scrape.php";

$(document).ready(function () {
  $("#analyze").submit(function (e) {
    e.preventDefault();
    let keyword = document.getElementById("search").value;

    onFormSubmit();

    google_trend_request(keyword);
    keywordEveryWhere(keyword);
    google_trend_request_for_line_chart(keyword);

    document.getElementById("titleLinkBody").innerHTML = "";
    suggest(keyword);
    // for KD only
    one_keyword_decode(keyword);

    document.getElementById("titleLinkTable").classList.remove("hidden");
    document.getElementById("titleLinkBody").innerHTML = "";
  });
});

function suggest(k) {
  $.ajax({
    url: "https://suggestqueries.google.com/complete/search",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      q: k,
      client: "chrome",
    },
    success: function (data) {
      let retList = data[1];
      one_keyword_decode(retList[0]);

      retList.map((element) => {
        keyword_decode(element);
      });
    },
  });
}

/**
 * e means number of row. It will 10 or 1
 * k mean keyword
 */
function keyword_decode(k, row) {
  let e = row ? row : 1;

  if (k && e) {
    $.ajax({
      url: "https://suggestqueries.google.com/complete/search",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        q: k,
        client: "chrome",
      },
      success: function (data) {
        $.ajax({
          url: "https://suggestqueries.google.com/complete/search",
          jsonp: "jsonp",
          dataType: "jsonp",
          data: {
            q: k + " a",
            client: "chrome",
          },
          success: function (data1) {
            $.ajax({
              url: "https://suggestqueries.google.com/complete/search",
              jsonp: "jsonp",
              dataType: "jsonp",
              data: {
                q: k + " aa",
                client: "chrome",
              },
              success: function (data2) {
                $.ajax({
                  url: "https://suggestqueries.google.com/complete/search",
                  jsonp: "jsonp",
                  dataType: "jsonp",
                  data: {
                    q: k + " aaa",
                    client: "chrome",
                  },
                  success: function (data3) {
                    let uri =
                      JSON.stringify(data[1]) +
                      "|||" +
                      JSON.stringify(data1[1]) +
                      "|||" +
                      JSON.stringify(data2[1]) +
                      "|||" +
                      JSON.stringify(data3[1]);

                    $.ajax({
                      type: "POST",
                      url: serverURL,
                      data: {
                        keyword: k,
                        row: e,
                        sugdata: uri,
                      },
                      success: function (res) {
                        // console.log(res);

                        let td_link_title = `<td class="py-2 px-4 sm:px-6 text-lg font-medium text-gray-900">${res.keyword}</td>`;
                        let td_kd = `<td class="py-2 px-4 sm:px-6">${res.competition}</td>`;
                        let td_search_volume = `<td class="py-2 px-4 sm:px-6">${res.search_volume}</td>`;
                        let td_cpc = `<td class="py-2 px-4 sm:px-6">$ ${res.cpc}</td>`;
                        document.getElementById("titleLinkBody").innerHTML +=
                          td_link_title + td_search_volume + td_kd + td_cpc;
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  }
}

function one_keyword_decode(k, row) {
  let e = row ? row : 1;

  if (k && e) {
    $.ajax({
      url: "https://suggestqueries.google.com/complete/search",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        q: k,
        client: "chrome",
      },
      success: function (data) {
        $.ajax({
          url: "https://suggestqueries.google.com/complete/search",
          jsonp: "jsonp",
          dataType: "jsonp",
          data: {
            q: k + " a",
            client: "chrome",
          },
          success: function (data1) {
            $.ajax({
              url: "https://suggestqueries.google.com/complete/search",
              jsonp: "jsonp",
              dataType: "jsonp",
              data: {
                q: k + " aa",
                client: "chrome",
              },
              success: function (data2) {
                $.ajax({
                  url: "https://suggestqueries.google.com/complete/search",
                  jsonp: "jsonp",
                  dataType: "jsonp",
                  data: {
                    q: k + " aaa",
                    client: "chrome",
                  },
                  success: function (data3) {
                    let uri =
                      JSON.stringify(data[1]) +
                      "|||" +
                      JSON.stringify(data1[1]) +
                      "|||" +
                      JSON.stringify(data2[1]) +
                      "|||" +
                      JSON.stringify(data3[1]);

                    $.ajax({
                      type: "POST",
                      url: serverURL,
                      data: {
                        keyword: k,
                        row: e,
                        sugdata: uri,
                      },
                      success: function (res) {
                        document.getElementById("kKD").innerHTML =
                          res.competition;
                        // console.log(res);
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  }
}

function onFormSubmit() {
  document.getElementById("section").classList.remove("hidden");
  document.getElementById(
    "formContainer"
  ).innerHTML = `<form class="py-0 px-4 sm:p-4 md:px-10 md:py-4">
                                <div class="px-10">
                                <button type="submit" class="bg-gray-900 font-medium text-white w-full p-2 rounded-full hover:bg-gray-800 border-4 border-transparent focus:border-gray-400">New
                                    Search</button>
                            </div>
                        </form>`;
}
