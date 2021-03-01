// //活動申請
// function showActBox(){
//   $('#activity').on('click',function(){
//     $('.activity').css('display','block');
//   });
// }
// //氣象海情
// function showWeatherBox(){
//   $('#weatherPage').on('click',function(){
//     $('.weather').css('display','block');
//   });
// };

// //內頁籤切換
// function tabChange(){
//     $(".tab").on("click", function(e){
//     e.preventDefault();

//     /* 將頁籤列表移除所有 -on，再將指定的加上 -on */
//     $(this).closest(".activity-tabList").find(".tab").removeClass("-on style-on");
//     $(this).addClass("-on style-on");
    
//     /* 找到對應的頁籤內容，加上 -on 來顯示 */
//     $(".activity-tabContents").removeClass("-on");
//     $(".activity-tabContents." + $(this).attr("data-target")).addClass("-on");
//   });
// }

function readMore(){
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  $("#myBtn").on("click",function(e){
    e.preventDefault();
    if (dots.style.display === "none") {
      // dots.style.display = "inline";
      $("#dots").toggle();
      btnText.innerHTML = "更多"
      // moreText.style.display = "none";
      $("#more").slideToggle(1000);
    } else {
      $("#dots").toggle();
      // dots.style.display = "none";
      btnText.innerHTML = "顯示較少";
      // moreText.style.display = "inline";
      $("#more").slideToggle(1000);
    }
  });
};

function show(){
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");
  var w = window.innerWidth;
  if (w > 768) {
    dots.style.display = "none";
    btnText.innerHTML = "顯示較少";
    moreText.style.display = "inline";
    // moreText.show();
  } else {
    dots.style.display = "inline";
    btnText.innerHTML = "更多"
    moreText.style.display = "none";
    // moreText.hidden();
  }
}

$(function() {
  show(),
  readMore()
  // localStorage.setItem('myCat', 'Tom');
  // showLow(),
  // showWeatherBox(),
  // showActBox(),
  // tabChange()
});

// export { Portal };
