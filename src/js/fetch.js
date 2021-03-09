fetch("https://ocean.taiwan.gov.tw/OacGA_HF/ocatwgatotalpageviews.json")
.then(res => {
  return res.json();
}).then(result => {
  let pageViews = result.pageviews
  $('#pageViews').text(pageViews);
})
