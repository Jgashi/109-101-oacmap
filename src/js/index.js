//活動申請
function showActBox(){
  $('#activity').on('click',function(){
    $('.box-shadow').css('display','block');
    $('.activity').css('display','block');
  });
}
//氣象海情
function showWeatherBox(){
  $('#weatherPage').on('click',function(){
    $('.box-shadow').css('display','block');
    $('.weather').css('display','block');
  });
};
//關閉
function closeBox(){
  $('.fa-times').on('click',function(){
    $('.box-shadow').css('display','none');
    $('.activity').css('display','none');
    $('.weather').css('display','none');
  });
  $('.box-shadow').on('click',function(){
    $('.box-shadow').css('display','none');
    $('.activity').css('display','none');
    $('.weather').css('display','none');
  });
};

//內頁籤切換
function tabChange(){
    $(".tab").on("click", function(e){
    e.preventDefault();

    /* 將頁籤列表移除所有 -on，再將指定的加上 -on */
    $(this).closest(".activity-tabList").find(".tab").removeClass("-on style-on");
    $(this).addClass("-on style-on");
    
    /* 找到對應的頁籤內容，加上 -on 來顯示 */
    $(".activity-tabContents").removeClass("-on");
    $(".activity-tabContents." + $(this).attr("data-target")).addClass("-on");
  });
}

//判斷是否為首次登入




$(function() {
  new jBox('Tooltip', {
    attach: '.tooltip',
    maxWidth: '400px',
    getContent: 'data-jbox-content',
    position: {
      x: 'right',
      y: 'center'
    },
    outside: 'xy'
  });
  localStorage.setItem('myCat', 'Tom');
  // showLow(),
  showWeatherBox(),
  closeBox(),
  showActBox(),
  tabChange()
});

// export { Portal };
