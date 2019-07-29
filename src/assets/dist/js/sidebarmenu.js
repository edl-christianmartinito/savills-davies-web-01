/*
Template Name: Admin Template
Author: Wrappixel

File: js
*/
// ============================================================== 
// Auto select left navbar
// ============================================================== 
$(function () {
    var timeout = 2000;
    setTimeout(() => {
        var url = window.location;
        var element = $('ul#sidebarnav a').filter(function () {
            return this.href == url;
        }).addClass('active').parent().addClass('active');

        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent().addClass('active').children('a').addClass('active');
                
            }
            else {
                break; 
            }
        }
        $('#sidebarnav a').on('click', function (e) {
            console.log('i am clicked', $(this));
                if (!$(this).hasClass("active")) {
                    // hide any open menus and remove all other classes
                    $("ul", $(this).parents("ul:first")).removeClass("in");
                    $("a", $(this).parents("ul:first")).removeClass("active");
                    
                    // open our new menu and add the open class
                    $(this).next("ul").addClass("in");
                    $(this).next("div ul").addClass("in");
                    $(this).addClass("active");
                    
                }
                else if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).parents("ul:first").removeClass("active");
                    $(this).next("ul").removeClass("in");
                }
        })
        $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
            e.preventDefault();
        });

        var set = function () {
            var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            var topOffset = 55;
            if (width < 1170) {
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
                $(".sidebartoggler i").addClass("ti-menu");
            }
            else {
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
            }
            var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $(".page-wrapper").css("min-height", (height) + "px");
            }
        };
        $(window).ready(set);
        $(window).on("resize", set);
        console.log("sidebar is called");

        // ============================================================== 
        // Theme options
        // ==============================================================     
        $(".sidebartoggler").on('click', function () {
            console.log('sidebartoggler clicked')
            if ($("body").hasClass("mini-sidebar")) {
                $("body").trigger("resize");
                $("body").removeClass("mini-sidebar");
                $('.navbar-brand span').show();
            }
            else {
                $("body").trigger("resize");
                $("body").addClass("mini-sidebar");
                $('.navbar-brand span').hide();
            }
        });
        // this is for close icon when navigation open in mobile view
        $(".nav-toggler").click(function () {
            $("body").toggleClass("show-sidebar");
            $(".nav-toggler i").toggleClass("ti-menu");
            $(".nav-toggler i").addClass("ti-close");
        });
        $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
            $(".app-search").toggle(200);
        });
        // ============================================================== 
        // Right sidebar options
        // ============================================================== 
        $(".right-side-toggle").click(function () {
            $(".right-sidebar").slideDown(50);
            $(".right-sidebar").toggleClass("shw-rside");
        });
        // ============================================================== 
        // This is for the floating labels
        // ============================================================== 
        $('.floating-labels .form-control').on('focus blur', function (e) {
            $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');
    }, timeout);
});