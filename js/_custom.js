document.addEventListener("DOMContentLoaded", function() {

	// Custom JS
  
  
  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
  
  //Добавление и удаление классов по ширене экрана  ----------
  var windowWidth = $(window).width();
  if (windowWidth < 992) $(".topnav-wrap").addClass("mob-menu");
  else $(".topnav-wrap").removeClass("mob-menu");
  
  $(window).resize(function () {
    var windowWidth = $(window).width();
    if (windowWidth < 992) $(".topnav-wrap").addClass("mob-menu");
    else $(".topnav-wrap").removeClass("mob-menu");
  });
//----------------------------------------------------------------------------
// Hamburger -----------------------------------------
  $('.hamburger').click(function() {
    $(this).toggleClass('active');
    $('.topnav-wrap').toggleClass('open');
  });
//----------------------------------------------------------------------------
  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

});
