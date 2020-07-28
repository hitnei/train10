
let OBJ = {};
(function($) {
    /************************************************************
     * Predefined letiables
     *************************************************************/
    let $window = $(window),
        $document = $(document),
        $html = $('html'),
        $body = $('body');
    /**
     * exists
     * @return true
     */
    $.fn.exists = function() {
        return this.length > 0;
    };
    /**
     * isMobile - Check mobile screen
     * @return void
     */
    $.fn.isMobile = function() {
        let screen = $window.outerWidth();
        return !!(screen < 751);
    };
    /**
     * @return void
     */
    let ismobile;
    OBJ.uaSetting = function() {
        let _ua = (function(u) {
            return {
                Tablet: (u.indexOf('windows') !== -1 && u.indexOf('touch') !== -1 && u.indexOf('tablet pc') === -1) || u.indexOf('ipad') !== -1 || (u.indexOf('android') !== -1 && u.indexOf('mobile') === -1) || (u.indexOf('firefox') !== -1 && u.indexOf('tablet') !== -1) || u.indexOf('kindle') !== -1 || u.indexOf('silk') !== -1 || u.indexOf('playbook') !== -1,
                Mobile: (u.indexOf('windows') !== -1 && u.indexOf('phone') !== -1) || u.indexOf('iphone') !== -1 || u.indexOf('ipod') !== -1 || (u.indexOf('android') !== -1 && u.indexOf('mobile') !== -1) || (u.indexOf('firefox') !== -1 && u.indexOf('mobile') !== -1) || u.indexOf('blackberry') !== -1,
            }
        })(window.navigator.userAgent.toLowerCase());
        if (_ua.Tablet || _ua.Mobile) {
            $body.addClass('sp');
            ismobile = true;
        } else {
            ismobile = false;
        }
    }
    /**
     *  open or close menu in mobile
     */
    /**
     *  custom for browser
     */
    OBJ.fixBrowser = function() {
        var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
            browser;
        if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
            browser = "msie";
            $('html').addClass('msie');
        } else {
            browser = ua[1].toLowerCase();
        }
        $html.addClass(browser);
    }
    OBJ.sliderAll = function() {      
        if ($('.slider-01').length) {
            let slider01 = new Swiper('.slider-01', {
                pagination: {
                    el: '.slider-01 .swiper-pagination',
                },
                autoplay: {
                    delay: 5000,
                },
                loop: true,
                navigation: {
                    nextEl: '.slider-01 .swiper-button-next',
                    prevEl: '.slider-01 .swiper-button-prev',
                },

            });
        }  
        if($('.slider-02').length) {
            $('.slider-02').slick({
                infinite: true,
                slidesToShow: 3,
                responsive: [
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                ]
            });
        }   
        if($('.slick-slider-03').length) {
            $('.slick-slider-03').slick({
                infinite: true,
                centerMode: true,
                variableWidth: true,
                initialSlide: 1,                
                centerPadding: 0,
            });
        }   
        if($('.slick-slider-05').length) {
            $('.slider-05-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-05-nav'
              });
              $('.slider-05-nav').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.slider-05-for',
                dots: false,
                focusOnSelect: true,                
                arrows: true,
              });
        }  
        if($('.slider-cp-factory').length) {
            $('.slider-cp-factory').slick({
                infinite: true,
                slidesToShow: 5,
            });
        }
    }
    
    OBJ.scrollAnimation = function() {
        let scrollOff = $('.animation'),
        windowsTop = $(window).scrollTop();
        if (scrollOff.length > 0) {
            scrollOff.each(function(){
                var scrollOffTop = $(this).offset().top,
                    wh = $(window).height();
                if($(this)) {
                    $(this).addClass('animation--off');
                    (windowsTop + wh > scrollOffTop && $(this).hasClass('animation--off')) ? $(this).removeClass('animation--off').addClass('animation--on') : $(this).removeClass('animation--on').addClass('animation--off');
                }
            });
        }
    }
    $window.scroll(function() {
        OBJ.uaSetting();
        // OBJ.scrollAnimation();
    });
    $document.ready(function() {
        OBJ.fixBrowser();
        OBJ.sliderAll();
    })
})(jQuery);
