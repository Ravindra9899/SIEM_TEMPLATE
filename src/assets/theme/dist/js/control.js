/*!
    * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
    */
(function($) {
    "use strict";// Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $(".main-sidebar .sidebar-menu a.nav-link").each(function() {
        if (this.href === path) {
            $(this).parents('li').addClass("active");
            if ($(this).parents('.treeview-menu').length > 0) { // if menu item has sub-menu list
                $(this).parents('.treeview-menu').css({'display': 'block'});
                /*var subMenuId = $(this).parents('.sub-menu-item').attr('id');
                $('.nav-link[data-target="#' + subMenuId + '"]').attr('aria-expanded', true).toggleClass('collapsed collapse');
                $(this).parents('.sub-menu-item').addClass('collapse show');*/
            }
        }
    });
})(jQuery);