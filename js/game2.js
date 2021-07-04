$('document').ready(function(){
    wordList = [
        "ΓΟΥΑΔΕΦΑΚ",
        "ΗΝΤΑ ΒΡΕ",
        "ΟΦΟΥ ΤΟ ΓΙΑΣΕΜΙ",
        "ΓΑΡΔΕΝΙΑ",
        "ΕΞΕΡΕΥΝΗΣΗ",
        "ΜΠΑΜΠΑΚΟΚΩΛΟΣ",
        "ΠΟΝΤΙΟΣ",
        "ΠΥΡΚΑΓΙΑ",
        "ΜΙΚΡΟ ΜΟΥ ΠΟΝΥ",
        "ΛΟΥΛΟΥΔΕΝΙΑ",
        "ΜΠΑΜΠΑΤΖΙΜ",
        "ΑΝΗΨΩΛΟΣ",
        "ΔΡΑΚΟΝΙΑ",
        "ΠΙΚΙΡΙΑ",
        "ΟΥΖΑΚΙ",
        "ΠΑΦΑΚΙ"
    ];

    answer = '';
    mode = 'λέξη!';
    maxMistakes = 6;
    mistakes = 0;
    guesses = [];
    cryp = null;
    wordsFound = [];
    gameWin = 4;

    genWord();
    // word();
    createKeyboard();
    $('.mistakes').text(mistakes);
    $('.words-found').text(wordsFound.length);

    $('.key').on('click', function(){
        keyID = $(this).prop('id');
        keyClick(keyID);
    });

    $('.reset-btn').on('click', function(){
        clearForNextWord();
        genWord();
    });

    $('.car').on('click', function(){
        $('.car').css('transition', 'all 0.5s ease-out');
        $('.car').css('transform', 'translateX(-90px)');
        setTimeout(function(){
            $('.car').css('transition', 'all 0.3s ease-out');
            $('.car').css('transform', 'translateX(510px)');
        }, 1000);

        setTimeout(function(){
            $('.win-text').fadeOut(500);
            $('.blackout').fadeIn(1000);    
        }, 1500);

        setTimeout(function(){
            location.href='congrats.html';
        }, 2500);
    });
});

function genWord(){
    answer = wordList[Math.floor(Math.random() * wordList.length)];
    $('.ans').text(answer);
    if ( answer.split(" ").length > 1 ){
        mode = 'φράση!';
    }
    else{
        mode = 'λέξη!';
    }
    $('.mode').text(mode);
    word();
}

function createKeyboard(){
    keyRow1 = 'ΕΡΤΥΘΙΟΠ'.split('').map( key =>
        `<button class='key key-`+ key +`' id='`+ key +`'>`+ key +`</button>`
    ).join('');
    keyRow2 = 'ΑΣΔΦΓΗΞΚΛ'.split('').map( key =>
        `<button class='key key-`+ key +`' id='`+ key +`'>`+ key +`</button>`
    ).join('');
    keyRow3 = 'ΖΧΨΩΒΝΜ'.split('').map( key =>
        `<button class='key key-`+ key +`' id='`+ key +`'>`+ key +`</button>`
    ).join('');
    // console.log(keyRow);
    $('.letters1').html(keyRow1);
    $('.letters2').html(keyRow2);
    $('.letters3').html(keyRow3);

}

function word(){
    console.log(guesses);
    cryp = answer.split('').map( letter => (guesses.indexOf(letter) > -1 || letter == ' ') ? letter : '_' ).join('');
    console.log(cryp);
    $('.crypto').html(cryp);
    console.log(answer);
}


function keyClick(keyID){
    k = $('#'+keyID).text();
    guesses.indexOf(k) === -1 ? guesses.push(k) : null;
    answer.indexOf(k) === -1 ? handleMistakes() : null;
    console.log(mistakes);
    word();
    console.log(k+' clicked');
    $('#'+keyID).attr('disabled', true);
    handleWin();
    // console.log(k);
}

function handleMistakes(){
    mistakes++;
    $('.mistakes').text(mistakes);
    if (mistakes == (maxMistakes)){
        $('.next-word').css('visibility', 'visible');
        $('.reset-btn').css('pointer-events','none');
        $('.key').css('pointer-events', 'none');
        revealAns();
        if( wordsFound.length < gameWin ){
            $('.next-word').on('click', function(){
                clearForNextWord();
                genWord();
                setTimeout(function(){
                    $('.key').attr('disabled', false);
                }, 200);
            });
        }
    }
}

function handleWin(){
    if (cryp.indexOf("_") ==-1){
        wordsFound.push(wordList.indexOf(answer));
        $('.words-found').text(wordsFound.length);
        $('.next-word').css('visibility', 'visible');
        $('.reset-btn').css('pointer-events','none');
        cryp = answer;
        if( wordsFound.length < gameWin ){
            $('.next-word').on('click', function(){
                clearForNextWord();
                genWord();
                setTimeout(function(){
                    $('.key').attr('disabled', false);
                }, 10);
            });
        }
        else{
            handleFinish();
        }
    }
}

function clearForNextWord(){
    console.log('cleared')
    $('.reveal-label, .ans').css('display', 'none');
    $('.reset-btn').css('pointer-events','auto');
    $('.next-word').css('visibility', 'hidden');
    $('.key').css('pointer-events', 'auto');
    answer = '';
    mistakes = 0;
    $('.mistakes').text(mistakes);
    guesses = [];
    cryp = null;
}

function handleFinish(){
    console.log('finish');
    $('.content-container').animate({
        marginTop:"300%",
        display:"none"
        // top: "+=100vh"
    }, 1000);
    $('body').css('overflow-y', 'hidden');
    $('.finish-container').animate({
        top: "0"
    }, 1000);
}

function revealAns(){
    console.log('reveal');
    $('.reveal-label').fadeIn(1000);
    $('.ans').fadeIn(1000);
}