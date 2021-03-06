fetch("https://ocean.taiwan.gov.tw/OacGA_HF/ocatwgatotalpageviews.json")
.then(res => {
  return res.json();
}).then(result => {
  let pageViews = result.pageviews
  $('#pageViews').text(pageViews);
})

fetch("https://ocean.taiwan.gov.tw/OpenData/CWB_Typhoon/json/W-C0034-001_002.json")
.then(res => {
  return res.json();
}).then(data => {
  const urgency = ["Immediate","Expected","Future","Past","Unknown"]
  //調完樣式改為Immediate、Expected、Future，Past、Unknown為不須顯示警報
  if (urgency.includes("Past","Unknown")) {
    let output = document.getElementById('marquee').innerHTML
    data.cap.forEach(function(post) {
      output += `
        <span class="px-2 rounded-pill">
        ${post.description.split('[注意事項]',1)}
        </span>
      `
      console.log(post.description);
      document.getElementById('marquee').innerHTML = output;
    });
  }
})
