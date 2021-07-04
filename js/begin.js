$(document).ready(function(){
    $('body').fadeIn(1000);
    $('.arrow').on('click', function(){
        $('.right-arrow-img').css('transition', 'all 0.5s ease-out');
            $('.right-arrow-img').css('transform', 'translateX(-90px)');
            setTimeout(function(){
                $('.right-arrow-img').css('transition', 'all 0.3s ease-out');
                $('.right-arrow-img').css('transform', 'translateX(510px)');
            }, 1000);

        setTimeout(function(){
            $('.title').fadeOut(500);
            location.href = 'game1.html';
        }, 1500);
    });
});