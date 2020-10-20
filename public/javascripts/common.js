// svg icons support ie11
(function () {
    svg4everybody();
})();

// carousel arrows
var navArrows = ['\n    <svg class="icon icon-arrow-prev">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use>\n    </svg>', '<svg class="icon icon-arrow-next">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use>\n    </svg>'];

// tabs
(function () {
    var tabs = $('.js-tabs');

    tabs.each(function () {
        var thisTabs = $(this),
            nav = thisTabs.find('.js-tabs-link'),
            item = thisTabs.find('.js-tabs-item');
        nav.on('click', function () {
            var thisNav = $(this),
                indexNav = thisNav.index();
            nav.removeClass('active');
            thisNav.addClass('active');
            item.hide();
            item.eq(indexNav).fadeIn();
            initSlider(item.eq(indexNav));
            return false;
        }).first().trigger('click');
    });

    function initSlider(el) {
        var sl = el.find('.js-slider-showcase');
        if (!sl.hasClass('owl-loaded')) {
            sl.addClass('owl-loaded');
            sl.owlCarousel({
                items: 1,
                nav: true,
                navElement: 'button',
                navText: navArrows,
                dots: true,
                loop: false,
                smartSpeed: 700
            });
        }
    }
})();

// owl carousel
(function () {
    var slider = $('.js-leavemealone');
    if (slider.length) {
        slider.each(function () {
            var _this = $(this),
                itemsMobileAlbum = _this.data('items-mobile-album'),
                itemsMobilePortrait = _this.data('items-mobile-portrait');
            console.log(itemsMobileAlbum);
            if (itemsMobileAlbum && itemsMobilePortrait) {
                owlMobileAlbum(_this, itemsMobileAlbum, itemsMobilePortrait);
                $(window).resize(function () {
                    owlMobileAlbum(_this, itemsMobileAlbum, itemsMobilePortrait);
                });
            }
            if (!itemsMobileAlbum && itemsMobilePortrait) {
                owlMobilePortrait(_this, itemsMobilePortrait);
                $(window).resize(function () {
                    owlMobilePortrait(_this, itemsMobilePortrait);
                });
            }
        });
    }

    // tablet portrait
    function owlMobileAlbum(obj, itemsMobileAlbum, itemsMobilePortrait) {
        var optionLoop = true;
        if (obj.is('[data-no-loop]')) {
            optionLoop = false;
        }
        var optionAutoHeight = false;
        if (obj.is('[data-autoheight]')) {
            optionAutoHeight = true;
        }
        var fullWidth = window.innerWidth;
        if (navigator.platform.indexOf('Win') > -1) {
            var mobilePoint = 766; // windows
        } else {
            var mobilePoint = 767; // mac os
        }
        // console.log(mobilePoint); 
        if (fullWidth <= mobilePoint) {
            if (!obj.hasClass('owl-carousel')) {
                obj.addClass('owl-carousel');
                obj.owlCarousel({
                    items: itemsMobileAlbum,
                    nav: false,
                    dots: true,
                    loop: optionLoop,
                    smartSpeed: 600,
                    autoHeight: optionAutoHeight,
                    responsive: {
                        0: {
                            items: itemsMobilePortrait
                        },
                        480: {
                            items: itemsMobileAlbum
                        }
                    }
                });
            }
        } else {
            obj.removeClass('owl-carousel');
            obj.trigger('destroy.owl.carousel');
        }
    }

    // mobile
    function owlMobilePortrait(obj, itemsMobilePortrait) {
        var optionLoop = true;
        if (obj.is('[data-no-loop]')) {
            optionLoop = false;
        }
        var optionAutoHeight = false;
        if (obj.is('[data-autoheight]')) {
            optionAutoHeight = true;
        }
        var windowWidth = $(window).width();
        if (windowWidth <= 479) {
            if (!obj.hasClass('owl-carousel')) {
                obj.addClass('owl-carousel');
                obj.owlCarousel({
                    items: itemsMobilePortrait,
                    nav: false,
                    dots: true,
                    smartSpeed: 600,
                    loop: optionLoop,
                    autoHeight: optionAutoHeight
                });
            }
        } else {
            obj.removeClass('owl-carousel');
            obj.trigger('destroy.owl.carousel');
        }
    }
})();

// header
(function () {
    var header = $('.js-header'),
        burger = header.find('.js-header-burger'),
        wrap = header.find('.js-header-wrap'),
        bg = header.find('.js-header-bg'),
        link = $('.js-link');
    burger.on('click', function () {
        burger.toggleClass('active');
        wrap.toggleClass('visible');
        bg.toggleClass('show');
    });
    bg.on('click', function () {
        burger.removeClass('active');
        wrap.removeClass('visible');
        bg.removeClass('show');
    });
    link.on('click', function (e) {
        // e.preventDefault();
        // var id = $(this).attr('href');
        //     top = $(id).offset().top;
        // $('body,html').animate({ scrollTop: top }, 1500);
        burger.removeClass('active');
        wrap.removeClass('visible');
        bg.removeClass('show');
    });
})();

AOS.init();





// stop 'confirm form resubmission'
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }

 // jump scroll
 let home = document.getElementById('homee');
 let homie = document.getElementById('homie');
 let services = document.getElementById('servicess');
 let survices = document.getElementById('survices');
 let teamm = document.getElementById('teamteam');
 let teamteam = document.getElementById('teamlink');
 let contact = document.getElementById('con');
 let contact2 = document.getElementById('con2');
 let arrow = document.getElementById('arrow');
 let get = document.getElementById('get');
 let mainLogo = document.getElementById('mainLogo');
 let logo2 = document.getElementById('logo2');

home.addEventListener('click', () => {
 Jump('#home')
 event.preventDefault();
})

homie.addEventListener('click', () => {
 Jump('#home')
 event.preventDefault();
})

survices.addEventListener('click', () => {
 Jump('#services')
 event.preventDefault();
})

servicess.addEventListener('click', () => {
 Jump('#services')
 event.preventDefault();
})

arrow.addEventListener('click', () => {
 Jump('#contact')
 event.preventDefault();
})

teamm.addEventListener('click', () => {
 Jump('#team')
 event.preventDefault();
})

teamteam.addEventListener('click', () => {
 Jump('#team')
 event.preventDefault();
})

contact.addEventListener('click', () => {
 Jump('#contact')
 event.preventDefault();
})

contact2.addEventListener('click', () => {
 Jump('#contact')
 event.preventDefault();
})

get.addEventListener('click', () => {
 Jump('#contact')
 event.preventDefault();
})

mainLogo.addEventListener('click', () => {
 Jump('#home')
 event.preventDefault();
})

logo2.addEventListener('click', () => {
 Jump('#home')
 event.preventDefault();
})