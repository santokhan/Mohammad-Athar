let fileTitle = "data"; // or 'my-unique-title'
let itemsFormatted = [];
let headers = {
  kw: "Keywords",
  pos: "Position",
  popularity: "Volume",
  site: "Link",
};

function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = this.convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + ".csv" || "export.csv";

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function beforeCreateCSV(kwindsideResponse) {
  let itemsNotFormatted = kwindsideResponse.data.results;

  // format the data
  itemsNotFormatted.forEach((item) => {
    itemsFormatted.push({
      kw: item.kw.replace(/,/g, ""), // remove commas to avoid errors,
      pos: item.data[0].pos,
      popularity: item.data[0].searches,
      site: item.data[0].site + item.data[0].site,
    });
  });
  // console.log(itemsFormatted);

  document.getElementById("downloadCSV").addEventListener("click", function () {
    exportCSVFile(headers, itemsFormatted, fileTitle);
  });
}

$(document).ready(function () {
  // beforeCreateCSV(kwindsideResponse);
});
