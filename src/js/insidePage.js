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
  
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
  $(this).parent().siblings().children().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
