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
  scrollTop(),
  show(),
  readMore()
});

