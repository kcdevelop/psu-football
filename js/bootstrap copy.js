$(document).ready(function() {

  var win = $(window);
  var posterBlock = $(".poster, .title-overlay");
  var videoBlock = $(".video-feature");
  var video = document.getElementById("featured-video");
  var games = $(".schedule-block > a");
  var play = $(".feature-block .title-overlay > a");
  
    function switchPoster(event) {

    event.preventDefault();

    posterBlock.css("display", "none");
    videoBlock.css("display", "block");
    
    videoPlay();
  }

    function videoCheck() {

    if (video.ended) {  
      videoBlock.css("display", "none");
      posterBlock.css("display", "block");
    } 
  }

  function videoPlay() {

    if (video.pause) {  
      video.play(); 
    } 
  }

  function videoPause() {
    video.pause();
  }

  function scheduleCtl() {

  }

  win.scroll(function() {

    var test = win.scrollTop();

    if(videoBlock.css("display") == "block" && test >= 100) {
      videoPause();
    } else if(videoBlock.css("display") == "block" && video.ended == false && test <= 100) {
      videoPlay();
    } else {}
  });

    play.on("click", switchPoster);

    video.addEventListener("ended", videoCheck, false);

});


