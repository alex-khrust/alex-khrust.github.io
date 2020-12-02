import $ from 'jquery'; window.jQuery = $; window.$ = $ // import module example (npm i -D jquery)
// require('./other_script.js') // Require Other Script(s) from app/js folder Example
// require ('@fancyapps/fancybox/dist/jquery.fancybox');
// require ('swiper/swiper-bundle');
require ('wowjs/dist/wow');

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
//---------- Preloader -------------------------------------------------------
// $(window).on('load', function () {
//     $preloader = $('.wrap_preloader'),
//         $loader = $preloader.find('.cssload-loader');
//     $loader.fadeOut();
//     $preloader.delay(350).fadeOut('slow');
// });
//------------------------------------------------------------------------------
// Скрипт для присвоения пункту меню класса актив при скролле ---------------
  
  $(document).on("scroll", onScroll);
  
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");
    
    $('a').each(function () {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
    
    var target = this.hash;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top + 2
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });
  
  function onScroll(event) {
    var scrollPosition = $(document).scrollTop();
    $('nav a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('nav ul li a').removeClass("active");
        currentLink.addClass("active");
      }
      else {
        currentLink.removeClass("active");
      }
    });
  }

//-----------------------------------------------------------------------
//Добавление и удаление классов по ширене экрана  ----------
  var wsize = 768
  var windowWidth = $(window).width();
  if (windowWidth < wsize) $("header").addClass("mob-header");
  else $("header").removeClass("mob-header");
  
  $(window).resize(function () {
    var windowWidth = $(window).width();
    if (windowWidth < wsize) $("header").addClass("mob-header");
    else $("header").removeClass("mob-header");
  });
  //----------------------------------------------------------------------------
  //Скрытие хедера при скроле вверх  ------------------------------------
  // var prevScrollpos = window.pageYOffset;
  // window.onscroll = function() {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("header").style.cssText = "top:0; box-shadow:0 0 7px rgba(0,0,0,.3);";
  //   } else {
  //     document.getElementById("header").style.top = "-120px";
  //   }
  //   // if (prevScrollpos > currentScrollPos) {
  //   //   document.getElementsByClassName("mob-header").style.top = "0";
  //   // } else {
  //   //   document.getElementsByClassName("mob-header").style.top = "-100px";
  //   // }
  //   prevScrollpos = currentScrollPos;
  // };

  ;( function ( document, window, index )
	{
		'use strict';

		var elSelector	= '.mob-header',
			element		= document.querySelector( elSelector );

		if( !element ) return true;

		var elHeight		= 0,
			elTop			= 0,
			dHeight			= 0,
			wHeight			= 0,
			wScrollCurrent	= 0,
			wScrollBefore	= 0,
			wScrollDiff		= 0;

		window.addEventListener( 'scroll', function()
		{
			elHeight		= element.offsetHeight;
			dHeight			= document.body.offsetHeight;
			wHeight			= window.innerHeight;
			wScrollCurrent	= window.pageYOffset;
			wScrollDiff		= wScrollBefore - wScrollCurrent;
			elTop			= parseInt( window.getComputedStyle( element ).getPropertyValue( 'top' ) ) + wScrollDiff;

			if( wScrollCurrent <= 0 ) // scrolled to the very top; element sticks to the top
				element.style.top = '0px';

			else if( wScrollDiff > 0 ) // scrolled up; element slides in
				element.style.top = ( elTop > 0 ? 0 : elTop ) + 'px';

			else if( wScrollDiff < 0 ) // scrolled down
			{
				if( wScrollCurrent + wHeight >= dHeight - elHeight )  // scrolled to the very bottom; element slides in
					element.style.top = ( ( elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0 ) + 'px';

				else // scrolled down; element slides out
					element.style.top = ( Math.abs( elTop ) > elHeight ? -elHeight : elTop ) + 'px';
			}

			wScrollBefore = wScrollCurrent;
		});

	}( document, window, 0 ));
//----------------------------------------------------------------------------
//------------ wow.js ---------------------------------------------
// Для упрощения добавления одинаковым элементам классов анимации - добавляю их с помощью jQuery.
  $(function () {
    $('section').addClass('wow fadeInUp');
    $('.topic').addClass('wow flipInY');
  });
  
  wow = new WOW(
    {
      boxClass: 'wow',      // default
      animateClass: 'animated', // default
      offset: 150,          // default
      mobile: false,       // default
      live: true        // default
    }
  );
  wow.init();
//-------------------------------------------------------------------------
//------------ menu hamburger ----------------------------------
  $("#navToggle").click(function () {
    $(this).toggleClass("active");
    $(".top-nav").toggleClass("open");
    $("body").toggleClass("locked");
  });
  $(".top-nav").click(function () {
    $(this).removeClass("active");
    $("#navToggle").removeClass("active");
    $(".top-nav").removeClass("open");
    $("body").removeClass("locked");
  });
//---------------------------------------------------------------------------
  // window.replainSettings = { id: '0fb0562e-fab7-4e25-9136-9c6eb3bebbfb' };
  // (function(u){var s=document.createElement('script');s.type='text/javascript';s.async=true;s.src=u;
  //   var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
  // })('https://widget.replain.cc/dist/client.js');
//--------------------------------------------------------------------------
});