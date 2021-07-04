$('document').ready(function(){
    fullcake = true;
    $('.cake-img').click(function (e) { //Offset mouse Position --3-- X:145-185, Y:120-165 --6-- X:230-270, Y:120-165
        var posX = $(this).offset().left,
            posY = $(this).offset().top;
            pointX = e.pageX - posX;
            pointY = e.pageY - posY;
        console.log((pointX) + ' , ' + (pointY));
        if ( (pointX >= 145 && pointX <= 185) && (pointY >= 120 && pointY <= 165) ){ // number 3
            console.log('Blow 3');
            $('.top-darkness').css('display','block');
            $('.left-darkness').css('display','block');
            $('.bottom-darkness').css('display','block');
            $('.task1').css('color', 'black');

            if(fullcake == true){
                fullcake = false;
                $('.cake-img').css('background-image', 'url(../img/birthday-cake-3-off.png)');
                $('.task1, .task2').css('color', 'black');
            }
            else{
                lightsOff();
            }
        }

        if ( (pointX >= 230 && pointX <= 270) && (pointY >= 120 && pointY <= 165) ){ // number 6
            console.log('Blow 6');
            $('.top-darkness').css('display','block');
            $('.right-darkness').css('display','block');
            $('.bottom-darkness').css('display','block');
            $('.task1').css('color', 'black');

            if(fullcake == true){
                fullcake = false;
                $('.cake-img').css('background-image', 'url(../img/birthday-cake-6-off.png)');
                $('.task1, .task2').css('color', 'black');
            }
            else{
                lightsOff();
            }
        }
    });
});

function lightsOff(){
    $('.cake-img').css('background-image', 'url(../img/birthday-cake-both-off.png)');
    $('.all-darkness').fadeIn(1000);
    setTimeout(function(){
        $('.transition-bg').fadeIn(1000);
    }, 2000);
    setTimeout(function(){
        location.href = 'begin.html';
    }, 3000);
}