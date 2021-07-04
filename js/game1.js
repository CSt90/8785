$('document').ready(function(){

    hidePressedButton();
    // to score gia ka8e section
    scores = [320, 450, 645, 470, 730, 880, 965, 1200];
    pics = ['b.gif', 'h.jpg', 'j.jpg', 'k.jpg', 'a.jpg', 'dd.jpg', 'c.jpg', 'd.jpg'];
    sectionStops = [0, 0, 0, 0, 0, 0, 0, 0];
    album = [];
    scoresTable = [];
    sectionsTable = [];
    pScore = 0;
    sectionFails = 0;
    photosCollected = 0;


    $('.spin-stopper').on('click', function(){
        $('.spin-stopper').css('pointer-events', 'none');
        // fullSpins: random ranging from 2 to 5
        console.log('');
        spinDecision = 0;
        fullSpins = Math.floor(Math.random() * (8-5+1) + 5);
        var finalSpin = Math.floor(Math.random() * 360);
        section = 9 - Math.ceil(finalSpin / 45);
        if (sectionStops[section-1] > 0){
            
            nextStop = -1;
            for (i=0; i<=7; i++){
                if (sectionStops[i] == 0){
                    // nextStop=45*(8-i);
                    nextStop = 45*(8-i) - Math.floor(Math.random() * 45);
                }
            }
            
            if (nextStop != -1){
                finalSpin = nextStop;
            }
            else{
                finalSpin = finalSpin;
            }            
        }

        spin = fullSpins*360 + finalSpin ;

        console.log('spinDeg: '+ spin);
        $('.wheel').css('transition', 'all 3s ease-out');
        $('.wheel').css('transform', 'rotate('+spin+'deg)');
        $('.wheel').addClass('blur');
        showPressedButton();
        setTimeout(function(){
            hidePressedButton()
        }, 700);
    });

    $('.wheel').on('transitionend webkitTransitionEnd oTransitionEnd', function(){
        $('.wheel').css('transition', 'none'); 
        wheelPosition = spin % 360;       
        $('.wheel').css('transform', 'rotate('+wheelPosition+'deg)');  
        $('.wheel').removeClass('blur');
        calcScore(wheelPosition);
    });

    $('.album').on('click', function(){
        printScores();
        openAlbum();
    });

    $('.cont-btn').on('click', function(){
        $('.spin-stopper').css('pointer-events', 'auto');
        $('.continue-overlay').fadeOut(1000);
        $('.score').animate({
            fontSize: "1.6em",
            zIndex: "1"
        }, 300);
        $('.nxt-lvl').show();
        console.log('fadeOut');
    });

    $('.rst-btn').on('click', function(){
        location.reload();
    });

    $('.nxt-lvl-btn').on('click', function(){
        location.href = 'game2.html';
    });

    $('.nxt-lvl').on('click', function(){
        location.href = 'game2.html';
    });

    $('.open-album').on('click', function(){
        closeAlbum();
    });
});

function hidePressedButton(){
    $('.button-pressed').hide();
}
function showPressedButton(){
    $('.button-pressed').show();
}
function calcScore(wheelPosition){
    spinScore = 9 - Math.ceil(wheelPosition / 45);
    sectionStops[spinScore-1]++;
    sectionsTable.push(spinScore);
    roundScore = scores[spinScore-1];
    scoresTable.push(roundScore);
    animateValue(".score", pScore, pScore+roundScore, spinScore);
    pScore += roundScore;
    console.log(spinScore);
}

function printScores(){
    console.log('Sections: '+ sectionsTable);
    console.log('Scores: '+ scoresTable);
    console.log('Section stops : ' + sectionStops);
}

function animateValue(cl, start, end, image) {
    if (start === end) return;
    var range = end - start;
    var current = end-200;
    var increment = end > start? 1 : -1;
    // var stepTime = Math.abs(Math.floor(duration / range));
    console.log("steptime: "+range);
    var timer = setInterval(function() {
        current += increment;
        $(cl).text(current);
        if (current == end) {
            clearInterval(timer);
            showWonImage(image);
            // $('.spin-stopper').css('pointer-events', 'auto');
        }
    }, 0);
}

function showWonImage(im){
    $('.image-popup').fadeIn(1000);
    collectedImgURL = '../img/album/'+pics[im-1];
    pushImageIntoAlbum(pics[im-1]);
    $('.collected-img').css('background-image', 'url('+collectedImgURL+')');
    setTimeout(function(){ 
        $('.image-popup').fadeOut(1000);
        $('.collected-img').animate({
            height : "0",
            marginTop: "140%"
        }, 1000);
    }, 4000);
    $('.collected-img').css({"height": "80%", "margin-top":"10%"});
    if(sectionStops[im-1] == 1){
        photosCollected++;
        $('.image-list-container').append('<div class="album-img img-'+(photosCollected)+'"></div>');
        $('.img-'+(photosCollected)).css('background-image', 'url(../img/album/'+ album[photosCollected-1] +')');
        console.log(photosCollected);
        setTimeout(function(){ 
            $('.collected').text(photosCollected);
        }, 4500);
    }
    if (pScore > 3000){
        scoreLimitPass();            
    }
    else{
        $('.spin-stopper').css('pointer-events', 'auto');
    }
}

function scoreLimitPass(){
    // $('.continue-overlay').fadeIn(500);
    setTimeout(function(){
        $('.continue-overlay').css('display', 'flex');    
        $('.score').animate({
            fontSize: "4em",
            zIndex: "101"
        }, 300);
    }, 5500);
    console.log('continue');
}
// animateValue("value", 100, 25, 5000);

function pushImageIntoAlbum(imgName){
    album.push(imgName);
}

function openAlbum(){
    $('.album-popup').css('display', 'flex');
    $('body').css('overflow-y', 'scroll');
}

function closeAlbum(){
    // $('.album-popup').css('display', 'none');
    $('.album-popup').fadeOut(1000);
    $('body').css('overflow-y', 'hidden');
}