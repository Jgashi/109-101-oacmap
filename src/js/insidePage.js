//內頁籤切換
// function tabChange(){
//   $(".tab").on("click", function(e){
//   e.preventDefault();

//   /* 將頁籤列表移除所有 -on，再將指定的加上 -on */
//   $(this).closest(".activity-tabList").find(".tab").removeClass("-on style-on");
//   $(this).addClass("-on style-on");
  
//   /* 找到對應的頁籤內容，加上 -on 來顯示 */
//   $(".activity-tabContents").removeClass("-on");
//   $(".activity-tabContents." + $(this).attr("data-target")).addClass("-on");
// });
// }



$('.tab').on('click', function (e) {
  
  e.preventDefault();
  $(this).addClass('active'); //頁籤+active
  $(this).siblings().removeClass('active'); //其他頁籤remove
  $(this).parent().siblings().children().removeClass('active'); //手機板其他頁籤remove
  
  text = $(this).text();
  console.log(text);
  target = $(this).attr('href');
  $('#buttontext').text(text);
  $('.tab-content > div').not(target).hide(); //其他頁籤內容hide
  
  $(target).fadeIn(600); //頁切內容fadeIN
});


