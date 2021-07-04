$('document').ready(function(){

    message = `Είσαι ένα λουλούδι. Ένα λουλούδι που εκπέμπει ακαταμάχητη μυρωδιά και λάμψη που δεν έχω δει σε άλλη γυναίκα. Έχεις περάσει πολλά, κ ακόμα περνάς, παρόλα αυτά όταν σε βλέπω να γελάς και να χαμογελάς μπορείς να κάνεις κάθε καρδιά να χαμογελάσει μαζί σου. Μια κοπέλα ακομπλεξάριστη, δε σηκώνεις πολλά πολλά για αυτό νευριάζεις κ πολύ εύκολα.</br>
    Έχεις μια γοητεία που είναι σπάνια σε έναν άνθρωπο, για αυτό και σε θέλουν όλοι κοντά τους. Μια πανέμορφη γυναίκα όχι μόνο εξωτερικά, αλλά και εσωτερικά.</br>
    Αν κ φαντάζομαι τι μπορεί να γίνει όταν φύγουμε από το μαγαζί, δε θέλω να το σκέφτομαι. Σε θέλω στη ζωή μου, ας είναι κ έτσι.</br>
    Για τα γενέθλιά σου, και για όλη σου τη ζωή, με την ψυχή μ ολόκληρη, εύχομαι για σένα τα καλύτερα. Προπαντός, ευτυχία και ηρεμία. Γιατί τις αξίζεις μετά από τόσες δυσκολίες. Ειλικρινά ήθελα να είμαι εκείνος που θα στα δώσει και τα δύο. Όσο ήμασταν μαζί αυτό ήταν το κίνητρο για να κάνω σχέδια μαζί σου. Ακόμα το έχω απωθημένο, αν και σε ταλαιπωρώ. 
    Σαγαπάω ιδιαίτερα πολύ. Στο χω πει άπειρες φορές, μα όσες φορές κ αν στο πω δεν περιγράφεται στο ελάχιστο η θύελλα συναισθημάτων που νιώθω για σένα, ακόμα και τώρα. Γι' αυτό δεν έχω κουραστεί ακόμα να στο λέω. Είσαι και θα είσαι πάντα μέσα στην καρδιά μου και στο μυαλό μου, μονάκριβη Γαρδένια μου 💜.</br></br>
    
    Ο Πόντιός σου`;

    extraImg = ["aa.jpg", "ab.jpg", "ac.jpg", "ad.jpg", "ae.jpg", "af.jpg", "ag.jpg", "ah.jpg", "ai.jpg", "aj.jpg", "ak.jpg", "al.jpg", "am.jpg", "an.jpg", "ao.jpg", "ap.jpg", "aq.jpg", "ar.jpg", "as.jpg", "at.jpg", "au.jpg", "av.jpg", "aw.jpg"];
    extraImgTemp = ["aa.jpg", "ab.jpg", "ac.jpg", "ad.jpg", "ae.jpg", "af.jpg", "ag.jpg", "ah.jpg", "ai.jpg", "aj.jpg", "ak.jpg", "al.jpg", "am.jpg", "an.jpg", "ao.jpg", "ap.jpg", "aq.jpg", "ar.jpg", "as.jpg", "at.jpg", "au.jpg", "av.jpg", "aw.jpg"];
    shuffledArray = [];
    extraImgPath = "../img/extra/";

    
    shuffleImages(extraImg, extraImgTemp, shuffledArray);

    $('.play').on('click', function(){
        $('.play').fadeOut(1000);

        setTimeout(function(){
            $('#music').get(0).play();
        },1200);
        playBack(shuffledArray, 0);
    });

});

function shuffleImages(imgArray, tempArray, orderArray){
    for(i=0; i<imgArray.length;i++){
        currImg = Math.floor(Math.random() * tempArray.length);
        console.log(tempArray[currImg]);
        shuffledArray.push(tempArray[currImg]);
        // console.log(currImgPath);
        tempArray.splice(currImg, 1);
        console.log(tempArray);
    }
    console.log(orderArray);
}

function playBack(shArray, i){
    console.log("Showing: "+extraImgPath+shArray[i]);
    setTimeout(function(){
        $('.image').css('background-image', 'url('+extraImgPath+shArray[i]+')');
        $('.image').fadeIn(1000);
    }, 2000);
    setTimeout(function(){
        $('.image').fadeOut(1000);
        i++;
        if (i==shArray.length){
            showMessage();
        }
        else{
            playBack(shArray, i);
        }
    }, 6000);
}

function showMessage(){
    setTimeout(function(){
        $('.image').css('display', 'none');
    },4000);
    $('.img-container').append(`<p class="msg">${message}</p>`);
    $('body').css('overflow-y', 'scroll');

    setTimeout(function(){
        $('.msg').fadeIn(1000);
    },4000);
}