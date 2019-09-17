(function ($) {
    $.fn.lazyload = function () {
        $(window).scroll(lazyload);
        lazyload();

    };

    function lazyload() {
        let winScrollTop = $(window).scrollTop();
        let winHeight = $(window).height();
        $('img.lazy').each(function () {
            let imgOTop = $(this).offset().top;

            if (imgOTop < (winHeight + winScrollTop)) {
                $(this)
                    .attr('src', $(this).data('src'))
                    .removeClass('lazy')
                    .removeAttr('data-src');
            }
        });
    }
})(jQuery);

$(document).ready(function () {
    $(document).lazyload();
});