'use strict';
(function ($){

	$(document).ready( function () {

		$('.featured-slider').owlCarousel({
			items: 1,
			loop: true,
			autoPlay: true,
			autoplaySpeed: 3000,
			nav: true,
			smartSpeed: 1000,
			navText: '',
			dots: true
		});

        if ($('.layout-grid').length) {
            var $grid = $('.layout-grid');

            $('.kd-col', $grid).each( function (index, item) {

                if ($grid.hasClass('layout-grid-3')) {
                    if (index %3 == 0) {
                        var height1 = $(this).height(),
                            height2 = $(this).next().height(),
                            height3 = $(this).next().next().height();

                        height1 = Math.max(height1, height2, height3);

                        $(this).height(height1);
                        $(this).next().height(height1);
                        $(this).next().next().height(height1);
                    }
                }
                else {
                    if (index % 2 == 0) {
                        var height1 = $(this).height(),
                            height2 = $(this).next().height();

                        height1 = Math.max(height1, height2);

                        $(this).height(height1);
                        $(this).next().height(height1);

                    }
                }
            });
        }


        /* Popup Search & Socials */

        // if ($('.header-share').length) {
        //
        //     $('.header-share').click( function (event) {
        //
        //         event.preventDefault();
        //
        //         $('.header-share-popup').addClass('active');
        //     });
        // }

        if ($('.header-search').length) {

            $('.header-search').click( function (event) {

                event.preventDefault();

                $('.header-search-popup').addClass('active');
            });
        }

        $(document).keydown( function (event) {
            if (event.keyCode == 27) {

                $('.header-popup.active').removeClass('active');
            }
        });

        $('.header-close').click( function () {
            $(this).closest('.header-popup').removeClass('active');
        })

        /* Menu */

        if ($('.header .navigation').length) {
            var $menu  = $('.header .navigation');

            $('.menu-item-has-children', $menu).each( function () {
                var $arrowIcon = $('<span class="arrow-icon"><i class="fa fa-angle-right"></i></span>');

                $(this).append($arrowIcon);

                $('> .sub-menu', this).prepend('<li class="menu-item item-back"><a href="#">Back</a></li>');
            });

            $('.menu-mobile').click( function () {
                $menu.toggleClass('menu-active');
            });
            $menu.on('click', '.arrow-icon', function () {
                var $parent = $(this).closest('.menu-item-has-children');

                $parent.addClass('menu-active');
            });
            $menu.on('click', '.item-back', function (event) {
                event.preventDefault();
                console.log($(this).closest('.menu-item-has-children'));
                $(this).closest('.menu-item-has-children').removeClass('menu-active');
            });
            $(document).click( function (event) {

                var $header = $(event.target).closest('.header-fixed'),
                    $menu = $('.navigation');

                if (!$header.length && $menu.hasClass('menu-active')) {
                    $menu.removeClass('menu-active');

                }
            });
        }

	});
})(jQuery);
