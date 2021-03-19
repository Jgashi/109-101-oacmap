fetch("https://ocean.taiwan.gov.tw/OacGA_HF/ocatwgatotalpageviews.json")
.then(res => {
  return res.json();
}).then(result => {
  let pageViews = result.pageviews
  $('#pageViews').text(pageViews);
})

fetch("https://ocean.taiwan.gov.tw/OpenData/CWB_Typhoon/json/W-C0034-001_002.json")
.then(res => {
  console.log(res);
  return res.json();
}).then(data => {
  console.log(data);
  console.log(data.cap)
  let output = document.getElementById('marquee').innerHTML
  data.cap.forEach(function(post) {
    output += `
    <div class="py-1 px-2 rounded-pill">
    ${post.description}
    </div>
    `
    //output.replace(/\。/g,'。<br>');
    var a = typeof(post.description.replace(/\。/g,'。<br>'));
    console.log(a);
    console.log(post.description);
    
    document.getElementById('marquee').innerHTML = output;
    console.log(output);
  });
})
