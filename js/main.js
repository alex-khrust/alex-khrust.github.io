$(document).ready(function () {
//---------- Preloader -------------------------------------------------------
// $(window).on('load', function () {
//     $preloader = $('.wrap_preloader'),
//         $loader = $preloader.find('.cssload-loader');
//     $loader.fadeOut();
//     $preloader.delay(350).fadeOut('slow');
// });
//------------------------------------------------------------------------------
// Скрипт для присвоения пункту меню класса актив ------------------------------
  
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
  var windowWidth = $(window).width();
  if (windowWidth < 1280) $("#menu").addClass("mob-menu");
  else $("#menu").removeClass("mob-menu");
  
  $(window).resize(function () {
    var windowWidth = $(window).width();
    if (windowWidth < 1280) $("#menu").addClass("mob-menu");
    else $("#menu").removeClass("mob-menu");
  });
//----------------------------------------------------------------------------
//------------ wow.js --------------
// Для упрощения добавления одинаковым элементам классов анимации - добавляю их с помощью jQuery.
  $(function () {
    // $('section') .addClass('wow fadeInUp');
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
//------------ menu hamburger -----------
  $("#navToggle").click(function () {
    $(this).toggleClass("active");
    $(".mob-menu").toggleClass("open");
    // this line ▼ prevents content scroll-behind
    $("body").toggleClass("locked");
  });
//---------------------------------------------------------------------------
//------------ svg animation -------------------
  var tl = new TimelineMax();
  var bgd = $('#background rect, header');
  var table = $('#table_legs, #table');
  var lampLeg = $('#lamp > .lamp-leg');
  var lampbt = $('#lamp-bottom');
  var lampLight = $('#lamp > .light');
  var lampLine = $('#lamp-line');
  var lampLineB = $('#lamp-line-b');
  var lampLineT = $('#lamp-line-t');
  var lampCircle = $('#lamp-circle');
  var lampHead = $('#lamp-head');
  var lampHeader = $('#lamp-header');
  var lampBody = $('#lamp-body');
  var computer = $('#computer > *');
  var keyboard = $('#keyboard > *');
  var asset = $('#computer_mouse > * , #coffee_mug > *');
  
  tl.from(bgd, 0.2, {opacity: 0, scale: 0, transformOrigin: 'center center'})
    .staggerFrom(table, 0.2, {y: "-=200", opacity: 0, ease: Elastic.easeOut}, 0.1)
    .from(lampLeg, 0.2, {opacity: 0, x: "-200", ease: Elastic.easeOut})
    .from(lampbt, 0.2, {opacity: 0, scale: 0, transformOrigin: 'center center'})
    .from(lampLineB, 0.3, {opacity: 0, transformOrigin: '100% 100%', rotation: '-180deg'})
    .from(lampCircle, 0.1, {opacity: 0, x: '-=100', y: '-=100'})
    .from(lampLineT, 0.3, {opacity: 0, transformOrigin: '0% 100%', rotation: '-180deg'})
    .from(lampHead, 0.2, {opacity: 0, scale: 0, ease: Elastic.easeOut})
    .from(lampHeader, 0.5, {transformOrigin: '60% 60%', rotation: '60deg'})
    .from(lampBody, 0.5, {transformOrigin: '70% 70%', rotation: '-25deg'})
    .staggerFrom(computer, 1, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Back.easeOut}, 0.2)
    .staggerFrom(keyboard, 0.5, {opacity: 0, y: '-=100', ease: Linear.easeInOut}, 0.05)
    .staggerFrom(asset, 0.5, {opacity: 0}, 0.05)
    .to(lampLight, 0.2, {opacity: 0.8, ease: Elastic.easeOut, delay: 0.5}, "a")
    .to(lampLight, 0.1, {opacity: 0}, "b")
    .to(lampLight, 0.1, {opacity: 0.2}, "c")
    .to(bgd, 0.2, {opacity: 0.1, delay: 0.5}, "a-=0.05")
    .to(bgd, 0.1, {opacity: 1}, "b-=0.05")
    .to(bgd, 0.1, {opacity: 0.5}, "c-=0.05")
    .to(bgd, 0.2, {opacity: 1, fill: '#FDD10D', background: '#FDD10D'})
    .fromTo(lampLine, 0.2, {opacity: 0}, {opacity: 0.2, delay: 0.5}, "a-=0.05")
    .to(lampLine, 0.1, {opacity: 1}, "b-=0.05")
    .to(lampLine, 0.1, {opacity: 0.5}, "c-=0.05");
//-------------------------------------------------------------------------------
//---------------- fullPage -----------------------------------------
  $('#fullpage').fullpage({
    anchors: ['about', 'services', 'portfolio', 'contacts'],
    // menu: '#menu',
    // css3: true,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Приветствие', 'Услуги', 'Порфолио', 'Контакты'],
    scrollOverflow: true,
    sectionSelector: '.section',
    slideSelector: '.slide',
    slidesNavigation: true,
    responsiveHeight: 330,
    scrollBar:true,
    // scrollOverflowReset: true,
    // offsetSections: true,
    afterRender: function(index, nextIndex, direction){
      var el = $('section');
      el.paroller({
        factor: 0.5,
        type: 'background',
        direction: 'vertical'
      });
    },
    /* We need reinitialize paroller on window resize event */
    afterResize: function() {
      var el = $('section');
      el.paroller({
        factor: 0.5,
        type: 'background',
        direction: 'vertical'
      });
    }
  });
//-------------------------------------------------------------------------------
});
