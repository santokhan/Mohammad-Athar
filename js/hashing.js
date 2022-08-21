function hashingAPI(domain) {
  $.ajax({
    type: "post",
    url: "http://localhost/soovle/website_keyword_finder/hashing.php",
    data: { domain: domain },
    dataType: "dataType",
    success: function (res) {
      let { pda, upa } = res;
      console.log(data);
      setTimeout(() => {
        document.getElementById("DA").innerHTML = pda ? pda : "Empty";
        document.getElementById("PA").innerHTML = upa;
      }, 1000);
    },
  });
}
