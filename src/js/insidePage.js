function scrollTop() {
  var scrollTop = $(".scrollTop");
  
  $(window).scroll(function() {
    var topPos = $(this).scrollTop();
  
    if (topPos > 100) {
      $(scrollTop).css("opacity", "1");
  
    } else {
      $(scrollTop).css("opacity", "0");
    }
  
  }); 
  
  $(scrollTop).click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 100);
    return false;
  
  });
}


function tabChang() {
  $('.tab').on('click', function (e) {
    
    e.preventDefault();
    $(this).addClass('active'); //頁籤+active
    $(this).siblings().removeClass('active'); //其他頁籤remove
    $(this).parent().siblings().children().removeClass('active'); //手機板其他頁籤remove
    
    text = $(this).text();
    $('#buttontext').text(text);
    target = $(this).attr('href');
    $('.tab-content > div').not(target).hide(); //其他頁籤內容hide
    
    $(target).fadeIn(600); //頁切內容fadeIN
  });

}


$(function(){
  scrollTop(),
  tabChang()
});


